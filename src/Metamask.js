import React, {  useState } from 'react';
import { ethers } from 'ethers';

function MetaMask() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setdefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [chainId, setChainId] = useState(null);

  const connectWallet = () => {
   if (window.ethereum) {
    window.ethereum.request({method:"eth_requestAccounts"})
    .then(result=> {
        accountChanged([result[0]])
    })
   }else{
    setErrorMessage("Install MetaMask please!")
   }
  };

  const  accountChanged = (accountName)=>{
    setdefaultAccount(accountName);
    getUserBalance(accountName);
    getChainId(accountName);

  }

  const getUserBalance = (accountAddress) => {
    window.ethereum.request({method:'eth_getBalance',params:[String(accountAddress),"latest"]})
    .then(balance => {
        setUserBalance(ethers.utils.formatEther(balance));
    })
  }

  const getChainId = () =>{
    window.ethereum.request({method:"eth_chainId"})
    .then(network =>{
        setChainId(network);
    })
  }

  
  return (
    <div>
    <h1>MetaMask Wallet Connection</h1>

    <button  onClick={connectWallet}>connect wallet button</button>
    <h3>Address: {defaultAccount}</h3>
    <h3>Balance:ETH {userBalance}</h3>
    <h3>ChainId: {chainId}</h3>
    </div>
  );
}

export default MetaMask;
