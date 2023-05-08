import React, { useState, useRef } from 'react';
import axios from 'axios';
import './HealthDataInput.css';
import { useAuth0 } from "@auth0/auth0-react";

const HealthDataInput = () => {
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');
  const recognitionRef = useRef(null);
  const { user, isAuthenticated } = useAuth0();
  const [userID, setUserID] = useState(user ? user.sub : null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/process_text', {
        text,
        userID: userID,
      });

      if (response.data.success) {
        setMessage('Data saved successfully!');
      } else {
        setMessage('Error: ' + response.data.message);
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  const handleSpeech = () => {
    if (!('webkitSpeechRecognition' in window)) {
      setMessage('Speech recognition not supported in this browser.');
      return;
    }
  
    if (!recognitionRef.current) {
      const WebkitSpeechRecognition = window.webkitSpeechRecognition;
      const recognition = new WebkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
  
      recognition.onresult = (event) => {
        let newText = text;
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            newText += event.results[i][0].transcript;
          }
        }
        setText(newText);
      };
  
      recognition.onerror = (event) => {
        setMessage('Error: ' + event.error);
      };
  
      recognition.onend = () => {
        recognition.start();
      };
  
      recognitionRef.current = recognition;
    }
  
    recognitionRef.current.start();
  };

  return (
    <div className="health-data-input">
      <h1>Health Data Input</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="text">Enter your text:</label>
          <textarea
            id="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            rows={5}
            cols={50}
            required
          />
        </div>
        <button type="submit">Submit</button>
        {/* <button type="button" onClick={handleSpeech}>
          Start Speech Recognition
        </button> */}
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default HealthDataInput;
