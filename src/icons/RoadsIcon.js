import React from "react";
import Icon from "@ant-design/icons";

const RoadsIconSVG = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 16H13V20H11V16ZM11 10H13V14H11V10ZM11 4H13V8H11V4ZM4 22H20V2H4V22Z" fill="#F2994A"/>
    </svg>
);

export const RoadsIcon = props => <Icon component={RoadsIconSVG} {...props} />;
