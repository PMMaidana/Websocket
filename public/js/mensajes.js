const socket = io.connect();

socket.on('messages', data =>{
    render(data);
})

function render(data) {
    var html = data.map(el => {
        return (`
        <div>
            <strong><span style="color:blue">${el.author[0].alias}</span></strong>
            <span style="color:brown">[${el.timestamp}]</span>:
            <span style="color:green"><em>${el.text}</em></span>
            <span>
            <img src="${el.author[0].avatar}" style="object-fit:scale-down;
            width:40px;
            height:40px;
            border: solid 1px #CCC"/></span>
        </div>`)
    }).join(' ');

    document.getElementById("messages").innerHTML = html;
}

function addMessage() {
    let message = {
        author: {
        id: document.getElementById('email').value,
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        edad: document.getElementById('edad').value,
        alias: document.getElementById('alias').value,
        avatar: document.getElementById('avatar').value
    },
        text: document.getElementById('texto').value
    };
    JSON.stringify(message);
    socket.emit('new-message', message)
    return false;
}