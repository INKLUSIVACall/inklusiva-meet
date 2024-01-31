-- Module must be global
module:set_global();

-- Module to handle user tags
local st = require "util.stanza";
local datetime = require "util.datetime";

-- Room handler
local get_room_from_jid = module:require "util".get_room_from_jid;

local ic_roles = {}
local ic_transcript_links = {}

local tagNamespace = "https://jitsi.inclusiva-call.de/protocol/muc#tags"

IC_ROLE_COHOST = "IC_ROLE_COHOST"
IC_ROLE_CAPTIONER = "IC_ROLE_CAPTIONER"
IC_ROLE_SIGN_LANG_TRANSLATOR = "IC_ROLE_SIGN_LANG_TRANSLATOR"
IC_ROLE_ASSISTANT = "IC_ROLE_ASSISTANT"
IC_ROLE_ASSISTED = "IC_ROLE_ASSISTED"

--[=[------------------------------------------------------[=[---
                       Role cache helpers
--]=]------------------------------------------------------]=]---
local ic_role_cache = {}

local function cache_clean()
    local cache_copy = {}
    local timestamp = datetime.parse(datetime.legacy(nil))

    for jid, data in pairs(ic_role_cache) do
        if data["expiry"] > timestamp then
            cache_copy[jid] = data;
        end
    end

    ic_role_cache = cache_copy;
end

local function cache_update_user(jid, roles)
    cache_clean();
    local expiry = datetime.parse(datetime.legacy(nil)) + 120;

    ic_role_cache[jid] = {};
    ic_role_cache[jid]["expiry"] = expiry;
    ic_role_cache[jid]["roles"] = roles;
end

local function cache_read_user(jid)
    if ic_role_cache[jid] ~= nil then
        return ic_role_cache[jid]["roles"];
    end
    return nil;
end

--[=[------------------------------------------------------[=[---
                        Helper function 
--]=]------------------------------------------------------]=]---
local function table_index_of(t, object)
    for i, value in ipairs(t) do
        if value == object then
            return i
        end
    end

    return nil
end

local function try_fetch_child(stanza, child_name)
    local child = stanza:get_child(child_name)
    if child and (child:get_text() or "") ~= "" then
        return true, child:get_text()
    else
        return false, nil
    end
end

local function try_fetch_child_stanza(stanza, child_name)
    local child = stanza:get_child(child_name)
    if child then
        return true, child
    else
        return false, nil
    end
end

local function fetch_real_user_jid(room_jid, occupant_jid)
    local room = get_room_from_jid(room_jid);
    if room == nil then
        return nil;
    end
    local occupant = room:get_occupant_by_nick(occupant_jid);
    if occupant == nil then
        return nil;
    end

    return occupant.bare_jid;
end

local function fetch_partner_id_from_user_jid(room_jid, real_jid)
    local room = get_room_from_jid(room_jid);
    if room == nil then
        module:log("info", "Couldn't find room %s.", room_jid);
        return nil;
    end
    local occupant = nil;
    for cn in room:each_occupant() do    
        local cu = room:get_occupant_by_nick(cn);;
        --module:log("info", "%s == %s", cu.bare_jid, real_jid)
        if cu.bare_jid == real_jid then 
            occupant = cu;
            break;
        end;
    end

    if ((occupant == nil) or (occupant.nick == nil)) then
        --module:log("info", "Couldn't find %s in %s.", real_jid, room_jid);
        return nil;
    end    

    module:log("debug", "Identified %s as %s.", real_jid, occupant.nick);

    return occupant.nick:match("/(.+)$");
end

