import React from 'react';
import { makeStyles } from 'tss-react/mui';

import { isMobileBrowser } from '../../../environment/utils';
import { withPixelLineHeight } from '../../../styles/functions.web';

interface ISliderProps {

    /**
     * Class name for additional styles.
     */
    className?: string;

    /**
     *  The value of the input.
     */
    defaultValue?: number;

    /**
     * Whether the input is disabled or not.
     */
    disabled?: boolean;

    /**
     * The id of the slider.
     */
    id: string;

    /**
     * The label of the input.
     */
    label: string;

    /**
     *  The max value of the input.
     */
    max?: number;

    /**
     *  The min value of the input.
     */
    min?: number;

    /**
     * The name of the input.
     */
    name?: string;

    /**
     * Change callback.
     */
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

    /**
     *  The step value of the input.
     */
    step?: number;
}

const useStyles = makeStyles()(theme => {
    return {
        // Place CSS here.
        formControl: {
            ...withPixelLineHeight(theme.typography.bodyLongRegular),
            color: theme.palette.text01,
            display: 'flex',
            alignItems: 'center',
            fontSize: '0.875rem',

            '&.is-mobile': {
                ...withPixelLineHeight(theme.typography.bodyLongRegularLarge)
            }
        },
        controlColumn: {
            flex: '1 1 auto'
        },
        labelColumn: {
            flex: '0 0 50%',
            fontSize: '1rem'
        },
        labelFormat: {
            fontWeight: '400 !important'
        }
    };
});

const Slider = ({
    className,
    disabled,
    id,
    label,
    name,
    defaultValue,
    min,
    max,
    step,
    onChange
}: ISliderProps) => {
    const { classes: styles, cx } = useStyles();
    const isMobile = isMobileBrowser();

    return (
        <div className = { cx(styles.formControl, isMobile && 'is-mobile', className) }>
            <div className = { styles.labelColumn }>
                <label className = { cx(styles.labelFormat, isMobile && 'is-mobile', className) } htmlFor = { id }>{ label }</label>
            </div>
            <div className = { styles.controlColumn }>
                <input
                    id = { id }
                    defaultValue = { defaultValue }
                    disabled = { disabled }
                    max = { max }
                    min = { min }
                    name = { name }
                    onChange = { onChange }
                    step = { step }
                    type = 'range' />
            </div>
        </div>
    );
};

export default Slider;

