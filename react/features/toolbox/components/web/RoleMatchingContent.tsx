/* eslint-disable react/no-multi-comp */
import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from 'tss-react/mui';

import { IReduxState, IStore } from '../../../app/types';
import { IconUser } from '../../../base/icons/svg';
import Button from '../../../base/ui/components/web/Button';
import ContextMenu from '../../../base/ui/components/web/ContextMenu';
import ContextMenuItem from '../../../base/ui/components/web/ContextMenuItem';
import ContextMenuItemGroup from '../../../base/ui/components/web/ContextMenuItemGroup';
import { BUTTON_TYPES, TEXT_OVERFLOW_TYPES } from '../../../base/ui/constants.web';


const useStyles = makeStyles()(theme => {
    return {
        contextMenu: {
            position: 'relative',
            right: 'auto',
            margin: 0,
            marginBottom: theme.spacing(1),
            maxHeight: 'calc(100vh - 100px)',
            overflow: 'auto',
            width: '300px'
        },

        header: {
            '&:hover': {
                backgroundColor: 'initial',
                cursor: 'initial'
            }
        },

        list: {
            margin: 0,
            padding: 0,
            listStyleType: 'none'
        },

        checkboxContainer: {
            padding: '10px 16px'
        },
        button: {
            width: '100%'
        }
    };
});

const RoleMatchingContent = () => {
    const { classes } = useStyles();


    const assistees = [
        { name: 'John Doe',
            participantId: '1234' },
        { name: 'Jane Doe',
            participantId: '5678' },
        { name: 'John Doe',
            participantId: '1234' },
        { name: 'Jane Doe',
            participantId: '5678' },
        { name: 'John Doe',
            participantId: '1234' },
        { name: 'Jane Doe',
            participantId: '5678' },
        { name: 'John Doe',
            participantId: '1234' }
    ];

    const _onClickNeedAssistance = function() {
        console.log('need assistance');
    };

    /**
     * Renders a single microphone entry.
     *
     * @param {Object} data - An object with the deviceId, jitsiTrack & label of the microphone.
     * @param {number} index - The index of the element, used for creating a key.
     * @param {length} length - The length of the microphone list.
     * @returns {React$Node}
     */
    const _renderAssistees = (data: { name: string; participantId: string; }, index: number, length: number) => (
        <li
            aria-posinset = { index }
            aria-setsize = { length }
            key = { index }
            role = 'radio'
            tabIndex = { 0 }>
            <ContextMenuItem
                accessibilityLabel = { 'alfj' }
                overflowType = { TEXT_OVERFLOW_TYPES.SCROLL_ON_HOVER }>
                <Button
                    className = { classes.button }
                    label = { `... ${data.name}` }
                    type = { BUTTON_TYPES.PRIMARY } />
            </ContextMenuItem>
        </li>
    );


    return (
        <ContextMenu
            aria-labelledby = 'audio-settings-button'
            className = { classes.contextMenu }
            hidden = { false }
            id = 'audio-settings-dialog'
            tabIndex = { -1 }>
            <ContextMenuItemGroup>
                <ContextMenuItem
                    accessibilityLabel = { 'Ich benötige Assistenz' }>
                    <Button
                        className = { classes.button }
                        label = 'Ich benötige Assistenz'
                        onClick = { _onClickNeedAssistance }
                        type = { BUTTON_TYPES.PRIMARY } />
                </ContextMenuItem>

            </ContextMenuItemGroup>
            {assistees.length > 0 && (
                <ContextMenuItemGroup>
                    <ContextMenuItem
                        accessibilityLabel = { 'Ich übernehme Assistenz für...' }
                        className = { classes.header }
                        icon = { IconUser }
                        id = { 'assistees' }
                        text = { 'Ich übernehme Assistenz für...' } />
                    <ul
                        aria-labelledby = { 'assistees' }
                        className = { classes.list }
                        role = 'radiogroup'
                        tabIndex = { -1 }>
                        {assistees.map((data: any, i: number) =>
                            _renderAssistees(data, i, assistees.length)
                        )}
                    </ul>
                </ContextMenuItemGroup>
            )}
        </ContextMenu>
    );
};

const mapStateToProps = (_: IReduxState) => {
    return {
    };
};

const mapDispatchToProps = (_: IStore['dispatch']) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoleMatchingContent);
