const WebSocketServer = require('ws');

function Main(socket) {
    socket.send(JSON.stringify({ load: 'https://i.picsum.photos/id/997/200/300.jpg?hmac=NeXq5MvhpKvGEq_X3jULp2C3Lg-8IQK8bdtnyJeXDIQ' }))
}
// Creating a new websocket server
const wss = new WebSocketServer.Server({ port: 3500 })

// Creating connection using websocket
wss.on("connection", ws => {
    Main(ws)
        // sending message
    ws.on("open", () => {

    });
    // handling what to do when clients disconnects from server
    ws.on("message", data => {
        console.log(`file: ${data}`)
    });
    ws.on("close", () => {
        console.log("the client has left");
    });
    // handling client connection error
});