local function log_roles(str)
    local output = "Roles";
    if str ~= nil then
        output = output .. " after " .. str;
    end
    output = output .. ":\n";
    for room_jid, roles in pairs(ic_roles) do
        output = output .. "\n- Room " .. room_jid .. ":";
        for user_jid, user_roles in pairs(roles) do
            output = output .. "\n  - User " .. user_jid .. ": ";
            local role_str = "";
            for _, role_info in ipairs(user_roles) do
                if role_str ~= "" then
                    role_str = role_str .. ", ";
                end
                role_str = role_str .. role_info["name"];
                if role_info["partner"] ~= nil then
                    role_str = role_str .. " (" .. role_info["partner"];
                    if role_info["partner_real"] ~= nil then
                        role_str = role_str .. "; real: " .. role_info["partner_real"];
                    end
                    role_str = role_str .. ")"
                end
            end
            output = output .. role_str;
        end
    end
    module:log("debug", output);
end

--[=[------------------------------------------------------[=[---
             Verify if a user has a certain role
--]=]------------------------------------------------------]=]---

-- broadcast IC roles

function user_has_ic_role(room_jid, user_jid, role_name, partner_jid)
    if ic_roles[room_jid] then
        if ic_roles[room_jid][user_jid] then
            for _, role_info in ipairs(ic_roles[room_jid][user_jid]) do
                if (role_info["name"] == role_name and role_info["partner"] == partner_jid) then
                    return true;
                end
            end
        end
    end

    return false;
end


--[=[------------------------------------------------------[=[---
           Match partner IDs after a channel update
--]=]------------------------------------------------------]=]---

local function update_room_roles(room_jid)
    --module:log("info", "Updating room roles for %s", room_jid)
    if ic_roles[room_jid] == nil then
        module:log("info", "No roles")
        return;
    end
    
    room_roles = {}
    for user_jid, user_roles in pairs(ic_roles[room_jid]) do
        new_roles = {}
        --module:log("info", "Checking roles for %s in %s", user_jid, room_jid)

        for _, role_info in ipairs(user_roles) do
            if (role_info["partner_real"] ~= nil) then
                --module:log("info", "Searching %s", role_info["partner_real"])
                local np = fetch_partner_id_from_user_jid(room_jid, role_info["partner_real"]);
                if np ~= nil then
                    role_info["partner"] = np
                end
            end

            table.insert(new_roles, role_info);
        end

        room_roles[user_jid] = new_roles;
    end

    ic_roles[room_jid] = room_roles;
end

--[=[------------------------------------------------------[=[---
             User presence broadcasting methods
--]=]------------------------------------------------------]=]---

-- broadcast IC roles
local function broadcast_user_ic_roles(room_jid)
    module:log("debug", "Room roles are being broadcast to room " .. tostring(room_jid));    
    -- Create the main ic and roles element
    local ic_stanza = st.stanza("roles");

    -- Check if the room exists in the roles table
    if ic_roles[room_jid] then
        -- Iterate over each user-jid in the room and their roles
        for user_jid, user_roles in pairs(ic_roles[room_jid]) do
            local user_stanza = st.stanza("user", { jid = user_jid });
            
            -- Add each tag for the user to the user-tags element
            for _, role_info in ipairs(user_roles) do
                local role_stanza = st.stanza("role");                
                role_stanza:add_child(st.stanza("name"):text(role_info["name"]));
                if (role_info["partner"] ~= nil) then
                    role_stanza:add_child(st.stanza("partner"):text(role_info["partner"]));
                end                
                user_stanza:add_child(role_stanza);
            end

            ic_stanza:add_child(user_stanza);
        end
    end

    local wrap_ic = st.stanza("ic"):add_child(ic_stanza);
    local message = st.message({ from = room_jid, type = 'groupchat' }):add_child(wrap_ic);

    local room = get_room_from_jid(room_jid);
    if room then
        room:broadcast_message(message);
    end     
end

-- provide user tags with a presence upgrade
local function muc_hook_broadcast_presence(host_module, event)
    local room_jid = event.room.jid;

    module:log("debug", "Presence is broadcasting - we broadcast the roles as well!");    
    broadcast_user_ic_roles(room_jid);
    broadcast_transcript_link(room_jid);
end

