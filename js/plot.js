let chart = null;
let ctx = null;

Chart.defaults.global.defaultFontSize = 16;

function drawPlot(a, b, n, f, plotId) {
    // a < b
    const xpoint = [];
    const ypoint = [];
    const diff = b - a;
    const step = Math.floor((diff / 20) * 1000) / 1000;
    console.log(step);
    for (let x = a; x <= b; x += step) {
        x = +x.toFixed(3);
        xpoint.push(x);
        ypoint.push(f(x));
    }

    if (!ctx) {
        document.getElementById(plotId).height = 400;
    }
    ctx = document.getElementById(plotId).getContext('2d');
    ctx.clearRect(0, 0, 400, 400);

    if (chart instanceof Chart) {
        chart.destroy();
    }
    
    chart = new Chart(ctx, {
        type: 'line',
        
        data: {
            labels: xpoint,
            datasets: [{
                data: ypoint,
                backgroundColor: "rgba(151,187,205,0.3)",
                borderColor: "rgba(160, 220, 180, 0.5)",
                fill: true,
            }]
        },
        options: {
            responsive: false,
            title: {
                display: true,
                text: 'Графік функції',
                fontColor: '#fff',
                // fontSize: '13pt',
            },
            legend: {
                display: false,
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: true,
                    },
                    ticks: {
                        fontColor: "#000", // this here
                    },
                }],
                yAxes: [{
                    display: true,
                    gridLines: {
                        display: true,
                    },
                    ticks: {
                        fontColor: "#000", // this here
                    },
                }],
            }
        }
    });
}
