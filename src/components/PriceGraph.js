import React from 'react';
import Chart from 'chart.js';
import { graphContainer } from './PriceGraph.module.css';
import moment from 'moment';

class PriceGraph extends React.Component {
    state = {};
    chartRef = React.createRef();

    componentDidMount() {
        // Maps priceHistory to a ChartJS-usable array
        const price1Data = this.props.priceHistory.map(card => {
            return {
                x: new moment(new Date(card.date)),
                y: card.price1
            };
        });

        const price2Data = this.props.priceHistory.map(card => {
            return {
                x: new moment(new Date(card.date)),
                y: card.price2
            };
        });

        const myChartRef = this.chartRef.current.getContext('2d');

        const width = window.innerWidth || document.body.clientWidth;
        let gradientStroke1 = myChartRef.createLinearGradient(0, 0, width, 0);
        let gradientStroke2 = myChartRef.createLinearGradient(0, 0, width, 0);

        const firstColor1 = '#7C4DFF';
        const secondColor1 = '#448AFF';
        const thirdColor1 = '#00BCD4';
        const fourthColor1 = '#1DE9B6';

        const firstColor2 = '#F44336';
        const secondColor2 = '#F50057';
        const thirdColor2 = '#FF4081';
        const fourthColor2 = '#FF9100';

        gradientStroke1.addColorStop(0, firstColor1);
        gradientStroke1.addColorStop(0.3, secondColor1);
        gradientStroke1.addColorStop(0.6, thirdColor1);
        gradientStroke1.addColorStop(1, fourthColor1);

        gradientStroke2.addColorStop(0, firstColor2);
        gradientStroke2.addColorStop(0.3, secondColor2);
        gradientStroke2.addColorStop(0.6, thirdColor2);
        gradientStroke2.addColorStop(1, fourthColor2);

        new Chart(myChartRef, {
            type: 'line',
            data: {
                datasets: [
                    {
                        label: this.props.isOnlyFoil ? 'Foil' : 'Nonfoil',
                        data: price1Data,
                        borderColor: this.props.isOnlyFoil ? gradientStroke2 : gradientStroke1,
                        fill: false,
                        pointRadius: 0
                    },
                    {
                        label: 'Foil',
                        data: price2Data,
                        borderColor: gradientStroke2,
                        fill: false,
                        pointRadius: 0
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true
                            },
                            gridLines: {
                                color: 'rgba(0, 0, 0, 0)'
                            }
                        }
                    ],
                    xAxes: [
                        {
                            type: 'time',
                            gridLines: {
                                color: 'rgba(0, 0, 0, 0)'
                            },
                            time: {
                                unit: 'day',
                                unitStepSize: 3,
                                displayFormats: {
                                    day: 'MMM DD'
                                }
                            }
                        }
                    ]
                },
                legend: {
                    display: false
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                    position: 'nearest',
                    callbacks: {
                        title: (tooltipItem, data) => {
                            return moment(tooltipItem[0].xLabel).format('MMM Do, YYYY h:mm A');
                        },
                        label: (tooltipItem, data) => {
                            return `${
                                data.datasets[tooltipItem.datasetIndex].label
                            }: $${tooltipItem.yLabel.toFixed(2)}`;
                        }
                    }
                }
            }
        });
    }

    render() {
        return (
            <div className={graphContainer}>
                <canvas id="myChart" ref={this.chartRef} />
            </div>
        );
    }
}

export default PriceGraph;