local function dump(t, prefix)
    prefix = prefix or ""
    for k, v in pairs(t) do
        if type(v) == "table" then
            module:log("info", "%s%s:", prefix, k);
            dump(v, prefix .. "  ");
        else
            module:log("info", "%s%s: %s", prefix, k, tostring(v));
        end
    end
end


--[=[------------------------------------------------------[=[---
                         Channel hooks
--]=]------------------------------------------------------]=]---

-- Create a role information for a user
local function muc_hook_occupant_joined(host_module, event)
    local room_jid = event.room.jid;
    local participant_jid = event.nick; --event.stanza.attr.from;
    
    if not ic_roles[room_jid] then
        ic_roles[room_jid] = {};
    end
    
    if not ic_roles[room_jid][participant_jid] then
        ic_roles[room_jid][participant_jid] = {};
    end

    local cached_roles = cache_read_user(event.occupant.bare_jid);
    if cached_roles ~= nil then
        ic_roles[room_jid][participant_jid] = cached_roles;
    end

    --module:log("info", "User " .. event.occupant.bare_jid .. " is joining " .. room_jid);
    --log_roles("occupant " .. event.occupant.bare_jid .. " is joining " .. room_jid);

    update_room_roles(room_jid);

    --log_roles("occupant has joined " .. room_jid);

    broadcast_user_ic_roles(room_jid);
    broadcast_transcript_link(room_jid);
end

-- Remove a role information for a user
local function muc_hook_occupant_left(host_module, event)
    local room_jid = event.room.jid;
    local participant_jid = event.nick; --event.stanza.attr.from;    

    if ic_roles[room_jid] and ic_roles[room_jid][participant_jid] then
        cache_update_user(event.occupant.bare_jid, ic_roles[room_jid][participant_jid]);
        ic_roles[room_jid][participant_jid] = nil;
    end    

    --log_roles("occupant leaving " .. room_jid);
end

-- Remove all roles for a room when the room gets disbanded
local function muc_hook_room_destroyed(host_module, event)
    local room_jid = event.room.jid;

    if ic_roles[room_jid] then
        ic_roles[room_jid] = nil;
    end
end



--[=[------------------------------------------------------[=[---
                   Reading user roles methods
--]=]------------------------------------------------------]=]---

-- Local method to read tags, to be exported for utilities
function get_roles(room_jid, participant_jid)
    if ic_roles[room_jid] and ic_roles[room_jid][participant_jid] then        
        return ic_roles[room_jid][participant_jid], "success";
    else
        return nil, "item-not-found";
    end
end

-- Hook method to manage tags
local function shared_hook_get_ic_roles(host_module, event)
    local origin, origStanza = event.origin, event.stanza;

    local stanza = stanza:get_child("get-ic-roles", tagNamespace);

    local has_room_jid, room_jid = try_fetch_child(stanza, "room");
    local has_participant_jid, participant_jid = try_fetch_child(stanza, "participant");
    
    if not has_room_jid then
        origin.send(st.error_reply(stanza, "cancel", "item-not-found", "Missing room"));
        return;
    end
    if not has_participant_jid then
        origin.send(st.error_reply(stanza, "cancel", "item-not-found", "Missing participant"));
        return;
    end

    local result, msg = get_roles(room_jid, participant_jid);

    if (result == nil) then
        origin.send(st.error_reply(stanza, "cancel", msg));
    else
        local reply = st.reply(stanza);
        for _, role_info in ipairs(result) do
            local role_stanza = st.stanza("role");
            role_stanza:add_child("name"):text(role_info["name"]);
            if (role_info["partner"] ~= nil) then
                role_stanza:add_child("partner"):text(role_info["partner"]);
            end                
            reply:add_child(role_stanza);
        end
        origin.send(reply);
    end
end


--[=[------------------------------------------------------[=[---
                   Set user role methods
--]=]------------------------------------------------------]=]---


