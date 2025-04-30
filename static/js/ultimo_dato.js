import { urls } from './urls.js';

const list = document.getElementById('sensor-list');
const valor_temperatura = document.getElementById('valor_temperatura');
const valor_humedad = document.getElementById('valor_humedad');
const valor_distancia = document.getElementById('valor_distancia');
const valor_potenciometro= document.getElementById('valor_potenciometro');

async function fetchData() {
    try {
        const response = await fetch(urls.api_url_sensor);
        if (!response.ok) throw new Error('Error al obtener los datos');

        const data = await response.json();
        console.log('Datos recibidos:', data[0]);

        
        // Obtener solo el primer dato
        if (data ) {
            valor_temperatura.value = data[0].temperatura;
            valor_humedad.value = data[0].humedad;
            valor_distancia.value = data[0].distancia;
            valor_potenciometro.value = data[0].potenciometro;

            if(data[0].distancia <= 5){
                alert('MUY CERCA');
            }

        } else {
            valor_temperatura.value = 'No hay datos';
            valor_humedad.value = 'No hay datos';
            valor_distancia.value = 'No hay datos';
            valor_potenciometro.value = 'No hay datos';
        }

        

    } catch (error) {
        console.error('Error al obtener los datos:', error);
        list.innerHTML = '<li>Error al cargar los datos.</li>'; 
    }
}


document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});