import '../styles/application.scss';
import {connect} from '../services';
import React, {PureComponent} from 'react';

connect('AAPL');

class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            stockSymbol: 'AAPL', // Replace with your desired stock symbol
        };
    }

    componentDidMount() {
        this.getStockData();
    }

    getStockData() {
        connect(this.state.stockSymbol)
            .then(data => {
                console.log('Data received from connect:', data);
                this.setState({ data });
            })
            .catch(error => {
                console.error(`Error: ${error}`);
            });
    }

    render() {
        // debug if this.state.data is not null
        console.log('Rendering component, this.state.data: ', this.state.data);
        return (
            <div className="stock-ticker/">
                <h1>Stock Blotter</h1>
                <div>
                    {this.state.data ? (
                        <div>Stock data: {JSON.stringify(this.state.data)}</div>
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
            </div>
        );
    }
}

export default App;
