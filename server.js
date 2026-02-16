const express = require('express');
const app = express();

app.use(express.json());

const VERIFY_TOKEN = "iplan123"; // coloque o mesmo token usado na Meta

// 🔹 Rota principal só para teste
app.get('/', (req, res) => {
  res.send('Webhook WhatsApp está online 🚀');
});

// 🔹 Verificação do webhook (Meta chama isso uma vez)
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log("Webhook verificado!");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// 🔹 Receber mensagens do WhatsApp
app.post('/webhook', (req, res) => {
  console.log("📩 Evento recebido:");
  console.log(JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
