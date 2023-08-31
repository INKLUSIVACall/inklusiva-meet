import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from 'tss-react/mui';

import Icon from '../../../base/icons/components/Icon';
import { IconVolumeUp } from '../../../base/icons/svg';
import { ZOOM_SLIDER_MINIMUM, ZOOM_SLIDER_MAXIMUM, ZOOM_SLIDER_SCALE } from '../../constants';

/**
 * The type of the React {@code Component} props of {@link ZoomSlider}.
 */
interface IProps {

    /**
     * The value the zoom slider will be initialised with when it
     * mounts. Changes will be stored in state. The value should be a number
     * between 1 and 3.
     */
    initialValue: number;

    /**
     * The callback to invoke when the zoom slider value changes.
     */
    onChange: Function;
}

const useStyles = makeStyles()(theme => {
    return {
        container: {
            minHeight: '40px',
            minWidth: '180px',
            width: '100%',
            boxSizing: 'border-box',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            padding: '10px 16px',

            '&:hover': {
                backgroundColor: theme.palette.ui02
            }
        },

        icon: {
            minWidth: '20px',
            marginRight: '16px',
            position: 'relative'
        },

        sliderContainer: {
            position: 'relative',
            width: '100%'
        },

        slider: {
            position: 'absolute',
            width: '100%',
            top: '50%',
            transform: 'translate(0, -50%)'
        }
    };
});

const _onClick = (e: React.MouseEvent) => {
    e.stopPropagation();
};

const ZoomSlider = ({
    initialValue,
    onChange
}: IProps) => {
    const { classes, cx } = useStyles();
    const { t } = useTranslation();

    const [ zoomLevel, setZoomLevel ] = useState((initialValue || 1) * ZOOM_SLIDER_SCALE);

    const _onZoomLevelChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const newZoomLevel = Number(event.currentTarget.value);

        onChange(newZoomLevel / ZOOM_SLIDER_SCALE);
        setZoomLevel(newZoomLevel);
    }, [ onChange ]);

    return (
        <div
            aria-label = { t('zoomSlider') }
            className = { cx('popupmenu__contents', classes.container) }
            onClick = { _onClick }>
            <span className = { classes.icon }>
                <Icon
                    size = { 22 }
                    src = { IconVolumeUp } />
            </span>
            <div className = { classes.sliderContainer }>
                <input
                    aria-valuemax = { ZOOM_SLIDER_MAXIMUM }
                    aria-valuemin = { ZOOM_SLIDER_MINIMUM }
                    aria-valuenow = { zoomLevel }
                    className = { cx('popupmenu__zoom-slider', classes.slider) }
                    max = { ZOOM_SLIDER_MAXIMUM }
                    min = { ZOOM_SLIDER_MINIMUM }
                    onChange = { _onZoomLevelChange }
                    tabIndex = { 0 }
                    type = 'range'
                    value = { zoomLevel } />
            </div>
        </div>
    );
};

export default ZoomSlider;
