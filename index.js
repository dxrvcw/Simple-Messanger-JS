setInterval(updateText, 1000);

function formHandler(event) {
  event.preventDefault();
  let message = document.querySelector("#message").value;
  sendDataToApi(message, getCurrentTime());
  document.querySelector("#message").value = "";
}

async function sendDataToApi(message, time) {
  let data = { message, time };
  let response = await fetch("http://localhost:3000/0", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

async function getDataFromApi() {
  let response = await fetch("http://localhost:3000/0");
  return await response.json();
}

async function updateText() {
  let messages = await getDataFromApi();
  let paragraph = document.querySelector("#text");
  paragraph.innerHTML = "";
  for (let message of messages) {
    console.log(message);
    paragraph.innerHTML += `<div class="message"><p class="message-text">${message.message}</p>
    <p class="message-time">${message.time}</p></div>`;
  }
}

function getCurrentTime() {
  const currentTime = new Date();
  const hours = currentTime.getHours().toString().padStart(2, "0");
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");
  const formattedTime = `${hours}:${minutes}`;
  return formattedTime;
}
