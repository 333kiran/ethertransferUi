// TransactionInfo.js
import React, { useState } from 'react';
import axios from 'axios';
import './TransactionInfo.css';

const TransactionInfo = () => {
  const [transactionInfo, setTransactionInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userAddress, setUserAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFetchDetails = async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      const response = await axios.get(`http://localhost:8086/api/ethers/getTxtInfo?address=${userAddress}`);
      console.log("response data =>",response);

      if (response.status === 200) {
        setTransactionInfo(response.data);
      } else {
        setTransactionInfo(null);
        setErrorMessage('No transaction details found for the provided address.');
      }
    } catch (error) {
      console.error('Error fetching transaction info:', error);
      setErrorMessage('Error fetching transaction details. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <div className="transaction-info-container">
      <h2>Transaction Info</h2>
      <div>
        <label>Enter User Address:</label>
        <input
          type="text"
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
        />
        <button onClick={handleFetchDetails}>Fetch Details</button>
      </div>
      {isLoading && <p>Loading...</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {transactionInfo && (
        <div className="transaction-details">
          <p><strong>Transaction Hash:</strong> {transactionInfo.transactionHash}</p>
          <p><strong>Spender Address:</strong> {transactionInfo.user}</p>
          <p><strong>Token Address:</strong> {transactionInfo.token}</p>
          <p><strong>Amount:</strong> {transactionInfo.amount}</p>
        </div>
      )}
    </div>
  );
};

export default TransactionInfo;
