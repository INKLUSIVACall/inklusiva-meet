import { Theme } from '@mui/material';
import { withStyles } from '@mui/styles';
import React from 'react';
import { WithTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import { createProfilePanelButtonEvent } from '../../../analytics/AnalyticsEvents';
import { sendAnalytics } from '../../../analytics/functions';
import { IStore } from '../../../app/types';
import { login, logout } from '../../../authentication/actions.web';
import Avatar from '../../../base/avatar/components/Avatar';
import AbstractDialogTab, {
    IProps as AbstractDialogTabProps } from '../../../base/dialog/components/web/AbstractDialogTab';
import { translate } from '../../../base/i18n/functions';
import { withPixelLineHeight } from '../../../base/styles/functions.web';
import Button from '../../../base/ui/components/web/Button';
import Checkbox from '../../../base/ui/components/web/Checkbox';
import Input from '../../../base/ui/components/web/Input';
import { inklusivaSettingsStyles } from '../../../inklusiva/ui-constants';

/**
 * The type of the React {@code Component} props of {@link ProfileTab}.
 */
export interface IProps extends AbstractDialogTabProps, WithTranslation {

    /**
     * Whether server-side authentication is available.
     */
    authEnabled: boolean;

    /**
     * The name of the currently (server-side) authenticated user.
     */
    authLogin: string;

    /**
     * CSS classes object.
     */
    classes: any;

    /**
     * Invoked to change the configured calendar integration.
     */
    dispatch: IStore['dispatch'];

    /**
     * The display name to display for the local participant.
     */
    displayName: string;

    /**
     * The email to display for the local participant.
     */
    email: string;

    /**
     * Whether to hide the email input in the profile settings.
     */
    hideEmailInSettings?: boolean;

    /**
     * The id of the local participant.
     */
    id: string;

    /**
     * Whether easy language mode is enabled.
     */
    learningDifficulties: boolean;

    /**
     * If the display name is read only.
     */
    readOnlyName: boolean;

}

const styles = (theme: Theme) => {
    return {
        container: {
            display: 'flex',
            flexDirection: 'column' as const,
            width: '100%',
            padding: '0 2px'
        },

        avatarContainer: {
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            marginBottom: theme.spacing(4)
        },

        bottomMargin: {
            marginBottom: theme.spacing(4)
        },

        label: {
            color: `${theme.palette.text01} !important`,
            ...withPixelLineHeight(theme.typography.bodyShortRegular),
            marginBottom: theme.spacing(2),
            fontSize: '0.875rem'
        },

        name: {
            marginBottom: theme.spacing(1)
        },

        ...inklusivaSettingsStyles(theme)
    };
};

/**
 * React {@code Component} for modifying the local user's profile.
 *
 * @augments Component
 */
class ProfileTab extends AbstractDialogTab<IProps, any> {
    static defaultProps = {
        displayName: '',
        email: ''
    };

    /**
     * Initializes a new {@code ConnectedSettingsDialog} instance.
     *
     * @param {IProps} props - The React {@code Component} props to initialize
     * the new {@code ConnectedSettingsDialog} instance with.
     */
    constructor(props: IProps) {
        super(props);

        // Bind event handlers so they are only bound once for every instance.
        this._onAuthToggle = this._onAuthToggle.bind(this);
        this._onDisplayNameChange = this._onDisplayNameChange.bind(this);
        this._onEmailChange = this._onEmailChange.bind(this);
    }

    /**
     * Changes display name of the user.
     *
     * @param {string} value - The key event to handle.
     *
     * @returns {void}
     */
    _onDisplayNameChange(value: string) {
        super._onChange({ displayName: value });
    }

    /**
     * Changes email of the user.
     *
     * @param {string} value - The key event to handle.
     *
     * @returns {void}
     */
    _onEmailChange(value: string) {
        super._onChange({ email: value });
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const {
            authEnabled,
            classes,
            displayName,
            email,
            hideEmailInSettings,
            id,
            readOnlyName,
            learningDifficulties,
            t
        } = this.props;

        return (
            <div className = { classes.container } >
                <div className = { classes.avatarContainer }>
                    <Avatar
                        participantId = { id }
                        size = { 60 } />
                </div>
                <Input
                    className = { classes.bottomMargin }
                    disabled = { readOnlyName }
                    id = 'setDisplayName'
                    label = { t('profile.setDisplayNameLabel') }
                    name = 'name'
                    onChange = { this._onDisplayNameChange }
                    placeholder = { t('settings.name') }
                    type = 'text'
                    value = { displayName } />
                {!hideEmailInSettings && <div className = 'profile-edit-field'>
                    <Input
                        className = { classes.bottomMargin }
                        id = 'setEmail'
                        label = { t('profile.setEmailLabel') }
                        name = 'email'
                        onChange = { this._onEmailChange }
                        placeholder = { t('profile.setEmailInput') }
                        type = 'text'
                        value = { email } />
                </div>}
                { authEnabled && this._renderAuth() }

                <div className = { classes.inputblockContainer }>
                    <h2>{ t('settings.basic.languageHeadline')}</h2>
                    <p>{ t('settings.basic.languageDescription')}</p>
                    <Checkbox
                        checked = { learningDifficulties }
                        className = { classes.inputElement }
                        label = { t('settings.basic.languageHeadline') }
                        name = 'learning_difficulties_enable'
                        onChange = { () =>
                            super._onChange({
                                learningDifficulties: !learningDifficulties
                            })
                        } />
                </div>

            </div>
        );
    }

    /**
     * Shows the dialog for logging in or out of a server and closes this
     * dialog.
     *
     * @private
     * @returns {void}
     */
    _onAuthToggle() {
        if (this.props.authLogin) {
            sendAnalytics(createProfilePanelButtonEvent('logout.button'));

            this.props.dispatch(logout());
        } else {
            sendAnalytics(createProfilePanelButtonEvent('login.button'));

            this.props.dispatch(login());
        }
    }

    /**
     * Returns a React Element for interacting with server-side authentication.
     *
     * @private
     * @returns {ReactElement}
     */
    _renderAuth() {
        const {
            authLogin,
            classes,
            t
        } = this.props;

        return (
            <div>
                <h2 className = { classes.label }>
                    { t('toolbar.authenticate') }
                </h2>
                { authLogin
                    && <div className = { classes.name }>
                        { t('settings.loggedIn', { name: authLogin }) }
                    </div> }
                <Button
                    accessibilityLabel = { authLogin ? t('toolbar.logout') : t('toolbar.login') }
                    id = 'login_button'
                    label = { authLogin ? t('toolbar.logout') : t('toolbar.login') }
                    onClick = { this._onAuthToggle } />
            </div>
        );
    }
}

export default withStyles(styles)(translate(connect()(ProfileTab)));
