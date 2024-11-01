const animals = require('random-animals-api');

async function getProfileImage() {
    const opcionesAnimales = ["dog", "fox"]; 
    const animalAleatorio = opcionesAnimales[Math.floor(Math.random() * opcionesAnimales.length)];

    try {
        const url = await animals[animalAleatorio]();
        return { success: true, url, error : null }; 
    } catch (error) {
        console.error("Error al obtener la imagen de perfil:", error);
        return { success: false,url:null, error: "Error al obtener la imagen de perfil" }; // Devuelve un JSON en caso de error
    }
}

module.exports = getProfileImage;
