import styled from "styled-components";
import {Button, Collapse, Modal} from "antd";

export const StyledSelectorsPanel = styled.div`
  position: absolute;
  width: 410px;
  height: 100vh;
  left: 0px;
  top: 0px;
  background: rgba(21, 21, 24, 0.9);
  z-index: 1000;
`
export const StyledSelectorsOpenPanelButton = styled.div`
  position: absolute;
  width: 88px;
  height: 88px;
  left: 0;
  top: 0;
  background: rgba(21, 21, 24, 0.9);
  border-radius: 0px 0px 0px 8px;
  transform: matrix(-1, 0, 0, 1, 0, 0);
  z-index: 1000;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
export const StyledLegendOpenPanelButton = styled.div`
  position: absolute;
  width: 88px;
  height: 88px;
  right: 0;
  top: 0;
  background: rgba(21, 21, 24, 0.9);
  border-radius: 0px 0px 0px 8px;
  z-index: 1000;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const StyledButtonPanel = styled(Button)`
    width: 50px;
    height: 50px;
    padding: 0;
    border-radius: 8px;
`

export const StyledCollapse = styled(Collapse)`
    background: rgba(21,21,24,0.9);
`

export const StyledButtonLegend = styled(Button)`
    width: 50px;
    height: 50px;
    padding: 0;
    border-radius: 8px;
`

export const StyledPanelHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    align-items: center;
    
`

export const StyledLayersSettingsContainer = styled.div`

    padding-bottom: 20px;
    .radiobutton-group{
      width: 100%;
    }
    .radiobutton{
      width: 314px;
      height: 48px;
      background: #1A1B1E;
      box-shadow: 4px 4px 14px #151518, -4px -4px 14px #242529;
      border-radius: 4px;
      font-family: Open Sans;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 22px;
      color: #FFFFFF;
      padding-left: 20px; 
      text-align: initial;
      padding-top: 10px;
    }
`;

export const StyledModal = styled(Modal)`
  width: fit-content !important;
`

export const StyledLegendContainer = styled.div`
   position: absolute;
   width: 340px;
   z-index: 100;
   height: 100vh;
   overflow-y: auto;
   background: rgba(21, 21, 24, 0.85);
   right: 0;
   padding: 20px;
   
   .legend {
    width: 121px;
    height: 22px;
    font-family: Open Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    display: flex;
    align-items: center;
    color: #FFFFFF;
    margin: 0;
   }
   
   .titleContainer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
   }
`

export const StyledLegendElementContainer = styled.div`
    display: flex;
    justify-content: space-between;
    .titleContainer{
      display: flex;
      margin: 0;
      justify-content: center;
    }
    .counter{
      width: 64px;
      height: 32px;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
    }
    .description{
      color: white;
      width: 280px;
      text-align: left;
      padding-left: 20px;
    }
`
