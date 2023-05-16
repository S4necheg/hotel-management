import React from 'react';
import ReactApexChart from 'react-apexcharts'

function ChartHeaderM() {
    const chartM = {
        series: [{
            name: "Заселения",
            data: [
                {
                    "x": "1.06",
                    "y": "4"
                },
                {
                    "x": "2.06",
                    "y": "3"
                },
                {
                    "x": "3.06",
                    "y": "10"
                },
                {
                    "x": "4.06",
                    "y": "9"
                },
                {
                    "x": "5.06",
                    "y": "10"
                },
                {
                    "x": "6.06",
                    "y": "7"
                },
                {
                    "x": "7.06",
                    "y": "5"
                },
                {
                    "x": "8.06",
                    "y": "6"
                },
                {
                    "x": "9.06",
                    "y": "3"
                },
                {
                    "x": "10.06",
                    "y": "7"
                },
                {
                    "x": "11.06",
                    "y": "4"
                },
                {
                    "x": "12.06",
                    "y": "5"
                },
                {
                    "x": "13.06",
                    "y": "5"
                },
                {
                    "x": "14.06",
                    "y": "7"
                },
                {
                    "x": "15.06",
                    "y": "8"
                },
                {
                    "x": "16.06",
                    "y": "0"
                },
                {
                    "x": "17.06",
                    "y": "0"
                },
                {
                    "x": "18.06",
                    "y": "0"
                },
                {
                    "x": "19.06",
                    "y": "0"
                },
                {
                    "x": "20.06",
                    "y": "0"
                },
                {
                    "x": "21.06",
                    "y": "0"
                },
                {
                    "x": "22.06",
                    "y": "0"
                },
                {
                    "x": "23.06",
                    "y": "0"
                },
                {
                    "x": "24.06",
                    "y": "0"
                },
                {
                    "x": "25.06",
                    "y": "0"
                },
                {
                    "x": "26.06",
                    "y": "0"
                },
                {
                    "x": "27.06",
                    "y": "0"
                },
                {
                    "x": "28.06",
                    "y": "0"
                },
                {
                    "x": "29.06",
                    "y": "0"
                },
                {
                    "x": "30.06",
                    "y": "0"
                }
            ]
        }],
        tooltip: {
            style: {
                fontSize: '14px',
                fontFamily: 'Inter'
              },
              x: {
                show: true,
                format: 'dd MMM',
                formatter: undefined,
            },
        },
        options: {
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            }
          },
          stroke: {
            curve: 'smooth',
            lineCap: 'round',
            colors: ['#ffffff']
          },
          grid: {
            show: false,
            row: {
              colors: ['none'], // takes an array which will be repeated on columns
              opacity: 0.5
            }, 
            column: {
              colors: ['none'],
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
                show: false,
                trim: true,
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
        },
        yaxis: {
            show: false,
        }
        },    
    }
    return (
        <ReactApexChart 
        options={chartM.options} 
        series={chartM.series} 
        type="line" 
        height={165} 
        width={800}/>
    )
}

export default ChartHeaderM;