-- Local method to set a tag, to be exported for utilities
function set_role(room_jid, participant_jid, ic_role, partner_id)
    -- Technically these should never fire as they are created in
    -- the muc-occupant-joined hook
    if not ic_roles[room_jid] then
        ic_roles[room_jid] = {};
    end

    if not ic_roles[room_jid][participant_jid] then
        ic_roles[room_jid][participant_jid] = {};
    end

    -- Check if a role is already in use
    local index = nil;
    for _, role_info in ipairs(ic_roles[room_jid][participant_jid]) do
        local name = role_info["name"];
        local partner = role_info["partner"];
        if (name == ic_role and partner_id == partner) then
            index = _;
        end
    end

    if index then
        -- role already exists - no error case, just ignore the user request
        return
    end

    local role = {};
    role["name"] = ic_role;
    if (partner_id ~= nil) then
        role["partner"] = partner_id;

        local partner_jid = room_jid .. "/" .. partner_id;
        local real_jid = fetch_real_user_jid(room_jid, partner_jid);
        
        module:log("debug", "Role " .. ic_role .. " with partner " .. partner_id .. " and real id " .. real_jid .. " assigned!");
        role["partner_real"] = real_jid;
    end

    -- Actual insertion method
    table.insert(ic_roles[room_jid][participant_jid], role);

    -- rebroadcast the user presence with the updated role
    broadcast_user_ic_roles(room_jid);
end

-- Hook method to set a role
local function shared_hook_add_ic_role(host_module, event)
    local origin, origStanza = event.origin, event.stanza;
    
    local stanza = origStanza:get_child("add-ic-role", tagNamespace);

    local has_room_jid, room_jid = try_fetch_child(stanza, "room");
    local has_target_jid, target_jid = try_fetch_child(stanza, "participant");
    
    if not has_room_jid then
        origin.send(st.error_reply(stanza, "cancel", "item-not-found", "Missing room"));
        return;
    end
    if not has_target_jid then
        origin.send(st.error_reply(stanza, "cancel", "item-not-found", "Missing participant"));
        return;
    end
        
    local sender_jid = stanza.attr.from;
    
    -- Get the room from the MUC component
    local room = module:context(room_jid);
    if (not room) then
        origin.send(st.error_reply(stanza, "cancel", "item-not-found", "Room not found"));
        return true;
    end

    -- Check for affiliation of the sender
    -- TODO: Fix this and make it proper
    -- local affiliation = room:get_affiliation(sender_jid);
    -- if (affiliation ~= "admin" and affiliation ~= "owner") then
        -- origin.send(st.error_reply(stanza, "auth", "forbidden", "You don't have permission to perform this action"));
        -- return true;
    -- end
    
    -- Handle the command since the sender is an admin or owner
    local has_ic_role, ic_role = try_fetch_child_stanza(stanza, "ic-role");
    if not has_ic_role then
        origin.send(st.error_reply(stanza, "cancel", "item-not-found", "Missing ic-role tag"));
        return;
    end

    -- Extract the actual role name
    local has_name, role_name = try_fetch_child(ic_role, "name");
    if not has_name then
        origin.send(st.error_reply(stanza, "cancel", "item-not-found", "Missing role name"));
        return;
    end
    local has_partner, role_partner = try_fetch_child(ic_role, "partner");
    if not has_partner then
        role_partner = nil;
    end    
    
    set_role(room_jid, target_jid, role_name, role_partner);

    origin.send(st.reply(origStanza));
end



--[=[------------------------------------------------------[=[---
                   Remove user role methods
--]=]------------------------------------------------------]=]---

-- Local method to remove a role, to be exported for utilities
function remove_role(room_jid, participant_jid, ic_role, partner_id)
    -- If the user doesn't have any roles this can silently fail
    if not ic_roles[room_jid] or not ic_roles[room_jid][participant_jid] then
        return
    end

    -- Check if a role is already in use
    local index = nil;
    for _, role_info in ipairs(ic_roles[room_jid][participant_jid]) do
        local name = role_info["name"];
        local partner = role_info["partner"];
        if (name == ic_role and partner_id == partner) then
            index = _;
        end
    end
    
    if index then
        table.remove(ic_roles[room_jid][participant_jid], index);
    end

    -- rebroadcast the user presence with the updated tags
    broadcast_user_ic_roles(room_jid);
