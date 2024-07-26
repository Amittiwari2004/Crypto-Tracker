import React, { useEffect, useState, useContext } from 'react';
import './Coin.css';
import { CoinContext } from '../../context/CoinContext';
import { useNavigate, useParams } from 'react-router-dom';
import LineChart from '../../components/LineChart/LineChart';
import Spinner from '../../components/Spinner/Spinner';

const Coin = () => {
    const { id } = useParams();
    const [coin, setCoin] = useState(null);
    const { currency } = useContext(CoinContext);
    const [historicalData, setHistoricalData] = useState({ prices: [] });
    const [chartWidth, setChartWidth] = useState('100%');
    const navigate=useNavigate();
   

    const fetchCoin = () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'x-cg-demo-api-key': 'CG-41FzKofBFaQq9A7ukGPYowmX'
            }
        };

        fetch(`https://api.coingecko.com/api/v3/coins/${id}`, options)
            .then(response => response.json())
            .then(response => setCoin(response))
            .catch(err => console.error(err));
    };

    const fetchHistoricalData = () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'x-cg-demo-api-key': 'CG-41FzKofBFaQq9A7ukGPYowmX'
            }
        };

        fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency.name}&days=10`, options)
            .then(response => response.json())
            .then(response => setHistoricalData(response))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchCoin();
        fetchHistoricalData();

        const handleResize = () => {
            setChartWidth(window.innerWidth > 768 ? '100%' : window.innerWidth - 40);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [id, currency]);
  

    if (!coin) {
        return <div className="loading"><Spinner/></div>;
    }

    return (
        <div className="coin-container">
            <button className="homebtn" onClick={()=>navigate("/")}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="back-arrow"><g><g><rect width="24" height="24" opacity="0" transform="rotate(90 12 12)"></rect><path d="M19 11H7.14l3.63-4.36a1 1 0 1 0-1.54-1.28l-5 6a1.19 1.19 0 0 0-.09.15c0 .05 0 .08-.07.13A1 1 0 0 0 4 12a1 1 0 0 0 .07.36c0 .05 0 .08.07.13a1.19 1.19 0 0 0 .09.15l5 6A1 1 0 0 0 10 19a1 1 0 0 0 .64-.23 1 1 0 0 0 .13-1.41L7.14 13H19a1 1 0 0 0 0-2z"></path></g></g></svg>
            </button>
            <h1 className="coin-name">{coin.name} ({coin.symbol.toUpperCase()})</h1>
            <div className="coin-chart">
                <LineChart historicalData={historicalData} width={chartWidth} />
            </div>
            <div className="coin-details">
                <img src={coin.image.large} alt={coin.name} className="coin-image" />
                <div className="coin-info">
                    <p><strong>Current Price:</strong> {currency.symbol}{coin.market_data.current_price[currency.name.toLowerCase()]}</p>
                    <p><strong>Market Cap:</strong> {currency.symbol}{coin.market_data.market_cap[currency.name.toLowerCase()].toLocaleString()}</p>
                    <p><strong>24h Change:</strong> <span className={coin.market_data.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}>
                        {coin.market_data.price_change_percentage_24h.toFixed(2)}%
                    </span></p>
                    <p><strong>Total Volume:</strong> {currency.symbol}{coin.market_data.total_volume[currency.name.toLowerCase()].toLocaleString()}</p>
                    <p><strong>Circulating Supply:</strong> {coin.market_data.circulating_supply.toLocaleString()} {coin.symbol.toUpperCase()}</p>
                    <p><strong>Total Supply:</strong> {coin.market_data.total_supply ? coin.market_data.total_supply.toLocaleString() : 'N/A'} {coin.symbol.toUpperCase()}</p>
                </div>
            </div>
            <div className="coin-description">
                <h2>About {coin.name}</h2>
                <p dangerouslySetInnerHTML={{ __html: coin.description.en }}></p>
            </div>
        </div>
    );
};

export default Coin;