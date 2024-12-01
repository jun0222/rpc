const net = require("net");
const fs = require("fs");

const socketPath = "./rpc_socket_file";

// すでにソケットファイルが存在している場合は削除
if (fs.existsSync(socketPath)) {
  fs.unlinkSync(socketPath);
}

const server = net.createServer((socket) => {
  console.log("Client connected");

  socket.on("data", (data) => {
    console.log("Received data:", data.toString());
  });

  socket.on("end", () => {
    console.log("Client disconnected");
  });

  socket.on("error", (err) => {
    console.error("Socket error:", err);
  });
});

server.listen(socketPath, () => {
  console.log(`Server listening on ${socketPath}`);
});
