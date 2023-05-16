import React from 'react';
import ReactApexChart from 'react-apexcharts'

function ChartToday() {

    const chart = {
      series: [{
        name: "Заселения",
        data:  [
          {
              "name": "Время",
              "data": [
                  {
                      "x": "01/06",
                      "y": "9:00"
                  }
              ]
          },
          {
              "name": "Время",
              "data": [
                  {
                      "x": "01/06",
                      "y": "2"
                  }
              ]
          },
          {
              "name": "Время",
              "data": [
                  {
                      "x": "01/06",
                      "y": "3"
                  }
              ]
          },
          {
              "name": "Время",
              "data": [
                  {
                      "x": "01/06",
                      "y": "4"
                  }
              ]
          },
          {
              "name": "Время",
              "data": [
                  {
                      "x": "01/06",
                      "y": "5"
                  }
              ]
          }
      ],
    }],
    options: {
      chart: {
        height: 350,
        type: "scatter",
        width: 480,
        fontUrl: null,
        zoom: {
          enabled: false
        }
      },
      legend: {
        show: false,
        fontSize: 2,
        fontWeight: 100,
        offsetX: -100,
        offsetY: -100,
        itemMargin: {
            horizontal: 0,
            vertical: 0
        }
      },
      stroke: {
        curve: 'smooth',
        // colors: ['#66CDAA']
      },
      grid: {
        row: {
          colors: ['#ffffff'], // takes an array which will be repeated on columns
          opacity: 0.5
        }, 
        column: {
          colors: ['#ffffff'],
          opacity: 0.5
        }, 
        yaxis: {
          lines: {
              show: true
          }
        },
        xaxis: {
          lines: {
              show: true
          }
        },  
      },
      xaxis: {
        labels: {
            format: 'dd/MM',
            style: {
                colors: "#4882FF",
                fontSize: 20
            },
            offsetX: 5,
            offsetY: 5
        },
        axisBorder: {
            show: false
        },
        tickAmount: 12,
        position: "top",
    },
      yaxis: {
        reversed: true,
        tickAmount: 5,
        max: "23:00",
        min: '9:00',
        labels: {
            style: {
                colors: [
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null
                ]
            }
        },
    },
    theme: {
        palette: "palette4"
    },
    },    
    }

    return (
        <ReactApexChart 
        options={chart.options} 
        series={chart.series} 
        type="scatter" 
        height={475} />
    )
};


export default ChartToday;