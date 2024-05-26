import io from 'socket.io-client';
// import Promise from

let  socket = null;

export const connect = (stockSymbol) => {
    return new Promise((resolve, reject) => {
        socket = io(`http://localhost:4000/#${stockSymbol}`);

        socket.on('connect', () => {
            console.log('connected');

            socket.on(stockSymbol, (data) => {
                console.log(data);
                resolve(data); // Resolve the promise with the received data
            });

            socket.emit('ticker', stockSymbol);
            console.log(`emitted ticker: ${stockSymbol}`);
        });

        socket.on('disconnect', () => {
            console.log('disconnected');
        });

        socket.on('connect_error', (error) => {
            reject(error); // Reject the promise if there's a connection error
        });
    });
};
