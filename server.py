import socket

# Define HOSTNAME and PORT
hostname = 'localhost'
port = 5678

# Create a TCP/IP socket
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_socket.bind((hostname, port))  # Bind to a specific IP and port
server_socket.listen(1)  # Listen for incoming connections

print("Server is waiting for a connection...")

while True:
    # Continuously wait for client connections
    try:
        # Accept a client connection
        connection, client_address = server_socket.accept()
        print(f"Connection established with {client_address}")
        
        # Handle client interaction in a loop
        while True:
            # Receive data from the client (in bytes)
            data = connection.recv(1024)
            if data:
                # Print the received data to the display
                received_number = data.decode('utf-8')
                print(f"Received: {received_number}")

                # Send the received number back to the client
                response = f"Server received {received_number}"
                connection.sendall(response.encode('utf-8'))  # Encode the string to bytes
            else:
                # If no data is received, the client has disconnected
                print("Client disconnected")
                break  # Break the inner loop to wait for a new connection
                
    except socket.error as e:
        print(f"Socket error occurred: {e}")
    
    finally:
        # Ensure the connection is closed
        connection.close()
        print("Connection closed. Waiting for a new client...")
