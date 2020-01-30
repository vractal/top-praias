import React, { useState, useEffect } from 'react';
import axios from 'axios'
import BeachesList from './beaches/List'
import './App.css';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

function App() {
  const [beaches, setBeaches] = useState([])
  const [filters, setFilters] = useState({ name: undefined, state: undefined })
  useEffect(() => {
    const url = "https://us-central1-top-praias-29185.cloudfunctions.net/fetchBeaches"
    axios.get(url).then(response => setBeaches(response.data.data))
  },[])

  return (
    <div className="App">
      <TextField  style={{ paddingTop: 20, width: '90%'}}  placeholder="Filtrar por nome ou cidade" onChange={event => setFilters({...filters, name: event.target.value})}/>
      <TextField  style={{ paddingTop: 20, width: '90%'}} placeholder="Filtrar por estado" onChange={event => setFilters({...filters, state: event.target.value})}/>
      <BeachesList list={beaches} filters={filters}/>
    </div>
  );
}

export default App;
