import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import './Deposit.css';

const Deposit = () => {
  const [tokenAddress, setTokenAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [depositStatus, setDepositStatus] = useState('');
  const navigate = useNavigate();

  const handleDeposit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8086/api/ethers/deposit', {
        tokenAdd:tokenAddress,
        amount:amount,
      });

      console.log("response :",response);

      if (response.status === 200) {
        console.log("Deposit successful!")
        setDepositStatus('Deposit successful!');
        navigate('/transaction-info');
      } else {
        setDepositStatus('Deposit failed. Please try again.');
      }
    } catch (error) {
      console.error('Error depositing tokens:', error);
      setDepositStatus('Deposit failed. Please try again.');
    }
  };

  return (
    <div className="deposit-container">
      <h2>Deposit Tokens</h2>
      <form onSubmit={handleDeposit}>
        <label>Token Address:</label>
        <input
          type="text"
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value)}
        />
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit">Deposit</button>
      </form>
      {depositStatus && <p>{depositStatus}</p>}
    </div>
  );
};

export default Deposit;
