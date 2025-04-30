// Obtener el protocolo (HTTP/HTTPS)
const protocolo = window.location.protocol; 

// Obtener el dominio (hostname)
const dominio = window.location.hostname; 

// Obtener el puerto
const puerto = window.location.port; 
const baseUrl = `${protocolo}//${dominio}${puerto ? `:${puerto}` : ''}`;

export const urls = {
    api_url_sensor: `${baseUrl}/sensor/`
}