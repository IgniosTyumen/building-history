import React from "react";
import Icon from "@ant-design/icons";

const OpenedSelectorPanelIconSVG = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="8" fill="#1A1B1E"/>
        <path d="M33 27.61L31.59 29L26.58 24L31.59 19L33 20.39L29.44 24L33 27.61ZM15 18H28V20H15V18ZM15 25V23H25V25H15ZM15 30V28H28V30H15Z" fill="#2F80ED"/>
    </svg>
);

export const OpenedSelectorPanelIcon = props => <Icon component={OpenedSelectorPanelIconSVG} {...props} />;