end

-- Hook method to remove a tag
local function shared_hook_remove_ic_role(host_module, event)
    local origin, origStanza = event.origin, event.stanza;

    local stanza = origStanza:get_child("remove-ic-role", tagNamespace);
    
    local has_room_jid, room_jid = try_fetch_child(stanza, "room");
    local has_target_jid, target_jid = try_fetch_child(stanza, "participant");
    
    if not has_room_jid then
        origin.send(st.error_reply(origStanza, "cancel", "item-not-found", "Missing room"));
        return;
    end
    if not has_target_jid then
        origin.send(st.error_reply(origStanza, "cancel", "item-not-found", "Missing participant"));
        return;
    end
        
    local sender_jid = origStanza.attr.from;
    
    -- Get the room from the MUC component
    local room = module:context(room_jid);
    if (not room) then
        origin.send(st.error_reply(origStanza, "cancel", "item-not-found", "Room not found"));
        return true;
    end

    -- Check for affiliation of the sender
    -- TODO: Fix this and make it proper
    -- local affiliation = room:get_affiliation(sender_jid);
    -- if (affiliation ~= "admin" and affiliation ~= "owner") then
        -- origin.send(st.error_reply(stanza, "auth", "forbidden", "You don't have permission to perform this action"));
        -- return true;
    -- end
    
    -- Handle the command since the sender is an admin or owner
    -- Handle the command since the sender is an admin or owner
    local has_ic_role, ic_role = try_fetch_child_stanza(stanza, "ic-role");
    if not has_ic_role then
        origin.send(st.error_reply(stanza, "cancel", "item-not-found", "Missing ic-role tag"));
        return;
    end

    -- Extract the actual role name
    local has_name, role_name = try_fetch_child(ic_role, "name");
    if not has_name then
        origin.send(st.error_reply(stanza, "cancel", "item-not-found", "Missing role name"));
        return;
    end
    local has_partner, role_partner = try_fetch_child(ic_role, "partner");
    if not has_partner then
        role_partner = nil;
    end        

    remove_role(room_jid, target_jid, role_name, role_partner);

    origin.send(st.reply(origStanza));
end

--[=[------------------------------------------------------[=[---
                   Transcript link methods
--]=]------------------------------------------------------]=]---

function broadcast_transcript_link(room_jid)
    module:log("debug", "The transcript link is being broadcast to room " .. tostring(room_jid));    
    -- Create the main ic and transcript_links element
    local ic_stanza = st.stanza("transcript_links");

    -- Check if the room exists in the transcript-links table
    if ic_transcript_links[room_jid] then
        ic_stanza:add_child(st.stanza("link"):text(ic_transcript_links[room_jid]));
    end

    local wrap_ic = st.stanza("ic"):add_child(ic_stanza);
    local message = st.message({ from = room_jid, type = 'groupchat' }):add_child(wrap_ic);

    local room = get_room_from_jid(room_jid);
    if room then
        room:broadcast_message(message);
    end
end

function set_transcript_link(room_jid, link)
    if not ic_transcript_links[room_jid] then
        ic_transcript_links[room_jid] = {};
    end

    ic_transcript_links[room_jid] = link;

    broadcast_transcript_link(room_jid);
end

