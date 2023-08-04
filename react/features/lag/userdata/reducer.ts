import ReducerRegistry from '../../base/redux/ReducerRegistry';
import { equals } from '../../base/redux/functions';

import { SET_USERDATA } from './actionTypes';

export interface IUserdataState {
    userData?: {
        name: string;
        support: {
            eyesight: string;
            hearing: string;
            senses: boolean;
            learning_difficulties: boolean;
        },
        ui: {
            fontSize: number;
            iconSize: number;
            screenreader: boolean;
            visualCues: boolean;
            acousticCues: boolean;
        },
        video: {
            otherParticipants: boolean;
            contrast: number;
            brightness: number;
            dimming: number;
            saturation: number;
            zoom: number;
            fps: number;
        },
        audio: {
            otherParticipants: boolean;
            volume: number;
            highFrequency: number;
            amplify: boolean;
            balance: number;
            background: boolean;
            output: string;
        },
        distressbutton: {
            active: boolean;
            dimming: number;
            volume: number;
            message: boolean;
            messageText: string;
        },
        assistant: {
            signLanguage: {
                active: boolean;
                display: string;
                windowSize: number;
            },
            transcription: {
                active: boolean;
                fontSize: number;
                history: number;
            }
        }
    };
}

/**
 * Reduces redux actions which affect the JSON Web Token (JWT) stored in the
 * redux store.
 *
 * @param {Object} state - The current redux state.
 * @param {Object} action - The redux action to reduce.
 * @returns {Object} The next redux state which is the result of reducing the
 * specified {@code action}.
 */
ReducerRegistry.register<IUserdataState>(
    'features/lag/userdata',
    (state = {}, action): IUserdataState => {
        switch (action.type) {
        case SET_USERDATA: {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { type, ...payload } = action;
            const nextState = {
                ...payload
            };

            return equals(state, nextState) ? state : nextState;
        }
        }

        return state;
    });
