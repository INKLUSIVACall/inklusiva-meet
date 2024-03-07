import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from 'tss-react/mui';

import Icon from '../../../base/icons/components/Icon';
import {
    IconZoom
} from '../../../base/icons/svg';
import { inklusivaContextMenuStyles } from '../../../inklusiva/ui-constants';
import { ZOOM_SLIDER_MAXIMUM, ZOOM_SLIDER_MINIMUM } from '../../constants';

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
     * Label for the Slider.
     */
    label: string;

    /**
     * The callback to invoke when the zoom slider value changes.
     */
    onChange: Function;
}

const useStyles = makeStyles()(theme => {
    return {
        ...inklusivaContextMenuStyles(theme)
    };
});

const _onClick = (e: React.MouseEvent) => {
    e.stopPropagation();
};

const ZoomSlider = ({
    initialValue,
    label,
    onChange
}: IProps) => {
    const { classes, cx } = useStyles();
    const { t } = useTranslation();

    const [ zoomLevel, setZoomLevel ] = useState(initialValue || 1);

    const _onZoomLevelChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const newZoomLevel = Number(event.currentTarget.value);

        onChange(newZoomLevel);
        setZoomLevel(newZoomLevel);
    }, [ onChange ]);

    return (
        <div
            aria-label = { t('zoomSlider') }
            className = { classes.contextMenuSlider }>
            <label className = { classes.contextMenuSliderLabel } htmlFor = 'zoom-slider-input'>{ label }</label>
            <div
                className = { cx('popupmenu__contents', classes.contextMenuSliderInner) }
                onClick = { _onClick }>
                <span className = { classes.contextMenuSliderIcon }>
                    <Icon
                        size = { 22 }
                        src = { IconZoom } />
                </span>
                <input
                    aria-label = { label }
                    id = 'zoom-slider-input'
                    aria-valuemax = { ZOOM_SLIDER_MAXIMUM }
                    aria-valuemin = { ZOOM_SLIDER_MINIMUM }
                    aria-valuenow = { zoomLevel }
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
