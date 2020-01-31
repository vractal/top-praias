import React, { useState, useEffect } from 'react';
import axios from 'axios'

import './App.css';
import BeachesList from './beaches/List'
import Menu from './menu/Index'


function App() {
  const [beaches, setBeaches] = useState([])
  const [filters, setFilters] = useState({ name: undefined, state: undefined })

  useEffect(() => {
    const url = "https://us-central1-top-praias-29185.cloudfunctions.net/fetchBeaches"
    axios.get(url).then(response => setBeaches(response.data.data))
  },[])

  return (
    <div className="app">
          <Menu beaches={beaches} filters={filters} setFilters={setFilters} />
          {beaches &&  <BeachesList  list={beaches} filters={filters}/>}
   </div>
  )
}

export default App;
