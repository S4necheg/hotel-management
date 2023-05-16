import React from 'react';
import ReactApexChart from 'react-apexcharts'

function ChartHeaderD() {
    const chartD = {
        series: [{
            name: "Заселения",
            data: [
                {
                    "x": "9:00",
                    "y": "2"
                },
                {
                    "x": "10:00",
                    "y": "1"
                },
                {
                    "x": "11:00",
                    "y": "0"
                },
                {
                    "x": "12:00",
                    "y": "0"
                },
                {
                    "x": "13:00",
                    "y": "0"
                },
                {
                    "x": "14:00",
                    "y": "1"
                },
                {
                    "x": "15:00",
                    "y": "0"
                },
                {
                    "x": "16:00",
                    "y": "1"
                },
                {
                    "x": "17:00",
                    "y": "0"
                },
                {
                    "x": "18:00",
                    "y": "0"
                },
                {
                    "x": "19:00",
                    "y": "1"
                },
                {
                    "x": "20:00",
                    "y": "0"
                },
                {
                    "x": "21:00",
                    "y": "0"
                },
                {
                    "x": "22:00",
                    "y": "0"
                },
                {
                    "x": "23:00",
                    "y": "0"
                },
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
            //categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            //datetime: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00']
          
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
        options={chartD.options} 
        series={chartD.series} 
        type="line" 
        height={130} 
        width={800}/>
    )
}

export default ChartHeaderD;