import React, {Component} from 'react';
import {StaticMap} from 'react-map-gl';
import DeckGL, {GeoJsonLayer, ArcLayer, HeatmapLayer, HexagonLayer, PolygonLayer} from 'deck.gl';
import axios from 'axios';
import * as wkt from "wkt";
import {colorScale, colorScaleByValue} from "./colorScale";
import Color from "color";
import * as d3Color from "d3-scale-chromatic";
import {TYPES} from "./types.vocabulary";
import {Button, message, Radio} from "antd";
import moment from "moment";
import 'antd/dist/antd.css'
import styled from "styled-components";
import {ClosedSelectorPanelIcon} from "./icons/ClosedSelectorPanelIcon";
import {OpenedSelectorPanelIcon} from "./icons/OpenedSelectorPanelIcon";
import IconicTitle from "./components/common/IconicTitle";
import {LayersIcon} from "./icons/LayersIcon";
import MapStylePicker from "./components/MapStylePicker";
import CallModalSelector from "./components/CallModalSelector";
import centerOfMass from "@turf/center-of-mass";
import {FlyToInterpolator} from "react-map-gl";


// Set your mapbox token here
const MAPBOX_TOKEN = 'pk.eyJ1IjoiaWduaW9zdHl1bWVuIiwiYSI6ImNrNXJxYmcxejA1dXQzbXFzZGp6bHU3MXQifQ.4LbAc12EWgTiDXUMZ76sfQ'; // eslint-disable-line


const INITIAL_VIEW_STATE = {
    altitude: 1.5,
    bearing: -1.03125,
    latitude: 57.132838180789534,
    longitude: 65.60480240246815,
    pitch: 48.84816753926702,
    zoom: 11.88010384143794,
};

const checkForPrimitive = (value) => {
    switch (typeof value) {
        case "undefined":
            return 'Не определено'
            break;
        case "function":
            return 'Поле содержит функцию'
            break;
        case 'NaN' :
            return 'Не число'
            break;
        case "boolean":
            if (value)
                return 'Истина'
            else return 'Ложь';
            break
        default:
            return value
    }
}

const prepareDataToChart = (data) => {
    let setOfData = [...new Set(data.map(item => item.properties['date_time']))];
    let result = [];
    setOfData.sort();
    const minDate = moment(setOfData[0]);
    const maxDate = moment(setOfData[setOfData.length - 1])
    let dateIter = minDate;
    while (dateIter.isSameOrBefore(maxDate)) {
        const iterMonth = dateIter.get('month');
        const iterYear = dateIter.get('year');
        const properObjects = data.filter(el => {
            const nowMoment = moment(el.properties['date_time']);
            const month = nowMoment.get('month');
            const year = nowMoment.get('year');
            if (month === iterMonth && year === iterYear) return true
        })
        const types = [...new Set(properObjects.map(item => item.properties['type']))];
        let typesResult = {}
        for (let field of types) {
            typesResult[TYPES[field]] = properObjects.filter(item => item.properties['type'] == field).length
        }
        const x = `${iterMonth + 1 < 10 ? '0' + (iterMonth + 1) : iterMonth + 1}/${iterYear}`;
        const participants = properObjects.reduce(function (acc, element) {
            return acc += element.properties.members_amount
        }, 0)
        const wounded = properObjects.reduce(function (acc, element) {
            return acc += element.properties.wounded_amount
        }, 0)
        const mortal = properObjects.reduce(function (acc, element) {
            return acc += element.properties.lost_amount
        }, 0)
        result.push({
            x, ...typesResult,
            people: {
                participants,
                wounded,
                mortal
            }
        })
        dateIter.add(1, 'months')
    }
    return result
}

const StyledSelectorsPanel = styled.div`
  position: absolute;
  width: 410px;
  height: 100vh;
  left: 0px;
  top: 0px;
  background: rgba(21, 21, 24, 0.9);
  z-index: 1000;
`
const StyledSelectorsOpenPanelButton = styled.div`
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
const StyledLegendOpenPanelButton = styled.div`
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

