import React from 'react';
import './Features.css';
import { useNavigate } from 'react-router-dom';
const Features = () => {
    const navigate=useNavigate();
  const features = [
    {
      icon: '📊',
      title: 'Real-time Tracking',
      description: 'Get up-to-the-minute prices and market data for thousands of cryptocurrencies.'
    },
    {
      icon: '📈',
      title: 'Historical Charts',
      description: 'View detailed price history and trends with interactive charts.'
    },
    {
      icon: '🔔',
      title: 'Price Alerts',
      description: 'Set custom alerts to notify you when coins reach specific price points.'
    },
    {
      icon: '💼',
      title: 'Portfolio Management',
      description: 'Track your investments and monitor your crypto portfolio performance.'
    },
    {
      icon: '📰',
      title: 'News Feed',
      description: 'Stay informed with the latest crypto news and market updates.'
    },
    {
      icon: '🔒',
      title: 'Secure & Private',
      description: 'Your data is encrypted and your privacy is our top priority.'
    }
  ];

  return (
    <div className="feature-page">
    <button className="homebtn" onClick={()=>navigate("/")}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="back-arrow"><g><g><rect width="24" height="24" opacity="0" transform="rotate(90 12 12)"></rect><path d="M19 11H7.14l3.63-4.36a1 1 0 1 0-1.54-1.28l-5 6a1.19 1.19 0 0 0-.09.15c0 .05 0 .08-.07.13A1 1 0 0 0 4 12a1 1 0 0 0 .07.36c0 .05 0 .08.07.13a1.19 1.19 0 0 0 .09.15l5 6A1 1 0 0 0 10 19a1 1 0 0 0 .64-.23 1 1 0 0 0 .13-1.41L7.14 13H19a1 1 0 0 0 0-2z"></path></g></g></svg>
    </button>
      <h1>Features of Our Crypto Tracker</h1>
      <div className="feature-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h2>{feature.title}</h2>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;