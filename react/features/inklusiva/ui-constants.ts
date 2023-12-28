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
