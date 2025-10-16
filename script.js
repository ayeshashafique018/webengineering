function Message(text, sender) {
  this.text = text;
  this.sender = sender;
}

const messages = [];
const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", sendMessage);
messageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  try {
    const text = messageInput.value.trim();
    if (!text) throw "⚠️ Please enter a message before sending.";

    const userMsg = new Message(text, "User");
    messages.push(userMsg);
    displayMessage(userMsg);
    messageInput.value = "";

    setTimeout(() => {
      const reply = new Message(generateAutoReply(text), "Bot");
      messages.push(reply);
      displayMessage(reply);
    }, 1000);
  } catch (error) {
    alert(error);
  }
}

function displayMessage(msgObj) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", msgObj.sender === "User" ? "user" : "bot");
  msgDiv.textContent = msgObj.text;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function generateAutoReply(userText) {
  const replies = [
    "hey,yes",
    "That's so interesting! ",
    "Oh really? Tell me more!",
    "Hmm, sounds nice 💭",
    "Haha, I like that! 😄",
    "Let’s keep chatting! ✨"
  ];
  return replies[Math.floor(Math.random() * replies.length)];
}
