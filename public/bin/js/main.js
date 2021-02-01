const socket = io();


socket.on('Console', msg => {
    console.log(msg)
})
