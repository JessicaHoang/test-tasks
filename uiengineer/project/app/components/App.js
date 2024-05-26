import '../styles/application.scss';
import {connect} from '../services';
import React, {PureComponent, useState, useEffec} from 'react';

useEffect(() => {
    async function getStockData() {
        try {
            const result = await connect(stockSymbol);
            setData(result);
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    }
    getStockData();
}, [stockSymbol]); // Re-run the effect when `stockSymbol` changes

getStockData('AAPL');

class App extends PureComponent {
    const [data, setData] = useState(null);
    const stockSymbol = 'AAPL'; // Replace with your desired stock symbol

    render() {
        return (
            <div className="stock-ticker/">
                <h1>Stock Blotter</h1>
                {getStockData().then(data => {
                    return (
                        <div>
            {data ? (
                <div>Stock data: {JSON.stringify(data)}</div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
                    );
                })}
            </div>
        );
    }
}

export default App;
