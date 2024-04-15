import React, {useState} from "react";
import "./index.css";

function App(){
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [history, setHistory] = useState([]);

  async function clearAll(){
    setValue("");
    setError(false);
  }

  async function clearSearchResults() {
    setHistory([]); 
  }

  async function getResponse(){
    if(!value){
      setError(true);
      return ;
    }

    const uri = `https://delivery-app-chatbot.onrender.com/gemini` ;

    try{
      const data = {
        message : value,
        chatHistory : history
      }

      fetch(uri, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(response => {
        
        setHistory(oldChat => [...oldChat, 
          {role : "user", parts : [ {text : value} ] },
          {role : "model",  parts : [ {text : response} ] }
        ])

        console.log(response);

        setValue("");
      });
    }catch(error){
      console.error('There was a problem with the fetch operation:', error);
      setError(true);
    }
  }

  return (
    <section className="chat-section">
      <p>Welcome to our AI chat platform</p>
      <div className="input-area">
        <input className="search" placeholder="How can I help you today?" type="text" value={value} onChange={(e) => setValue(e.target.value)}></input>
        {!error && <button onClick={getResponse}><span>Ask Me</span></button>}
        {!error && <button className="clear-button" onClick={clearSearchResults}><span>Clear</span></button>}
        {error && <button className="clear-button" onClick={clearAll}><span>Delete Chat</span></button>}
      </div>
      <div className="search-results">
      {history.map((chat, index) => (
        <div key={index} className="answer">
          {chat.role}: {chat.parts.map((part, partIndex) => (
            <span key={partIndex}>{part.text}</span>
          ))}
        </div>
      ))}
      </div>
    </section>
  );
}

export default App;
