import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';

import { IReduxState } from '../../../app/types';
import Icon from '../../../base/icons/components/Icon';
import { IconCheck, IconCloseLarge, IconHighlight } from '../../../base/icons/svg';
import {
    getParticipantById,
    getParticipantDisplayName
} from '../../../base/participants/functions';
import { updateSettings } from '../../../base/settings/actions';
import { withPixelLineHeight } from '../../../base/styles/functions.web';
import ClickableIcon from '../../../base/ui/components/web/ClickableIcon';
import { appendSuffix } from '../../functions';


/**
 * The type of the React {@code Component} props of {@link DisplayName}.
 */
interface IProps {

    /**
     * Whether or not the display name should be editable on click.
     */
    allowEditing: boolean;

    /**
     * A string to append to the displayName, if provided.
     */
    displayNameSuffix: string;

    /**
     * The ID attribute to add to the component. Useful for global querying for
     * the component by legacy components and torture tests.
     */
    elementID: string;

    /**
     * The ID of the participant whose name is being displayed.
     */
    participantID: string;

    /**
     * The type of thumbnail.
     */
    thumbnailType?: string;
}

const useStyles = makeStyles()(theme => {
    return {
        displayNameContainer: {
            overflow: 'visible !important'
        },

        displayName: {
            ...withPixelLineHeight(theme.typography.labelBold),
            color: theme.palette.text01,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
        },

        editDisplayName: {
            outline: 'none',
            border: 'none',
            background: 'none',
            boxShadow: 'none',
            padding: 0,
            ...withPixelLineHeight(theme.typography.labelBold),
            color: theme.palette.text01
        },

        icon: {
            padding: '2px',
            backgroundColor: theme.palette.action03,
            border: 0,
            outline: 0,
            borderRadius: `${theme.shape.borderRadius}px`,

            '&:hover': {
                backgroundColor: theme.palette.ui02
            }
        }
    };
});

const DisplayName = ({
    allowEditing,
    displayNameSuffix,
    elementID,
    participantID
}: IProps) => {
    const { classes } = useStyles();
    const localStatus = useSelector((state: IReduxState) =>
        getParticipantById(state, participantID))?.local ?? '';
    const nameToDisplay = useSelector((state: IReduxState) => getParticipantDisplayName(state, participantID));
    const [ editDisplayNameValue, setEditDisplayNameValue ] = useState('');
    const [ isEditing, setIsEditing ] = useState(false);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const nameInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (isEditing && nameInputRef.current) {
            nameInputRef.current.select();
        }
    }, [ isEditing ]);

    const onClick = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
    }, []);

    const onBlur = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
        const target = event.relatedTarget as HTMLElement | null;

        // Wenn auf Annehmen oder Abblehnen geklickt wird soll nicht automatisch dismissed werden
        if (target?.id === 'display-name-accept-button' || target?.id === 'display-name-cancel-button') {
            return;
        }
        setIsEditing(false);
    }, []);

    const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setEditDisplayNameValue(event.target.value);
    }, []);

    const onSubmit = useCallback(() => {
        // Name leer -> Verwerfen
        if (editDisplayNameValue) {
            dispatch(updateSettings({
                displayName: editDisplayNameValue
            }));

            setEditDisplayNameValue('');
            nameInputRef.current = null;
        }
        setIsEditing(false);
    }, [ editDisplayNameValue, nameInputRef ]);

    const onDismiss = useCallback(() => {
        setIsEditing(false);
    }, []);

    // Enter speichert Änderungen, Escape verwirft
    const onKeyDown = useCallback((event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            onSubmit();
        }
        if (event.key === 'Escape') {
            onDismiss();
        }
    }, [ onSubmit, onDismiss ]);

    const onStartEditing = useCallback((e: React.MouseEvent | React.KeyboardEvent) => {
        if (allowEditing) {
            e.stopPropagation();
            setIsEditing(true);
            setEditDisplayNameValue('');
        }
    }, [ allowEditing ]);

    // Screenreader: Enter startet editing
    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLSpanElement>) => {
        if (e.key === 'Enter') {
            onStartEditing(e);
        }
    }, [ onStartEditing ]);

    if (allowEditing && isEditing) {
        return (
            <div
                onBlur = { onBlur }
                onClick = { onClick }>
                <input
                    autoFocus = { true }
                    className = { classes.editDisplayName }
                    id = 'editDisplayName'
                    onChange = { onChange }
                    onKeyDown = { onKeyDown }
                    placeholder = { t('defaultNickname') }
                    ref = { nameInputRef }
                    spellCheck = { 'false' }
                    type = 'text'
                    value = { editDisplayNameValue } />
                <ClickableIcon
                    accessibilityLabel = { t('dialog.accessibilityLabel.SaveName') }
                    icon = { IconCheck }
                    id = 'display-name-accept-button'
                    onClick = { onSubmit } />
                <ClickableIcon
                    accessibilityLabel = { t('dialog.Cancel') }
                    icon = { IconCloseLarge }
                    id = 'display-name-cancel-button'
                    onClick = { onDismiss } />
            </div>

        );
    }

    return (
        <div
            className = { `displayNameContainer ${classes.displayNameContainer}` }>
            <span
                aria-label = { t('dialog.accessibilityLabel.ChangeName', { name: nameToDisplay }) }
                className = { `displayname ${classes.displayName}` }
                id = { elementID }
                onClick = { onStartEditing }
                onKeyDown = { handleKeyDown }
                role = 'button'
                tabIndex = { 0 }>
                {appendSuffix(nameToDisplay, displayNameSuffix)}
                { localStatus
                && <Icon
                    className = { classes.icon }
                    id = { 'display-name-change-button' }
                    size = { 24 }
                    src = { IconHighlight } />}
            </span>
        </div>
    );
};


export default DisplayName;
