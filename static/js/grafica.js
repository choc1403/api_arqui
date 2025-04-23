import { urls } from './urls.js'

const ctxSensor = document.getElementById('myChart');


// Función para obtener datos desde la API
async function fetchData(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Error al obtener los datos');

        const apiData = await response.json();
        console.log(apiData)

        const labels = [];
        const data = [];

        apiData.forEach(entry => {
            if (entry.date && entry.value !== undefined) {
                labels.push(entry.date); // Solo usamos la fecha como string (puedes formatear si quieres)
                data.push(parseFloat(entry.value)); // Aseguramos que el valor sea numérico
            }
        });

        return { labels, data };


    } catch (error) {
        console.error('Error al obtener los datos:', error);
        return null;
    }
}


// Función para createChacreategitrt un gráfico
function createChart(ctx, labels, data, title) {
    const chartData = {
        labels: labels,
        datasets: [{
            label: title,
            data: data,
            fill: false,
            borderColor: 'rgb(72, 7, 9)',
            tension: 0.1 // Suaviza la línea del gráfico
        }]
    };

    const config = {
        type: 'line',
        data: chartData,
        options: {
            animations: {
                tension: {
                    duration: 1000,
                    easing: 'linear',
                    from: 1,
                    to: 0,
                    loop: true
                }
            },
            scales: {
                y: {
                    min: 0,
                    ticks: {
                        stepSize: 1 // Incrementos en 1 en el eje Y
                    }
                }
            }
        }
    };

    new Chart(ctx, config);
}





(async function renderCharts() {
    // Obtener y mostrar datos para clientes
    const customerData = await fetchData(urls.api_url_sensor);
    if (customerData) {
        createChart(ctxSensor, customerData.labels, customerData.data, `DATOS DE SENSOR`);
    }

})();