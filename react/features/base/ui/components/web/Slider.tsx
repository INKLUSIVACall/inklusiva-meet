import React from 'react';
import { makeStyles } from 'tss-react/mui';

import { isMobileBrowser } from '../../../environment/utils';
import Icon from '../../../icons/components/Icon';
import { IconCheck } from '../../../icons/svg';
import { withPixelLineHeight } from '../../../styles/functions.web';

interface ISliderProps {

    /**
     * Class name for additional styles.
     */
    className?: string;

    /**
     * Whether the input is disabled or not.
     */
    disabled?: boolean;

    /**
     * The label of the input.
     */
    label: string;

    /**
     * The name of the input.
     */
    name?: string;

    /**
     *  The value of the input.
     */
    defaultValue?: number;

    /**
     *  The min value of the input
     */
    min?: number;

    /**
     *  The max value of the input
     */
    max?: number;

    /**
     *  The step value of the input
     */
    step?: number;

    /**
     * Change callback.
     */
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const useStyles = makeStyles()(theme => {
    return {
        // Place CSS here.
        formControl: {
            ...withPixelLineHeight(theme.typography.bodyLongRegular),
            color: theme.palette.text01,
            display: 'inline-flex',
            alignItems: 'center',

            '&.is-mobile': {
                ...withPixelLineHeight(theme.typography.bodyLongRegularLarge)

            }
        },
        label: {
            marginRight: '15px',
        }
    };
});

const Slider = ({
    className,
    disabled,
    label,
    name,
    defaultValue,
    min,
    max,
    step,
    onChange
}: ISliderProps) => {
    const { classes: styles, cx, theme } = useStyles();
    const isMobile = isMobileBrowser();

    return (
        <div className = { cx(styles.formControl, isMobile && 'is-mobile', className) }>
            <label className={ cx(styles.label, isMobile && 'is-mobile', className) }>{label}</label>
            <input
                disabled = { disabled }
                name = { name }
                //value = { value }
                min = { min }
                max = { max }
                step = { step }
                onChange = { onChange }
                defaultValue = { defaultValue }
                type = 'range' />
        </div>
    );
};

export default Slider;
