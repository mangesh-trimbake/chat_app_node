const socket = io('http://localhost:3000')

const name = prompt("your name ?")

appendMessage("you joined")
socket.emit('new-user',name)

socket.on("user-connected", data =>{
  appendMessage(data+" joined")
})

socket.on('chat-message', data => {
  console.log("message got : ", data);
  appendMessage(data.name+" : "+data.message);
})

socket.on('user-disconnected', data=>{
  appendMessage(data+" disconnected")
})

$("#chat_form").on('submit', function() {
  var message = $("#chat_input").val();
  console.log("message to sent - ", message);
  socket.emit('send-chat-message', message)
  appendMessage("you : " + message)
  $("#chat_input").val("")
})

function appendMessage(message) {
  $("#chat_messages").append("\
    <p>"+message+"</p>\
  ")
}
