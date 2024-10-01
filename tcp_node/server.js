// Import the 'net' module to create a TCP server
const net = require('net');

// Define HOSTNAME and PORT
const hostname = 'localhost';
const port = 5679;

// Create a TCP server
const server = net.createServer((socket) => {
    console.log('Connection established with', socket.remoteAddress);

    // Handle data received from the client
    socket.on('data', (data) => {
        const receivedNumber = data.toString('utf-8');
        console.log(`Received: ${receivedNumber}`);

        // Send a response back to the client
        const response = `Server received ${receivedNumber}`;
        socket.write(response);
    });

    // Handle client disconnection
    socket.on('end', () => {
        console.log('Client disconnected');
    });

    // Handle any errors that occur
    socket.on('error', (err) => {
        console.log(`Socket error occurred: ${err.message}`);
    });

    // Ensure the connection is closed when done
    socket.on('close', () => {
        console.log('Connection closed. Waiting for a new client...');
    });
});

// Start the server and listen for incoming connections
server.listen(port, hostname, () => {
    console.log(`Server is waiting for a connection on ${hostname}:${port}`);
});
