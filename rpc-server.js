const net = require("net");
const fs = require("fs");

const socketPath = "./rpc_socket_file";

// すでにソケットファイルが存在している場合は削除
if (fs.existsSync(socketPath)) {
  fs.unlinkSync(socketPath);
}

const functions = {
  floor: (n) => Math.floor(n),
  nroot: (n) => Math.pow(n[0], 1 / n[1]),
  reverse: (str) => str.split("").reverse().join(""),
  validAnagram: (str) =>
    str[0].split("").sort().join("") === str[1].split("").sort().join(""),
  sort: (arr) => arr.sort((a, b) => a - b),
};

const server = net.createServer((socket) => {
  console.log("Client connected");

  socket.on("data", (data) => {
    const { method, params, param_types, id } = JSON.parse(data);
    // console.log({ params });
    const result = functions[method](params);
    // console.log({ result });
    socket.write(JSON.stringify(result));
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
