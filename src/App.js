import React, { useState, useEffect } from 'react';
import axios from 'axios'
import map from 'lodash/map'
import './App.css';
import BeachesList from './beaches/List'
import Menu from './menu/Index'
import { normalizeString } from 'utils'

function App() {
  const [beaches, setBeaches] = useState([])
  const [filters, setFilters] = useState({ name: undefined, state: undefined })

  useEffect(() => {
    const url = "https://us-central1-top-praias-29185.cloudfunctions.net/fetchBeaches"
    axios.get(url).then(response => {
      const normalizedList = map(response.data.data, beach => ({...beach, normalizedState: normalizeString(beach.state), normalizedName: normalizeString(beach.name), normalizedLocation: normalizeString(beach.location)}))
      setBeaches(normalizedList)
    })
  },[])

  return (
    <div className="app">
          <Menu beaches={beaches} filters={filters} setFilters={setFilters} />
          {beaches &&  <BeachesList  list={beaches} filters={filters}/>}
   </div>
  )
}

export default App;
