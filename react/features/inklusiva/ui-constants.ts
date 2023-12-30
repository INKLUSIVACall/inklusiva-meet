import { Theme } from '@mui/material';

export const inklusivaSettingsStyles = (theme: Theme) => {
    return {
        inputblockContainer: {
            marginBottom: theme.spacing(3)
        },
        controlContainer: {
            display: 'flex'
        },
        controlColumn: {
            flex: '1 1 auto',
            marginBottom: '10px !important',
            display: 'flex',
            flexFlow: 'column'
        },
        controlColumnLabel: {
            fontSize: '1rem',
            lineHeight: '1.6rem'
        },
        valueColumn: {
            flex: '0 0 20%',
            paddingLeft: theme.spacing(5)
        },
        flexDirectionRow: {
            flexDirection: 'row' as const
        }
    };
};

export const inklusivaContextMenuStyles = (theme: Theme) => {
    return {
        contextMenuSlider: {
            display: 'flex',
            flexDirection: 'column' as const,
            padding: '10px 16px',

            '&:hover': {
                backgroundColor: theme.palette.ui02
            }
        },

        contextMenuSliderLabel: {
            fontSize: '0.9rem',
            marginBottom: '0.4rem'
        },

        contextMenuSliderInner: {
            width: '100%',
            boxSizing: 'border-box' as const,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
        },

        contextMenuSliderIcon: {
            marginRight: '16px'
        }
    };
};

