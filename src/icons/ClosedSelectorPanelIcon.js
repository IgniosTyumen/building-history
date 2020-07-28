import React from "react";
import Icon from "@ant-design/icons";

const ClosedSelectorPanelIconSVG = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="46" height="46" rx="7" fill="none" stroke="#2F80ED" stroke-width="2"/>
        <path d="M21 15L15.36 16.9C15.15 16.97 15 17.15 15 17.38V32.5C15 32.6326 15.0527 32.7598 15.1464 32.8536C15.2402 32.9473 15.3674 33 15.5 33L15.66 32.97L21 30.9L27 33L32.64 31.1C32.85 31.03 33 30.85 33 30.62V15.5C33 15.3674 32.9473 15.2402 32.8536 15.1464C32.7598 15.0527 32.6326 15 32.5 15L32.34 15.03L27 17.1L21 15ZM20 17.45V29.15L17 30.31V18.46L20 17.45ZM22 17.47L26 18.87V30.53L22 29.13V17.47ZM31 17.7V29.54L28 30.55V18.86L31 17.7ZM19.46 18.3L17.57 18.97V21.12L19.46 20.45V18.3ZM19.46 21.05L17.57 21.72V23.87L19.46 23.2V21.05ZM19.46 23.8L17.57 24.47V26.62L19.46 25.95V23.8ZM19.46 26.55L17.57 27.22V29.37L19.46 28.7V26.55Z" fill="#2F80ED"/>
    </svg>

);

export const ClosedSelectorPanelIcon = props => <Icon component={ClosedSelectorPanelIconSVG} {...props} />;
