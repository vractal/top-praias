import React, { useState, useEffect } from 'react';
import axios from 'axios'
import BeachesList from './beaches/List'
import './App.css';

function App() {
  const [beaches, setBeaches] = useState([])

  useEffect(() => {
    const url = "https://us-central1-top-praias-29185.cloudfunctions.net/fetchBeaches"
    axios.get(url).then(response => setBeaches(response.data.data))
  },[])

  return (
    <div className="App">
      <BeachesList list={beaches} />
    </div>
  );
}

export default App;
