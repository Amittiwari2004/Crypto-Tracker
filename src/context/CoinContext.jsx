import { createContext, useEffect, useState } from "react";
export const CoinContext = createContext();

const CoinContextProvider = (props) => {
    const [allCoin, setAllCoin] = useState([]);
    const [currency, setCurrency] = useState({
        name: "USD",
        symbol: "$"
    });

    const FetchCoin = () => {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              'x-cg-demo-api-key': 'CG-41FzKofBFaQq9A7ukGPYowmX'
            }
        };

        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
            .then(response => response.json())
            .then(response => setAllCoin(response))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        FetchCoin();
    }, [currency]);

    const contextvalue = {
        allCoin,
        currency,
        setCurrency
    };

    return (
        <CoinContext.Provider value={contextvalue}>
            {props.children}
        </CoinContext.Provider>
    );
};

export default CoinContextProvider;
