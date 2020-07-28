import * as d3Color from "d3-scale-chromatic";
import * as d3Array from "d3-array";
import _ from 'underscore'
import Color from "color";

export const colorScale = (range, data, isRange = false, reverse = true, field = null) => {
    if (!data) return [255, 255, 255];
    if (!isRange) {
        const position = reverse ? 1 - (range.indexOf(data) / (range.length - 1)) : range.indexOf(data) / (range.length - 1);
        if (field === 'building_year') {
            const color = (d3Color.interpolateTurbo(position)).replace('rgb(', '').replace(')', '').replace(' ', '').replace(' ', '').split(',');
            ;
            return [Number(color[0]), Number(color[1]), Number(color[2])];
        } else {
            const color = (d3Color.interpolateRdYlGn(position)).replace('rgb(', '').replace(')', '').replace(' ', '').replace(' ', '').split(',');
            ;
            return [Number(color[0]), Number(color[1]), Number(color[2])];
        }

    } else {
        const max = range.length;
        const position = range.indexOf(data) / max;
        if (field === 'building_year') {
            const color = (d3Color.interpolateTurbo(position)).replace('rgb(', '').replace(')', '').replace(' ', '').replace(' ', '').split(',');
            ;
            return [Number(color[0]), Number(color[1]), Number(color[2])];
        } else {
            const color = d3Color.interpolateRdYlGn(position).replace('rgb(', '').replace(')', '').replace(' ', '').replace(' ', '').split(',');
            return [Number(color[0]), Number(color[1]), Number(color[2])];
        }

    }
}

export const colorScaleByValue = (range, data, key, toHsl = false) => {
    if (!data) return [255, 255, 255];
    const count = _.countBy(range, (item) => item[key]);
    delete count.NaN
    let min = Number.MAX_VALUE;
    let max = Number.MIN_VALUE;
    for (let it in count) {
        if (count[it] < min) min = count[it];
        if (count[it] > max) max = count[it];
    }
    const position = count[data] / max;
    let color = d3Color.interpolateRdYlGn(position)
    if (toHsl){
        return Color(color).hsl();
    } else {
    color = color.replace('rgb(', '').replace(')', '').replace(' ', '').replace(' ', '').split(',');
        return [Number(color[0]), Number(color[1]), Number(color[2])];
    }



}
