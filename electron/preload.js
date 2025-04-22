const { contextBridge, ipcRenderer } = require("electron");
const dotenv = require("dotenv");
const path = require("path");

// Asegurar la ruta correcta de `.env`
const envPath = path.resolve(__dirname, "../.env");
dotenv.config({ path: envPath });

contextBridge.exposeInMainWorld("electronAPI", {
  // Ejemplo de envío de datos al proceso principal
  sendToMain: (channel, data) => {
    const validChannels = ["toMain"]; // Lista de canales permitidos
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  // Ejemplo de escucha de mensajes desde el proceso principal
  onFromMain: (channel, callback) => {
    const validChannels = ["fromMain"]; // Lista de canales permitidos
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => callback(...args));
    }
  },
  // Ejemplo de invocación (solicitud y respuesta)
  invoke: async (channel, data) => {
    const validChannels = ["invokeMain"]; // Lista de canales permitidos
    if (validChannels.includes(channel)) {
      return await ipcRenderer.invoke(channel, data);
    }
  },
});

// Exponer la API Key de Google Maps
contextBridge.exposeInMainWorld("googleMapsConfig", {
  apiKey: process.env.GOOGLE_MAPS_API_KEY || "Clave no encontrada", // Obtiene la clave desde las variables de entorno
});
