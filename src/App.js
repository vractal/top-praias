import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Grid from '@material-ui/core/Grid';

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
    <div className="App">
      <Grid container style={{ paddingTop: 40}}>
        <Grid item xs={4} style={{ marginLeft: 20, marginTop: 50}}>
          <Menu filters={filters} setFilters={setFilters} />
        </Grid>
       <Grid container item xs={7} justify="center" style={{ marginLeft: 20, marginTop: 30}}>
          {beaches &&  <BeachesList list={beaches} filters={filters}/>}
       </Grid>
    </Grid>
   </div>
  );
}

export default App;
