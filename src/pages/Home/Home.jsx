import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar/Navbar';
import './Home.css';
import { CoinContext } from '../../context/CoinContext';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';

const Home = () => {
    const { allCoin, currency } = useContext(CoinContext);
    const [displayCoin, setDisplayCoin] = useState([]);
    const [input, setInput] = useState("");
    
    useEffect(() => {
        setDisplayCoin(allCoin);
    }, [allCoin]);
    
    const handleInput = (event) => {
        setInput(event.target.value);
        if (event.target.value === '') {
            setDisplayCoin(allCoin);
        }
    }
    
    const handleSearch = async (event) => {
        event.preventDefault();
        const filteredCoin = await allCoin.filter((coin) => 
            coin.name.toLowerCase().includes(input.toLowerCase())
        );
        setDisplayCoin(filteredCoin);
    }

    // Animation variants
    const titleVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    const paragraphVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } }
    };

    return (
        <>
            <Navbar />
            <div className="home">
                <div className="hero">
                    <motion.h1
                        initial="hidden"
                        animate="visible"
                        variants={titleVariants}
                    >
                        Track Your Cryptos
                    </motion.h1>
                    <motion.p
                        initial="hidden"
                        animate="visible"
                        variants={paragraphVariants}
                    >
                        Welcome to the ultimate cryptocurrency tracker! <br />
                        Stay updated with real-time data, analyze trends, <br />
                        and make informed decisions.
                    </motion.p>
                    <form action="" onSubmit={handleSearch}>
                        <input 
                            type="text"  
                            value={input} 
                            onChange={handleInput} 
                            list='coinlist'
                        />
                        <datalist id='coinlist' >
                            {allCoin.map((coin) => (
                                <option key={coin.id} value={coin.name}/>
                            ))}
                        </datalist>
                        <button>Search</button>
                    </form>
                </div>
                <div className="crypto-table">
                    <div className="table-layout header">
                        <p>#</p>
                        <p>Coins</p>
                        <p>Price</p>
                        <p>24H Change</p>
                        <p className='market-cap'>Market Cap</p>
                    </div>
                    {
                        displayCoin.slice(0,10).map((coin, index) => (
                            <Link to={`/coin/${coin.id}`} key={coin.id}>
                                <div className="table-layout">
                                    <p>{coin.market_cap_rank}</p>
                                    <div>
                                        <img src={coin.image} alt={coin.name} />
                                        <p>{coin.name.slice(0,8) + " - " + coin.symbol}</p>
                                    </div>
                                    <p>{currency.symbol}{coin.current_price}</p>
                                    <p className={coin.price_change_percentage_24h.toFixed(2) > 0 ? "green" : "red"}>
                                        {coin.price_change_percentage_24h.toFixed(2)}%
                                    </p>
                                    <p>{currency.symbol}{coin.market_cap.toLocaleString()}</p>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Home;