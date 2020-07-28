import React from "react";
import styled from "styled-components";

const StyledIconicTitle = styled.div`
  display: flex;
  padding-left: 25px;
  .title{
    font-family: Open Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    color: #FFFFFF;
    padding-left: 20px;
  }
`
const IconicTitle = (props) => {
    return (
        <StyledIconicTitle>
            {props.icon}
            <p className={'title'}>{props.text}</p>
        </StyledIconicTitle>
    )
}

export default IconicTitle;
