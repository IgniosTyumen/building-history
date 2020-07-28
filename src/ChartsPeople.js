import React, {useState} from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line,
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

    return (
        <div
            style={{
                position: "relative"
            }}>
            <LineChart
                width={380}
                height={135}
                data={data}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="x"/>
                <YAxis/>
                <Tooltip/>
                <Legend  />
                <Line type="monotone" name={'Участников ДТП'} dataKey="people.participants" stroke="#8884d8" />
                <Line type="monotone" name={'Ранено'} dataKey="people.wounded" stroke="#2ebf57" />
                <Line type="monotone" name={'Погибло'} dataKey="people.mortal" stroke="#ff512a" />
            </LineChart>
        </div>
    )
}

export default Charts;
