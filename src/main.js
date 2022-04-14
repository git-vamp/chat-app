"use strict"
let socket = io();

let input = document.querySelector("#messageInput");

const sleep = (delay) => {
  return new Promise(resolve => {
    setTimeout(resolve, delay)
  });
}
let add_message = (message) => {
  document.querySelector('#chat').innerHTML += `
  <div class="message-container">
  <div class="message ${message.name == username ? '': 'right' }">
    <span class="name">${message.name}</span>
    <span class="content">${message.content}</span>
  </div>
</div>`
}
let add_header = (message) => {
  document.querySelector('#chat').innerHTML += `
  <div class="message-container center">
    <span class="content-header"><b>${message}</b></span>
  </div>`
}



let username = "";

while (username == "" || username == null) {
  username = prompt("Username: ")
}


socket.emit('joined', username)

socket.on("joined", (name) => {
  add_header(`${name} has joined the chat`)
})

socket.on("message", (message) => {
  add_message(message)
})

socket.on("typing", (typer) => {
  console.log(typer.id, typer.name)
})

socket.on("disconnected", (name) => {
  add_header(`${name} has left the chat`)
})
addEventListener("submit", (event) => {
  event.preventDefault();
  if (!input.value.trim() == "") {
    let message = {name: username, content: input.value}
    socket.emit("message", message);
    add_message(message)
    input.value = ""
  }
})

input.addEventListener("keypress", (event) => {
  sleep(5000).then(() => {
    socket.emit("typing", {id: socket.id, name: username})
  })
})
// THE GREATEST DEMON LORD IS REBORN AS A TYPICAL NOBODY
