#!/bin/bash

scp mod_user_ic_roles.lua root@inklusiva-meet.4morgen.de:/var/www/inklusiva-meet/resources/prosody-plugins
ssh root@inklusiva-meet.4morgen.de systemctl restart prosody