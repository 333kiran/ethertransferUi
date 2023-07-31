import React, { useState } from 'react';
import Web3 from 'web3';
import './Demo.css';

function Demo() {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');
  const [userAddress, setUserAddress] = useState('');

  // Replace 'YOUR_API_ENDPOINT' with the URL of your API endpoint
  const apiEndpoint = 'http://localhost:8086/api/ethers';

  // Function to handle the transfer process
  async function handleTransfer() {
    if (!window.ethereum) {
      alert("Please install MetaMask to use this app.");
      return;
    }

    try {
      // Request account access if needed
      await window.ethereum.enable();

      // Create a new web3 instance with the current provider (MetaMask)
      const web3 = new Web3(window.ethereum);

      // Get the user's connected wallet address
      const accounts = await web3.eth.getAccounts();
      setUserAddress(accounts[0]);

      // Validate recipient address and amount
      if (!recipient || !amount || isNaN(amount)) {
        setStatus('Please enter a valid recipient address and amount.');
        return;
      }

      // Transfer ethers using the API
      const response = await fetch(apiEndpoint + '/token-transfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ receiverAddress: recipient, amountInEth: amount })
      });

      const result = await response.json();
      console.log("result data =>",result);
      const transactionHash = result.txHash;
      // const transactionReceipt = result.receipt;

      // Display the transaction hash on the UI
      setStatus(`Transaction Hash: ${transactionHash}`);
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  }

  return (
    <div>
      <h1> Transfer</h1>
      <p>Connected Wallet Address: {userAddress}</p>
      <form>
        <label htmlFor="recipient">Recipient Address:</label>
        <input type="text" id="recipient" value={recipient} onChange={(e) => setRecipient(e.target.value)} required /><br />
        <label htmlFor="amount">Amount :</label>
        <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} required /><br />
        <button type="button" onClick={handleTransfer}>Pay </button>
      </form>
      <div>{status}</div>
    </div>
  );
}

export default Demo;