const StyledButtonPanel = styled(Button)`
    width: 50px;
    height: 50px;
    padding: 0;
    border-radius: 8px;
`

const StyledButtonLegend = styled(Button)`
    width: 50px;
    height: 50px;
    padding: 0;
    border-radius: 8px;
`

const StyledPanelHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    align-items: center;
    
`

const StyledLayersSettingsContainer = styled.div`

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

const StyledLegendContainer = styled.div`
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

const StyledLegendElementContainer = styled.div`
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

class Map extends Component {

    state = {
        data: null,
        filter: null,
        dateRange: null,
        chartsData: null,
        selectorPanelOpened: false,
        legendPanelOpened: false,
        accidentLayer: 'point',
        radiusScale: 10,
        hexagonRadius: 100,
        colorParameter: 'building_year',
        showDataTable: false,
        viewState: INITIAL_VIEW_STATE,
        selected: null,

        style: 'mapbox://styles/mapbox/light-v9',

    }

    colorRange = [0, 1];

    componentDidMount() {
        axios.get('https://av.admtyumen.ru/api/common/house')
            .then(res => {
                this.setState({preloaded: res.data.objects});
                this.setState({renderField: 'area'});
            })
            .catch(
                (err) => console.log(err)
            );
    }

    _onHover({x, y, object}) {
        const properties = object;
        let label = []
        if (properties) {
            label.push(`Адрес : ${properties['address']}`)
            label.push(`Площадь жилых помещений : ${properties['area_of_hatas']}`)
            label.push(`Год постройки : ${properties['building_year']}`)
            label.push(`Материал : ${properties['capital_group']}`)
            label.push(`Код здания : ${properties['code']}`)
            label.push(`Код erc : ${properties['code_erc']}`)
            label.push(`Состояние : ${properties['condition']}`)
            label.push(`Этажность : ${properties['count_of_storeys']}`)
            label.push(`Район : ${properties['district']}`)
            label.push(`Общая площадь : ${properties['full_area']}`)
            label.push(`Муниципалитет : ${properties['municipality']}`)
            label.push(`Обслуживающая организация : ${properties['organization']}`)
            label.push(`Статус : ${properties['status']}`)
            label.push(`Тип дома : ${properties['type']}`)

        }
        this.setState({hover: {x, y, hoveredObject: object, label}});
    }


    legendRendered = () => {
        if (!this.state.preloaded) return null;
        let filteredData = this.state.preloaded;
        const Elements = [];
        for (let unique of this.colorRange) {
            if (typeof unique === 'object') continue;
            let flag = false;

            const position = this.colorRange.indexOf(unique) / (this.colorRange.length);
            if (this.state.colorParameter === 'organization') {
                const color = colorScaleByValue(this.state.preloaded, unique, 'organization', true)
                if (color.color[2] <= 50) flag = true;
                const numberOfUnique = filteredData.filter(el => el[this.state.colorParameter] == unique).length
                if (numberOfUnique) {
                    Elements.push(
                        <StyledLegendElementContainer>
                            <p className={'counter'} style={{
                                backgroundColor: color,
                                color: flag ? 'white' : 'black',
                            }}>{numberOfUnique}</p>
                            <p className={'description'}
                               style={{}}>{unique}</p>

                        </StyledLegendElementContainer>)
                }
            } else if (this.state.colorParameter === 'building_year') {
                const color = Color(d3Color.interpolateTurbo(position)).hsl();
                if (color.color[2] <= 50) flag = true;
                const numberOfUnique = filteredData.filter(el => el[this.state.colorParameter] == unique).length
                if (numberOfUnique) {
                    Elements.push(
                        <StyledLegendElementContainer>
                            <p className={'counter'} style={{
                                backgroundColor: color,
                                color: flag ? 'white' : 'black',
                            }}>{numberOfUnique}</p>
                            <p className={'description'}
                               style={{}}>{unique}</p>

                        </StyledLegendElementContainer>)
                }
            } else {
                const color = Color(d3Color.interpolateRdYlGn(position)).hsl();
                if (color.color[2] <= 50) flag = true;
                const numberOfUnique = filteredData.filter(el => el[this.state.colorParameter] == unique).length
                if (numberOfUnique) {
                    Elements.push(
                        <StyledLegendElementContainer>
                            <p className={'counter'} style={{
                                backgroundColor: color,
                                color: flag ? 'white' : 'black',
                            }}>{numberOfUnique}</p>
                            <p className={'description'}
                               style={{}}>{unique}</p>

                        </StyledLegendElementContainer>)
                }
            }

        }
        return Elements
    }

