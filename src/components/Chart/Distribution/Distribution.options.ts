const options = {
    tooltip: {},
    title: {
        left: 'center',
        textStyle: {
            color: '#ecf0f1',

        }
    },
    xAxis: {
        type: 'value',
        splitLine: {
            show: false
        },
    },
    visualMap: {
        show: false,
        type: 'continuous',
        seriesIndex: 0,
        min: 0,
    },

    yAxis: {
        type: 'value',
        splitLine: {
            show: false
        },
        show: false
    },
    series: {
        type: 'line',
        smooth: true,

        markLine: {
            symbol: 'none',
            data: [{
                name: 'mean',
                xAxis: 50,
                label: {
                    show: false,
                },
                tooltip: {
                    formatter: 'mean of range',
                },
                lineStyle: {
                    color: '#e74c3c',
                },
            }]
        }

    },
    grid: {
        bottom: 0,
        containLabel: true

    },
};


export default options;