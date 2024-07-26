import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Login.css';
import Logo from '../../assets/icon2.svg';
import { login, signup } from '../../firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Spinner = () => (
  <div className="spinner-overlay">
    <div className="spinner"></div>
  </div>
);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [signState, setSignState] = useState('Sign In');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const toggleSignState = () => {
    setSignState(signState === 'Sign In' ? 'Sign Up' : 'Sign In');
    setUsername('');
    setEmail('');
    setPassword('');
  };

  const userAuth = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (signState === 'Sign In') {
        await login(email, password);
        toast.success('Logged in successfully!');
        if (rememberMe) {
          localStorage.setItem('email', email);
          localStorage.setItem('password', password);
        } else {
          localStorage.removeItem('email');
          localStorage.removeItem('password');
        }
      } else {
        await signup(username, email, password);
        toast.success('Signed up successfully!');
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className="login-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {loading && <Spinner />}
      <header>
        <motion.img 
          src={Logo} 
          alt="Crypto Tracker" 
          className="logo"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
        />
      </header>
      <main>
        <motion.h1
          className="welcome-text"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.3
          }}
        >
          Welcome to Crypto Tracker
        </motion.h1>
        <motion.form 
          onSubmit={userAuth} 
          className="login-form"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 120 }}
        >
          <h2>{signState}</h2>
          {signState === 'Sign Up' && (
            <motion.input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            />
          )}
          <motion.input
            type="text"
            placeholder="Email or phone number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          />
          <motion.input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
          />
          <motion.button 
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {signState}
          </motion.button>
          <div className="form-help">
            <div>
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <a href="#" className="help-link">Need help?</a>
          </div>
        </motion.form>
        <motion.div 
          className="signup-now"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          {signState === 'Sign In' ? (
            <p>New to Crypto Tracker? <a href="#" onClick={toggleSignState}>Sign up now</a>.</p>
          ) : (
            <p>Already have an account? <a href="#" onClick={toggleSignState}>Sign in now</a>.</p>
          )}
        </motion.div>
      </main>
    </motion.div>
  );
};

export default Login;