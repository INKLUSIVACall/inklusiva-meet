import { IStateful } from '../../base/app/types';
import { toState } from '../../base/redux/functions';

/**
 *  Gets user video Props.
 *
 * @param {IStateful} stateful - The redux state.
 * @returns {IUserData} The user video props.
 */
export function getUserVideoTabProps(stateful: IStateful) {
    const state = toState(stateful);

    return {
        //...
    };
}
