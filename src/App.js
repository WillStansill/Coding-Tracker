import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import StudyTracker from "./artifacts/contracts/StudyTracker.sol/StudyTracker.json";
import './App.css';

const studytrackerAddress = "0x588aaA09DBa4dD288767a6aa03b185E334EfAEAE";

function App() {
  const [isClockRunning, setIsClockRunning] = useState(false);
  const [provider, setProvider] = useState(null);
  const [studyTrackerContract, setStudyTrackerContract] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        // Connect to the Ethereum network
        const alchemyURL = process.env.RPC_URL;
        const provider = new ethers.providers.JsonRpcProvider(alchemyURL);
        setProvider(provider);

        // Connect to the deployed StudyTracker contract
        const studyTrackerContract = new ethers.Contract(studytrackerAddress, StudyTracker.abi, provider.getSigner());
        setStudyTrackerContract(studyTrackerContract);
      } catch (error) {
        console.error('Error initializing:', error.message);
      }
    };

    init();
  }, []);

  const startClock = async () => {
    try {
      // Call the startStudySession function on the smart contract
      await studyTrackerContract.startStudySession();
      setIsClockRunning(true);
    } catch (error) {
      console.error('Error starting the clock:', error.message);
    }
  };

  const stopClock = async () => {
    try {
      // Call the endStudySession function on the smart contract
      await studyTrackerContract.endStudySession();
      setIsClockRunning(false);
    } catch (error) {
      console.error('Error stopping the clock:', error.message);
    }
  };

  return (
    <div className="App">
      <h1>Study Tracker</h1>
      <button onClick={startClock} disabled={isClockRunning}>
        Start Clock
      </button>
      <button onClick={stopClock} disabled={!isClockRunning}>
        Stop Clock
      </button>
    </div>
  );
}

export default App;