    onStyleChange = (style) => {
        this.setState({style});
    }

    onChangeColorRendererParameter = (event) => {
        this.setState({colorParameter: event.target.value})
    }

    handleViewStateChange = ({viewState}) => {
        this.setState({viewState})
    }

    render() {
        this.colorRange = [0, 1]
        if (this.state.preloaded && this.state.preloaded.length) {
            if (this.state.colorParameter === 'condition') {
                this.colorRange = [...new Set(this.state.preloaded.map(item => item[this.state.colorParameter]))].reverse()
                const swap = this.colorRange[0];
                this.colorRange[0] = this.colorRange[1];
                this.colorRange[1] = swap;
            } else if (this.state.colorParameter === 'status') {
                this.colorRange = [...new Set(this.state.preloaded.map(item => item[this.state.colorParameter]))].reverse()
            } else if (this.state.colorParameter === 'type') {
                this.colorRange = [...new Set(this.state.preloaded.map(item => item[this.state.colorParameter]))].reverse()
            } else if (this.state.colorParameter === 'capital_group') {
                this.colorRange = [...new Set(this.state.preloaded.map(item => item[this.state.colorParameter]))].reverse()
            } else if (this.state.colorParameter === 'building_year') {
                this.colorRange = [...new Set(this.state.preloaded.map(item => item[this.state.colorParameter]))].sort((a, b) => a - b).reverse()
            } else {
                this.colorRange = [...new Set(this.state.preloaded.map(item => item[this.state.colorParameter]))].sort((a, b) => a - b)
            }

        }


        const layers = [new PolygonLayer({
            id: 'polygon-layer',
            data: this.state.preloaded,
            pickable: true,
            extruded: true,
            stroked: true,
            filled: true,
            wireframe: true,
            lineWidthMinPixels: 1,
            getPolygon: d => {
                if (d.area) {
                    try {
                        const parsed = wkt.parse(d.area)
                        return parsed.coordinates
                    } catch (e) {
                        console.log(d)
                    }

                } else {
                    return [[0, 0], [0, 0], [0, 0]]
                }

            },
            getElevation: d => {
                return (d.count_of_storeys * 3)
            },
            getFillColor: d => {
                if (this.state.colorParameter === 'organization') {
                    let color = colorScaleByValue(this.state.preloaded, d[this.state.colorParameter], this.state.colorParameter)
                    if (d.id===this.state.selected) {
                        color = [0,0,0]
                    }
                    return color
                } else {
                    let color = colorScale(this.colorRange, d[this.state.colorParameter], true, false, this.state.colorParameter)
                    if (d.id===this.state.selected) {
                        color = [0,0,0]
                    }
                    return color
                }


            },
            updateTriggers: {
                getFillColor: [this.state.colorParameter,this.state.selected]
            },
            getLineColor: [80, 80, 80],
            getLineWidth: 0.5,
            onHover: (hover) => this._onHover(hover)
        })]

        const {hover} = this.state;

        const maxHeight = window.innerHeight;
        const maxWidth = window.innerWidth;

        const zoomToHouseHandler = (element) => {
            if (element.area){
                const parsed = wkt.parse(element.area);
                const center = centerOfMass(parsed)

                this.setState({
                    showDataTable:false,
                    selected: element.id,
                    viewState: {
                        ...this.state.viewState,
                        latitude:center.geometry.coordinates[1],
                        longitude:center.geometry.coordinates[0],
                        zoom:16,
                        transitionDuration: 2000,
                        transitionInterpolator: new FlyToInterpolator()
                    }
                })
            } else {
                alert('Отсутствует информация о положении дома на карте')
            }

        }

        return (
            <div>
                {!this.state.selectorPanelOpened &&
                <StyledSelectorsOpenPanelButton onClick={() => this.setState({selectorPanelOpened: true})}>
                    <ClosedSelectorPanelIcon/>
                </StyledSelectorsOpenPanelButton>
                }

                {!this.state.legendPanelOpened &&
                <StyledLegendOpenPanelButton onClick={() => this.setState({legendPanelOpened: true})}>
                    <ClosedSelectorPanelIcon/>
                </StyledLegendOpenPanelButton>
                }

                {this.state.selectorPanelOpened &&
                <StyledSelectorsPanel>
                    <StyledPanelHeader>
                        <StyledButtonPanel icon={<OpenedSelectorPanelIcon/>}
                                           onClick={() => this.setState({selectorPanelOpened: false})}/>
                        <MapStylePicker onStyleChange={this.onStyleChange} currentStyle={this.state.style}/>
                    </StyledPanelHeader>
                    <StyledLayersSettingsContainer>
                        <IconicTitle icon={<LayersIcon/>} text={'Выбор параметра цвета'}/>
                        <Radio.Group className={'radiobutton-group'}
                                     onChange={this.onChangeColorRendererParameter.bind(this)}>
                            <Radio className={'radiobutton'} value={'building_year'} defaultChecked={true}>Год
                                постройки</Radio>
                            <Radio className={'radiobutton'} value={'area_of_hatas'}>Площадь жилых помещений</Radio>
                            <Radio className={'radiobutton'} value={'capital_group'}>Тип материала</Radio>
                            <Radio className={'radiobutton'} value={'condition'}>Состояние здания</Radio>
                            <Radio className={'radiobutton'} value={'count_of_storeys'}>Число этажей</Radio>
                            <Radio className={'radiobutton'} value={'full_area'}>Общая площадь</Radio>
                            <Radio className={'radiobutton'} value={'organization'}>Обслуживающая организация</Radio>
                            <Radio className={'radiobutton'} value={'type'}>Тип здания</Radio>
                            <Radio className={'radiobutton'} value={'status'}>Статус здания</Radio>
                        </Radio.Group>
                    </StyledLayersSettingsContainer>
                    <Button onClick={() => {
                        this.setState({showDataTable: !this.state.showDataTable})
                    }}>Показать данные</Button>
                </StyledSelectorsPanel>
                }
                <CallModalSelector
                    handleSelectCall={zoomToHouseHandler}
                    handleToggleModal={() => {
                        this.setState({showDataTable: !this.state.showDataTable})
                    }}
                    data={this.state.preloaded}
                    modalVisible={this.state.showDataTable}
                />

                {this.state.legendPanelOpened && <StyledLegendContainer>
                    <div className={'titleContainer'}>
                        <p className={'legend'}>Легенда карты</p>
                        <StyledButtonLegend icon={<ClosedSelectorPanelIcon/>}
                                            onClick={() => this.setState({legendPanelOpened: false})}/>
                    </div>
                    <div>
                        {this.legendRendered()}
                    </div>
                </StyledLegendContainer>
                }

                {hover && hover.hoveredObject && (
                    <div
                        style={{
                            position: 'absolute',
                            padding: '4px',
                            background: 'rgba(0, 0, 0, 0.8)',
                            color: '#fff',
                            maxWidth: '300px',
                            fontSize: '10px',
                            zIndex: 9,
                            maxHeight: `${maxHeight - hover.y}px`,
                            overflowY: "hidden",
                            pointerEvents: 'none',
                            transform: `translate(${hover.x}px, ${hover.y}px)`
                        }}
                    >
                        {hover.label.map(el => <p>{el}</p>)}
                    </div>
                )}


                <DeckGL initialViewState={INITIAL_VIEW_STATE} controller={true} layers={layers}
                        onViewStateChange={this.handleViewStateChange} viewState={this.state.viewState}>
                    <StaticMap mapboxApiAccessToken={MAPBOX_TOKEN} mapStyle={this.state.style}/>
                </DeckGL>
            </div>
        );
    }
}

export default Map
