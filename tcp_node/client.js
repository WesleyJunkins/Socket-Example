const net = require('net');

// Define HOSTNAME and PORT
const hostname = 'localhost';
const port = 5679;

const serverAddress = { host: hostname, port: port };

let counter = 0;
let reconnectTimeout;
let client;

// Function to handle reconnection logic
function retryConnection() {
    console.log("Retrying connection in 5 seconds...");
    reconnectTimeout = setTimeout(connectToServer, 5000); // Retry connection after 5 seconds
}

// Function to connect to the server
function connectToServer() {
    client = new net.Socket();

    // Handle successful connection
    client.connect(serverAddress, () => {
        console.log("Connected to the server!");

        // Clear any reconnection timeouts (if any)
        if (reconnectTimeout) {
            clearTimeout(reconnectTimeout);
            reconnectTimeout = null;
        }

        // Send incrementing counter to the server in a loop
        const messageInterval = setInterval(() => {
            if (client.destroyed) {
                clearInterval(messageInterval);  // Stop sending if the connection is destroyed
                return;
            }

            const message = counter.toString();

            // Send the message to the server
            client.write(message);

            counter++;
        }, 2000);  // Send every two seconds
    });

    // Handle data received from the server
    client.on('data', (data) => {
        console.log(`Server response: ${data.toString('utf-8')}`);
    });

    // Handle connection error or failure
    client.on('error', (err) => {
        console.error(`Connection failed: ${err.message}`);
        if (!client.destroyed) {
            client.destroy();  // Ensure the client socket is cleaned up
        }
        retryConnection();  // Retry connection
    });

    // Handle connection close by the server
    client.on('close', () => {
        console.log("Connection closed by the server.");
        if (!client.destroyed) {
            client.destroy();  // Ensure the client socket is cleaned up
        }
        retryConnection();  // Retry connection
    });
}

// Initiate the first connection attempt
connectToServer();
