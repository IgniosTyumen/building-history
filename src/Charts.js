import React, {useState} from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import {TYPES} from "./types.vocabulary";
import {colorScale} from "./colorScale";
import Color from "color";
import * as d3Color from "d3-scale-chromatic";
import {Button, Slider, Tooltip as AntTooltip} from "antd";
import moment from "moment";
import {
    CaretRightOutlined,
    PauseOutlined,
} from '@ant-design/icons';
import styled from "styled-components";

const StyledSlider = styled(Slider)`
    margin-left: 82px;
    margin-right: 53px;
    .ant-slider-track{
       height: 119px ;
       opacity: 0.5;
    }
`

const barProvider = (range) => {
    let result = []
    for (let field in TYPES) {
        const color = selectColor(range, field)
        result.push(
            <Bar dataKey={TYPES[field]} stackId="a" fill={color}/>
        )
    }
    return result
}

const selectColor = (range, field) => {
    const position = range.indexOf(field) / (range.length - 1);
    const color = Color(d3Color.interpolateTurbo(position)).hsl();
    return color
}

const CustomTooltip = ({active, payload, label}) => {
    if (active) {
        let sum = 0;
        if (payload.length) {
            sum = payload.reduce(function (accumulator, currentValue) {
                return accumulator + currentValue.value;
            }, 0)
        }

        return (
            <div style={{backgroundColor: "whitesmoke"}}>
                <p className="intro">{label}</p>
                <p className="intro">Случаев ДТП: {sum}</p>
            </div>
        );
    }

    return null;
};

function formatterSliderTooltip(value, data) {
    return `${data[value].x}`;
}

const Charts = ({data, range, onDateRangeChange}) => {
    const [playing, setPlaying] = useState(false);
    const [sliderValues, setSliderValues] = useState([0,data.length - 1])

    const togglePlaying = () => {
            setPlaying(!playing)
    }

    if (!data) return null;
    const Bars = barProvider(range);

    if (playing){
        setTimeout( ()=> {
            let delta = sliderValues[1]-sliderValues[0];
            if (delta===0) delta=1;
            if (sliderValues[1]+delta<=data.length-1){
                setSliderValues([sliderValues[0]+delta,sliderValues[1]+delta])
                const startDateStr = data[sliderValues[0]].x.split('/');
                const startDateMoment = moment().set('date', 1).set('month', startDateStr[0]-1).set('year', startDateStr[1])
                const endDateStr = data[sliderValues[1]].x.split('/');
                const endDateMoment = moment().set('month', endDateStr[0]-1).set('year', endDateStr[1]).endOf('month');
                onDateRangeChange([startDateMoment, endDateMoment])
            } else togglePlaying()
        }, 2500)
    }

    return (
        <div
            style={{
                position: "relative"
            }}>
            <StyledSlider
                max={data.length - 1}
                value={sliderValues}
                onChange={setSliderValues}
                tipFormatter={(event) => formatterSliderTooltip(event, data)}
                range defaultValue={[0, data.length - 1]}
                onAfterChange={(values) => {
                    const startDateStr = data[values[0]].x.split('/');
                    const startDateMoment = moment().set('date', 1).set('month', startDateStr[0]-1).set('year', startDateStr[1])
                    const endDateStr = data[values[1]].x.split('/');
                    const endDateMoment = moment().set('month', endDateStr[0]-1).set('year', endDateStr[1]).endOf('month');
                    onDateRangeChange([startDateMoment, endDateMoment])
                }}/>
            <BarChart
                width={380}
                height={135}
                data={data}
                onClick={(event) => {
                    if (event && event.activeLabel) {
                        const date = event.activeLabel.split('/');
                        const month = date[0];
                        const year = date[1];
                        const startMoment = moment().set('date', 1).set('month', month - 1).set('year', year);
                        const endMoment = moment().set('month', month - 1).set('year', year).endOf('month');
                        onDateRangeChange([startMoment, endMoment])
                    }
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="x"/>
                <YAxis/>
                <Tooltip content={CustomTooltip}/>
                {/*<Legend />*/}
                {Bars}

            </BarChart>
            <div style={{
                position: "absolute",
                top: -15,
                left: 21,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: 80,
            }}>
                {!playing &&
                <AntTooltip title="Запустить">
                    <Button type="primary" shape="circle" icon={<CaretRightOutlined/>} onClick={togglePlaying}/>
                </AntTooltip>
                }
                {playing &&
                <AntTooltip title="Остановить">
                    <Button type="primary" shape="circle" icon={<PauseOutlined/>} onClick={togglePlaying}/>
                </AntTooltip>
                }
            </div>
        </div>
    )
}

export default Charts;
