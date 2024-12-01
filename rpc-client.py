import socket

server_address = './rpc_socket_file'

# ソケットを作成
sock = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)

try:
    # サーバーに接続
    sock.connect(server_address)
    message = '1'
    print(f'Sending {message}')
    sock.sendall(message.encode('utf-8'))

    # サーバーからの応答を受信
    data = sock.recv(1024)
    print(f'Received {data.decode("utf-8")}')
finally:
    print('closing socket')
    sock.close()