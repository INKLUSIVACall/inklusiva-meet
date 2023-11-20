/**
 * Co Host role. Must be an XMPP moderator.
 */
export const IC_ROLE_COHOST = "IC_ROLE_COHOST";

/**
 * Captioner role.
 */
export const IC_ROLE_CAPTIONER = "IC_ROLE_CAPTIONER";

/**
 * Sign language translator.
 */
export const IC_ROLE_SIGN_LANG_TRANSLATOR = "IC_ROLE_SIGN_LANG_TRANSLATOR";

/**
 * Assistant role.
 */
export const IC_ROLE_ASSISTANT = "IC_ROLE_ASSISTANT";

/**
 * Additional role. Is set if someone is assisted by another user.
 */
export const IC_ROLE_ASSISTED = "IC_ROLE_ASSISTED";

/**
 * Role collection
 */
export enum IC_ROLES {
    COHOST = IC_ROLE_COHOST,
    CAPTIONER = IC_ROLE_CAPTIONER,
    SIGN_LANG_TRANSLATOR = IC_ROLE_SIGN_LANG_TRANSLATOR,
    ASSISTANT = IC_ROLE_ASSISTANT,
    ASSISTED = IC_ROLE_ASSISTED
}