import { urls } from './urls.js';

const temperatureField = document.getElementById('valor_temperatura');
const humidityField = document.getElementById('valor_humedad');
const distanceField = document.getElementById('valor_distancia');
const potentiometerField = document.getElementById('valor_potenciometro');

let alertShown = false;

async function loadSensorData() {
    try {
        const response = await fetch(urls.api_url_sensor);
        if (!response.ok) throw new Error('Error al obtener los datos');

        const data = await response.json();

        if (data && data.length > 0) {
            const { temperatura, humedad, distancia, potenciometro } = data[0];

            temperatureField.value = temperatura;
            humidityField.value = humedad;
            distanceField.value = distancia;
            potentiometerField.value = potenciometro;

            // Mostrar alerta una sola vez si está cerca
            if (distancia <= 5 && !alertShown) {
                alert('¡Objeto muy cerca!');
                alertShown = true;
            } else if (distancia > 5) {
                alertShown = false; // Restablecer si se aleja
            }

        } else {
            showNoData();
        }

    } catch (error) {
        console.error('Error al obtener los datos:', error);
        showNoData();
    }
}

function showNoData() {
    const message = 'Sin datos';
    temperatureField.value = message;
    humidityField.value = message;
    distanceField.value = message;
    potentiometerField.value = message;
}

// Ejecutar al cargar y luego cada 5 segundos
document.addEventListener('DOMContentLoaded', () => {
    loadSensorData();
    setInterval(loadSensorData, 5000); // Actualiza cada 5 segundos
});