-- Hook method to update the transcript-link
local function shared_hook_update_transcription_link(host_module, event)
    local origin, origStanza = event.origin, event.stanza;
    
    local stanza = origStanza:get_child("update-transcription-link", tagNamespace);

    local has_room_jid, room_jid = try_fetch_child(stanza, "room");
    local has_link, link = try_fetch_child(stanza, "link");
    
    if not has_room_jid then
        origin.send(st.error_reply(stanza, "cancel", "item-not-found", "Missing room"));
        return;
    end
    if not has_link then
        origin.send(st.error_reply(stanza, "cancel", "item-not-found", "Missing link"));
        return;
    end
        
    local sender_jid = stanza.attr.from;
    
    -- Get the room from the MUC component
    local room = module:context(room_jid);
    if (not room) then
        origin.send(st.error_reply(stanza, "cancel", "item-not-found", "Room not found"));
        return true;
    end

    -- Check for affiliation of the sender
    -- TODO: Fix this and make it proper
    -- local affiliation = room:get_affiliation(sender_jid);
    -- if (affiliation ~= "admin" and affiliation ~= "owner") then
        -- origin.send(st.error_reply(stanza, "auth", "forbidden", "You don't have permission to perform this action"));
        -- return true;
    -- end
    
    set_transcript_link(room_jid, link);

    origin.send(st.reply(origStanza));
end


--[=[------------------------------------------------------[=[---
                   Recording rejection methods
--]=]------------------------------------------------------]=]---

function broadcast_reject_recording(room_jid)
    module:log("debug", "Broadcasting room recording rejection " .. tostring(room_jid));    
    
    -- Create the main ic and transcript_links element
    local ic_stanza = st.stanza("reject-recording");

    local wrap_ic = st.stanza("ic"):add_child(ic_stanza);
    local message = st.message({ from = room_jid, type = 'groupchat' }):add_child(wrap_ic);

    local room = get_room_from_jid(room_jid);
    if room then
        room:broadcast_message(message);
    end
end

-- Hook method to update the transcript-link
local function shared_hook_reject_recording(host_module, event)
    local origin, origStanza = event.origin, event.stanza;
    
    local stanza = origStanza:get_child("reject-recording", tagNamespace);

    local has_room_jid, room_jid = try_fetch_child(stanza, "room");
    
    if not has_room_jid then
        origin.send(st.error_reply(stanza, "cancel", "item-not-found", "Missing room"));
        return;
    end
        
    -- Get the room from the MUC component
    local room = module:context(room_jid);
    if (not room) then
        origin.send(st.error_reply(stanza, "cancel", "item-not-found", "Room not found"));
        return true;
    end

    broadcast_reject_recording(room_jid);

    origin.send(st.reply(origStanza));
end


--[=[------------------------------------------------------[=[---
                Host specific event handlers
--]=]------------------------------------------------------]=]---

function module.add_host(module)
    module:log("info", "Loading role module for host %s", module.host);

    local host_module = module;

    -- Room specific hooks
    module:hook("muc-occupant-joined", function(event)
        muc_hook_occupant_joined(host_module, event);
    end);

    module:hook("muc-occupant-left", function(event)
        muc_hook_occupant_left(host_module, event);
    end);

    module:hook("muc-room-destroyed", function(event)
        muc_hook_room_destroyed(host_module, event);
    end);

    module:hook("muc-broadcast-presence", function(event)
        muc_hook_broadcast_presence(host_module, event);
    end);
    
    -- Read IC roles
    module:hook("iq/bare/" .. tagNamespace .. ":get-ic-roles", function(event)
        shared_hook_get_ic_roles(host_module, event);
    end);

    -- Add IC role
    module:hook("iq/bare/" .. tagNamespace .. ":add-ic-role", function(event)
        shared_hook_add_ic_role(host_module, event);
    end);

    -- Removing IC role
    module:hook("iq/bare/" .. tagNamespace .. ":remove-ic-role", function(event)
        shared_hook_remove_ic_role(host_module, event);
    end);

    -- Transcription link update hook
    module:hook("iq/bare/" .. tagNamespace .. ":update-transcription-link", function(event)
        shared_hook_update_transcription_link(host_module, event);
    end);

    -- Transcription link update hook
    module:hook("iq/bare/" .. tagNamespace .. ":reject-recording", function(event)
        shared_hook_reject_recording(host_module, event);
    end);
end
