import React from "react";
import Icon from "@ant-design/icons";

const LayersIconSVG = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0L3 7L4.63 8.27L12 14L19.36 8.27L21 7L12 0ZM19.37 10.73L12 16.47L4.62 10.74L3 12L12 19L21 12L19.37 10.73ZM19.37 15.73L12 21.47L4.62 15.74L3 17L12 24L21 17L19.37 15.73Z" fill="#EB5757"/>
    </svg>

);

export const LayersIcon = props => <Icon component={LayersIconSVG} {...props} />;
