$(function () {

    // Create the chart
    $('#bar').highcharts({
        chart: {
            type: 'column'
        },
        subtitle: {
            text: 'Click the columns to view versions. Source: netmarketshare.com.'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Total percent market share'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}%'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        }, 

        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: brandsData
        }],
        drilldown: {
            series: drilldownSeries
        }
    })

     
});
    