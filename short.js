(function () {
    document.addEventListener('DOMContentLoaded', function () {

        'use strict';

        Ping.init();
        conf.InfoBox();

    });
}());

const Ping = {

    init: () => {
        Ping.showBottomDetailContainer();
        Ping.showChart();
    },

    showChart: () => {
        let ctx = document.getElementById('pingChart').getContext('2d');

        const pingChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Online'],
                datasets: [{
                    label: 'Ping Numbers',
                    data: [Math.round(Math.random() * (1650 - 1600 + 5)) + 1550 + 2],
                    borderColor: '#FFF',
                    backgroundColor: 'transparent',
                    borderWidth: 2
                }]
            },
            options: {
                elements: {
                    point:{
                        radius: 0
                    }
                },
                legend: {
                    display: false
                },
                tooltips: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.yLabel;
                        }
                    }
                },
                scales: {
                    xAxes: [{
                        display: false
                    }],
                    yAxes: [{
                        display: false,
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

        Ping.chartUpdate(pingChart);
    },

    chartUpdate: (chart) => {
        let num = conf.qS('[data-num]');
        setInterval(() => {
            let rNum = Math.round(Math.random() * (1650 - 1600 + 5) + 1550 + 2),
                label = 'Ping';

            num.innerText = rNum;
            num.classList.add('set');
            setTimeout(() => {
                num.classList.remove('set');
            }, 0);

            chart.data.labels.push(label);
            chart.data.datasets.forEach((dataset) => {
                dataset.data.push(rNum);
            });

            chart.update();
        },8000);
    },

    showBottomDetailContainer: () => {
        let toggle = conf.qS('.ping-container .bottom-row .toggle');

        toggle.onclick = () => {
            toggle.nextElementSibling.classList.toggle('active');
        }
    },
};

//  Config Functions
// - - - - - - - - - - - - - - - - - - - - - - - - - -

const conf = {
    qS: (selector) => {
        return document.querySelector(selector);
    },
    qSA: (selector) => {
        return document.querySelectorAll(selector);
    },
    CqS: (container, selector) => {
        return container.querySelector(selector);
    },
    InfoBox: () => {
        let toggle = conf.qS('.infobox-container .infobox-toggle'),
            detail = conf.qS('.infobox-container .infobox-detail-container');

        if(toggle){
            toggle.onclick = (e) => {
                e.preventDefault();
                detail.classList.toggle('active');
            }
        }
    }
};