import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from 'tss-react/mui';

import Icon from '../../../base/icons/components/Icon';
import { IconVolumeUp } from '../../../base/icons/svg';

/**
 * The type of the React {@code Component} props of {@link OpacityAdjustSlider}.
 */
interface IProps {

    /**
     * The value of the frequency filter slider should display at when the
     * component first mounts. Changes will be stored in state. The value
     * should be an integer between 0 and 5.
     */
    initialValue: number;

    /**
     * The callback to invoke when the frequency filter slider value changes.
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

const OpacityAdjustSlider = ({
    initialValue,
    onChange
}: IProps) => {
    const { classes, cx } = useStyles();
    const { t } = useTranslation();

    const [ opacity, setOpacity ] = useState(initialValue);

    const _onFrequencyAdjustChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const newOpacity = event.currentTarget.value;

        onChange(newOpacity);
        setOpacity(Number(newOpacity));
    }, [ onChange ]);

    return (
        <div
            aria-label = { t('opacityAdjustSlider') }
            className = { cx('popupmenu__contents', classes.container) }
            onClick = { _onClick }>
            <span className = { classes.icon }>
                <Icon
                    size = { 22 }
                    src = { IconVolumeUp } />
            </span>
            <div className = { classes.sliderContainer }>
                <input
                    aria-valuemax = { 100 }
                    aria-valuemin = { 0 }
                    aria-valuenow = { opacity }
                    className = { cx('popupmenu__volume-slider', classes.slider) }
                    max = { 100 }
                    min = { 0 }
                    onChange = { _onFrequencyAdjustChange }
                    tabIndex = { 0 }
                    type = 'range'
                    value = { opacity } />
            </div>
        </div>
    );
};

export default OpacityAdjustSlider;
