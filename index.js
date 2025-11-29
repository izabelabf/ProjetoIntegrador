const chatMessages = document.getElementById("chatMessages");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");


window.addEventListener("load", () => {
  addBotMessage(
    "Olá! 👋 Eu sou a assistente de integração da empresa. " +
    "Posso te ajudar com horários, regras, restaurante, mapa da empresa, guia dos primeiros dias e muito mais. " +
    "O que você gostaria de saber?"
  );
});

document.querySelectorAll(".hint-tag").forEach(tag => {
  tag.addEventListener("click", () => {
    const question = tag.getAttribute("data-question");
    userInput.value = question;
    handleSendMessage();
  });
});

sendBtn.addEventListener("click", handleSendMessage);

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    handleSendMessage();
  }
});

function handleSendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  addUserMessage(text);
  userInput.value = "";

  setTimeout(() => {
    const response = getBotResponse(text);
    addBotMessage(response);
  }, 300);
}

function addUserMessage(text) {
  const row = document.createElement("div");
  row.className = "message-row user";

  const msg = document.createElement("div");
  msg.className = "message user";
  msg.textContent = text;

  const meta = document.createElement("div");
  meta.className = "timestamp";
  meta.textContent = getTimeLabel();

  const container = document.createElement("div");
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.alignItems = "flex-end";

  container.appendChild(msg);
  container.appendChild(meta);
  row.appendChild(container);

  chatMessages.appendChild(row);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addBotMessage(text) {
  const row = document.createElement("div");
  row.className = "message-row bot";

  const msg = document.createElement("div");
  msg.className = "message bot";
  msg.innerHTML = text;

  const meta = document.createElement("div");
  meta.className = "timestamp";
  meta.textContent = "Assistente • " + getTimeLabel();

  const container = document.createElement("div");
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.alignItems = "flex-start";

  container.appendChild(msg);
  container.appendChild(meta);
  row.appendChild(container);

  chatMessages.appendChild(row);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getTimeLabel() {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
}

/* RESPOSTAS PADRÕES */
function getBotResponse(message) {
  const text = message.toLowerCase();

  if (text.includes("horário") || text.includes("entrada") || text.includes("saída")) {
    return (
      "Sobre <strong>horários e regras gerais</strong>:<br><br>" +
      "• Horário máximo de atraso e avisos automáticos.<br>" +
      "• Lembretes de entrada, almoço e saída.<br>" +
      "• Regras de permanência e funcionamento."
    );
  }

  if (text.includes("restaurante") || text.includes("cardápio")) {
    return (
      "Sobre o <strong>restaurante</strong>:<br><br>" +
      "• Horário de funcionamento.<br>" +
      "• Cardápio diário.<br>" +
      "• Avisos de fechamento e horários de pico."
    );
  }

  if (text.includes("mapa") || text.includes("setor") || text.includes("sala")) {
    return (
      "Ajuda com <strong>localização</strong>:<br><br>" +
      "• Mapa interativo da empresa.<br>" +
      "• Localização de salas, setores e banheiros.<br>" +
      "• Roteamento interno para facilitar sua adaptação."
    );
  }

  if (text.includes("rh") || text.includes("ti") || text.includes("ajuda")) {
    return (
      "Sobre <strong>suporte RH/TI</strong>:<br><br>" +
      "• Como abrir chamados.<br>" +
      "• Contatos das equipes certas.<br>" +
      "• Orientações de problemas comuns."
    );
  }

  if (text.includes("primeiros dias") || text.includes("guia") || text.includes("integração")) {
    return (
      "Sobre o <strong>guia dos primeiros dias</strong>:<br><br>" +
      "• Regras básicas.<br>" +
      "• Informações iniciais essenciais.<br>" +
      "• Dicas para facilitar sua adaptação."
    );
  }

  return (
    "Posso te ajudar com:<br>" +
    "• Horários e regras<br>" +
    "• Restaurante e cardápio<br>" +
    "• Mapa e localização<br>" +
    "• Guia dos primeiros dias<br>" +
    "• Suporte RH/TI<br><br>" +
    "Exemplos: <em>“Quais são os horários de trabalho?”</em>"
  );
}
