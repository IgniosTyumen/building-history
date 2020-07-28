import React, {useState} from "react";
import {StyledModal} from "../styles/styledComponents";
import {AgGridReact} from "ag-grid-react";
import * as AllModules from "ag-grid-enterprise";
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import 'ag-grid-enterprise'
import {columnDefs} from "./columnDefinitionsForBuildings";

const CallModalSelector = (props) => {

    const {handleSelectCall, handleToggleModal, data, modalVisible} = props;
    const [selected,setSelected] = useState(null);

    const aggSettings =  {
        modules: AllModules,
            defaultColDef: {
            resizable: true,
                enableValue: true,
                enableRowGroup: true,
                enablePivot: true,
                sortable: true,
                filter: true,
        },
        columnDefs: columnDefs,
            pivotRowTotals: 'before',
            rowGroupPanelShow: "always",
            localeText: {
            page: "страница",
                more: "больше",
                to: "к",
                of: "от",
                next: "следующий",
                last: "последний",
                first: "первый",
                previous: "предыдущий",
                loadingOoo: "загружается...",
                selectAll: "выбрать все",
                searchOoo: "поиск ...",
                blanks: "пустой",
                filterOoo: "фильтровать...",
                applyFilter: "применить фильтр...",
                equals: "равно",
                notEqual: "не равно",
                lessThan: "меньше, чем",
                greaterThan: "больше, чем",
                lessThanOrEqual: "меньше, чем",
                greaterThanOrEqual: "больше или равно",
                inRange: "в диапазоне",
                contains: "содержит",
                notContains: "не содержит",
                startsWith: "начинается",
                endsWith: "заканчиватся здесь",
                andCondition: "Логическое И",
                orCondition: "Логическое ИЛИ",
                group: "Группа",
                columns: "Колонки",
                filters: "Фильтры",
                rowGroupColumns: "laPivot Cols",
                rowGroupColumnsEmptyMessage: "Перетащите столбец для группировки",
                valueColumns: "Значение Колонки",
                pivotMode: "Сводные таблицы",
                groups: "Группы",
                values: "Значения",
                pivots: "Углы",
                valueColumnsEmptyMessage: "Перетащите столбец для группировки",
                pivotColumnsEmptyMessage: "Перетащите столбец для группировки",
                toolPanelButton: "Кнопка панели управления",
                noRowsToShow: "Скрытые строки",
                enabled: "Активный",
                pinColumn: "Активная колонка",
                valueAggregation: "Среднее значение",
                autosizeThiscolumn: "Авторазмер этой колонки",
                autosizeAllColumns: "Авторазмер всех колонок",
                groupBy: "Группировать по",
                ungroupBy: "Разгруппировать по",
                resetColumns: "Сбросить колонки",
                expandAll: "Развернуть",
                collapseAll: "Свернуть",
                toolPanel: "Панель инструментов",
        export: "Экспорт",
                csvExport: "Экспорт в CSV",
                excelExport: "Экспорт в Эксель (.xlsx)",
                excelXmlExport: "Экспорт в Эксель (.xml)",
                pivotChartAndPivotMode: "laPivot Chart & Pivot Mode",
                pivotChart: "laPivot Chart",
                chartRange: "Построить диаграмму",
                columnChart: "Столбцовая диаграмма",
                groupedColumn: "Группированные колонки",
                stackedColumn: "Сгруппированные колонки",
                normalizedColumn: "la100% Stacked",
                barChart: "Шкала",
                groupedBar: "Группирования шкала",
                stackedBar: "Свернутая шкала",
                normalizedBar: "la100% Stacked",
                pieChart: "Круговая диаграмма",
                pie: "Круг",
                doughnut: "laDoughnut",
                line: "Линия",
                xyChart: "Диаграмма Х-У",
                scatter: "laScatter",
                bubble: "Пузырь",
                areaChart: "laArea",
                area: "laArea",
                stackedArea: "laStacked",
                normalizedArea: "la100% Stacked",
                pinLeft: "laPin &lt;&lt;",
                pinRight: "laPin &gt;&gt;",
                noPin: "laDontPin &lt;&gt;",
                sum: "Сум",
                min: "Мин",
                max: "Макс",
                none: "None",
                count: "Количество",
                average: "Всего",
                filteredRows: "Фильтрованные строки",
                selectedRows: "Выбранные строки",
                totalRows: "Всего строк",
                totalAndFilteredRows: "Всего фильтрованных строк",
                copy: "Копировать",
                copyWithHeaders: "Копировать с загаловками",
                ctrlC: "ctrl + C",
                paste: "Встваить",
                ctrlV: "ctrl + V",
                pivotChartTitle: "Угол загаловка диаграммы",
                rangeChartTitle: "Название диаграммы",
                settings: "Настройки",
                data: "Данные",
                format: "Формат",
                categories: "Категории",
                series: "Наборы",
                xyValues: "Значения Х У",
                paired: "laPaired Mode",
                axis: "Ось",
                color: "Цвет",
                thickness: "Толщина",
                xRotation: "Наклон по Х",
                yRotation: "Наклон по У",
                ticks: "laTicks",
                width: "Высота",
                length: "Ширина",
                padding: "Отступ",
                chart: "laChart",
                title: "Название",
                background: "Фон",
                font: "Шрифт",
                top: "Верх",
                right: "Справа",
                bottom: "Снизу",
                left: "Слева",
                labels: "Названия",
                size: "Размер",
                minSize: "Минимальный размер",
                maxSize: "Максимальный размер",
                legend: "История",
                position: "Позиция",
                markerSize: "Размер маркера",
                markerStroke: "laMarker Stroke",
                markerPadding: "Отступ маркера",
                itemPaddingX: "laItem Padding X",
                itemPaddingY: "laItem Padding Y",
                strokeWidth: "laStroke Width",
                offset: "Смещение",
                offsets: "Смещения",
                tooltips: "Подсказки?",
                callout: "Отзыв",
                markers: "Маркеры",
                shadow: "Тень",
                blur: "Размытие",
                xOffset: "Смещение по Х",
                yOffset: "Смещение по У",
                lineWidth: "Высота строки",
                normal: "Нормально",
                bold: "Жирный",
                italic: "Наклон",
                boldItalic: "Жирный с наклоном",
                predefined: "Предопределенный",
                fillOpacity: "Прозрачность заливки",
                strokeOpacity: "Прозрачность линии",
                columnGroup: "Колонка",
                barGroup: "laBar",
                pieGroup: "laPie",
                lineGroup: "laLine",
                scatterGroup: "laScatter",
                areaGroup: "laArea",
                groupedColumnTooltip: "laGrouped",
                stackedColumnTooltip: "laStacked",
                normalizedColumnTooltip: "la100% Stacked",
                groupedBarTooltip: "Групповая диаграмма",
                stackedBarTooltip: "Вертикальная диаграмма",
                normalizedBarTooltip: "Нормализованная вертикальная диаграмма",
                pieTooltip: "Пирог",
                doughnutTooltip: "Пончик",
                lineTooltip: "Линейная диаграмма",
                groupedAreaTooltip: "laGrouped",
                stackedAreaTooltip: "laStacked",
                normalizedAreaTooltip: "Нормализованная диаграмма",
                scatterTooltip: "Точечная диаграмма",
                bubbleTooltip: "Пузырьковая диаграмма",
                noDataToChart: "Нет доступных данных для диаграммы.",
                pivotChartRequiresPivotMode: "Сводная диаграмма требует включения сводного режима"
        },
    }

    const handleSelectSingle = ({data}) => {
        setSelected(data)
    }

    const handleProvideData = () => {
        handleSelectCall(selected)
    }

    return (
        <StyledModal
            title="Дома"
            visible={modalVisible}
            onOk={handleProvideData}
            onCancel={handleToggleModal}>
            <div
                className="ag-theme-balham"
                style={{
                    width: '90vw',
                    height: '70vh'
                }}
            >
                <AgGridReact
                    columnDefs={aggSettings.columnDefs}
                    rowData={data}
                    defaultColDef={aggSettings.defaultColDef}
                    rowSelection="single"
                    // onGridReady={this.onGridReady}
                    animateRows={true}
                    sideBar={true}
                    onRowClicked={handleSelectSingle}
                    valueCache={true}
                    checkboxSelection={true}
                    enableCellChangeFlash={true}
                    popupParent={aggSettings.popupParent}
                    enableRangeSelection={true}
                    enableCharts={true}
                    groupSelectsChildren={true}
                    groupMultiAutoColumn={true}
                    localeText={aggSettings.localeText}
                    rowGroupPanelShow={aggSettings.rowGroupPanelShow}
                    suppressDragLeaveHidesColumns={true}
                />
            </div>
        </StyledModal>
    )
}

export default CallModalSelector
