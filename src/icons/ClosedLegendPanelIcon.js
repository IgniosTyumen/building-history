import React from "react";
import Icon from "@ant-design/icons";

const ClosedSelectorPanelIconSVG = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="46" height="46" rx="7" fill="none" stroke="#2F80ED" stroke-width="2"/>
        <path d="M15 18H33V20H15V18ZM15 23H33V25H15V23ZM15 28H33V30H15V28Z" fill="#2F80ED"/>
    </svg>

);

export const ClosedSelectorPanelIcon = props => <Icon component={ClosedSelectorPanelIconSVG} {...props} />;
