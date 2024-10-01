import socket
import time

# Define HOSTNAME and PORT
hostname = 'localhost'
port = 5678

server_address = (hostname, port)  # Define the server's address and port

while True:
    try:
        # Create a new socket to reconnect
        client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        
        # Try to connect to the server
        client_socket.connect(server_address)
        print("Connected to the server!")

        counter = 0
        
        while True:
            message = str(counter)

            # Send message to the server
            client_socket.sendall(message.encode('utf-8'))

            # Receive response from the server
            response = client_socket.recv(1024)
            print(f"Server response: {response.decode('utf-8')}")

            counter += 1

            time.sleep(2)

    except (socket.error, socket.timeout) as e:
        # If there's a connection failure, wait a bit and try again
        print(f"Connection failed: {e}. Retrying in 5 seconds...")
        time.sleep(5)  # Wait for 5 seconds before trying again
    finally:
        client_socket.close()
