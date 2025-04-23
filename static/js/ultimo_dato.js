import { urls } from './urls.js';

const list = document.getElementById('sensor-list');

async function fetchData() {
    try {
        const response = await fetch(urls.api_url_sensor);
        if (!response.ok) throw new Error('Error al obtener los datos');

        const data = await response.json();
        console.log('Datos recibidos:', data);

        // Ordenar por fecha descendente y tomar los últimos 5 valores
        const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        const latest = sorted.slice(0, 5);

        list.innerHTML = ''; // Limpiar contenido anterior

        latest.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `📅 ${item.date} | Sensor: ${item.name} | Valor: ${item.value}`;
            list.appendChild(li);
        });

    } catch (error) {
        console.error('Error al obtener los datos:', error);
        list.innerHTML = '<li>Error al cargar los datos.</li>'; 
    }
}

// Ejecutar solo si el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});