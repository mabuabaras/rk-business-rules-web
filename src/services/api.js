// Import axios
import axios from "axios";

// Define la función para obtener el token
async function getToken() {
    const API_BASE_URL = "https://rk-business-rules.azurewebsites.net";
    // const API_BASE_URL = "http://localhost";
    const url = `${API_BASE_URL}/token`;
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Credentials': 'true',
    };
    const body = new URLSearchParams({
        username: 'valen10clavijo',
        password: 'VC.bsr'
    });

    const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: body,
    });
    const data = await response.json();
    return data.access_token;
}

// Crea la instancia de axios
const api = axios.create({
    baseURL: "https://rk-business-rules.azurewebsites.net",
    // baseURL: "http://localhost",
});

// Añade un interceptor de solicitud para incluir el token en cada petición
api.interceptors.request.use(async (config) => {
    const token = await getToken();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Exportar api para usar en otras partes de tu aplicación
export default api;
