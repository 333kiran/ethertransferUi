import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import './Home.css';

const Home = () => {
  // const [spender, setSpender] = useState('');
  // const [tokenAddress, setTokenAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [approvalStatus, setApprovalStatus] = useState('');
  const navigate = useNavigate();

  const handleApprove = async (e) => {
    e.preventDefault();
    try {
        
      const response = await axios.post('http://localhost:8086/api/ethers/approve', {
        // spenderAdd :spender,
        // tokenAdd:tokenAddress,
        amount:amount,
      });

      if (response.status === 200) {
        setApprovalStatus('Approval successful!');
        navigate('/deposit');
      } else {
        setApprovalStatus('Approval failed. Please try again.');
      }
    } catch (error) {
      console.error('Error approving tokens:', error);
      setApprovalStatus('Approval failed. Please try again.');
    }
  };

  return (
    <div className="approval-container">
      <h2>Take Approval for Token Transfer</h2>
      <form onSubmit={handleApprove}>
        <label>Spender Address:</label>
        <input
          type="text"
          value="0xDF5F1173F282165F0c77259b5093028B9cF7AEb2"
        />
        {/* <label>Token Address:</label> */}
        {/* <input
          type="text"
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value)}
        /> */}
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit">Approve</button>
      </form>
      {approvalStatus && <p>{approvalStatus}</p>}
    </div>
  );
};

export default Home;
