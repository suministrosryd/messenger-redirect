const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN; // Este valor se agregará en Railway

app.use(express.json());

// Ruta para enviar mensajes automáticamente
app.get('/send_message', async (req, res) => {
    let user_psid = req.query.psid;

    if (!user_psid) {
        return res.status(400).send("No se proporcionó el PSID");
    }

    let messageData = {
        recipient: { id: user_psid },
        message: { text: "¡Hola! ¿Sobre qué deseas tu consulta? Amor ❤️, Salud 🏥 o Suerte 🍀" }
    };

    try {
        await axios.post(`https://graph.facebook.com/v13.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`, messageData);
        res.send("Mensaje enviado correctamente");
    } catch (error) {
        console.error(error.response.data);
        res.status(500).send("Error al enviar el mensaje");
    }
});

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));