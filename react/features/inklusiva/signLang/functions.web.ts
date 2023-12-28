import { IReduxState } from '../../app/types';
import { IStateful } from '../../base/app/types';
import { toState } from '../../base/redux/functions';
import { getTranscriptionTabProps } from '../transcription/functions.web';

export function isSignLangEnabled(state: IReduxState): boolean | undefined {
    return state['features/inklusiva/userdata'].assistant?.signLang?.active;
}

export function getDisplayString(state: IReduxState): string | undefined {
    return state['features/inklusiva/userdata'].assistant?.signLang?.display;
}

export function getWindowSize(state: IReduxState): number | undefined {
    return state['features/inklusiva/userdata'].assistant?.signLang?.windowSize;
}

export function getSignLangTabProps(stateful: IStateful) {
    const state = toState(stateful);
    const signLangActive = isSignLangEnabled(state);
    const signLangDisplay = getDisplayString(state);
    const signLangWindowSize = getWindowSize(state);

    const transcriptionProps = getTranscriptionTabProps(state);

    return {
        signLangActive,
        signLangDisplay,
        signLangWindowSize,
        ...transcriptionProps
    };
}
