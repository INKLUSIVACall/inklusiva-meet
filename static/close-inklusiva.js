/* global interfaceConfig */

/**
 * Sets the hint and thanks messages. Will be executed on load event.
 */
function onLoad() {
    setTimeout( () => {
        const targetUrl = `${interfaceConfig.CLOSE_PAGE_ROOT_URL}/${localStorage.getItem('inklusiva_meeting_id')}/start`;

        document.location.href = targetUrl;
    }, 0);
}

window.onload = onLoad;
