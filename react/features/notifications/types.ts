import React from 'react';

export interface INotificationProps {
    appearance?: string;
    concatText?: boolean;
    customActionHandler?: Function[];
    customActionNameKey?: string[];
    customActionType?: string[];
    customChatNotificationAction?: {
        onClick: () => void;
        text: string;
    };
    description?: string | React.ReactNode;
    descriptionArguments?: Object;
    descriptionKey?: string;
    hideErrorSupportLink?: boolean;
    icon?: string;
    maxLines?: number;
    sticky?: boolean;
    title?: string;
    titleArguments?: {
        [key: string]: string | number;
    };
    titleKey?: string;
    uid?: string;
}
