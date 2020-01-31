import React, { useState, useEffect } from 'react';
import axios from 'axios'
import map from 'lodash/map'
import './App.css';
import BeachesList from './beaches/List'
import Menu from './menu/Index'
import { normalizeString } from './utils'
import loadingGif from './loading.gif'

function App() {
  const [beaches, setBeaches] = useState(null)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({ name: undefined, state: undefined })

  useEffect(() => {
    const url = "https://us-central1-top-praias-29185.cloudfunctions.net/fetchBeaches"
    axios.get(url).then(response => {
      const normalizedList = map(response.data.data, beach => ({...beach, normalizedState: normalizeString(beach.state), normalizedName: normalizeString(beach.name), normalizedLocation: normalizeString(beach.location)}))
      setBeaches(normalizedList)
    }).catch(error => {
      console.log('Error:',error)
      setError("Algo de errado aconteceu!")
    })
  },[])

  return (
    <div className="app">
          {beaches ? (
            <>
              <Menu beaches={beaches} filters={filters} setFilters={setFilters} />
              <BeachesList  list={beaches} filters={filters}/>
            </>
        ) : <img alt="loading" src={loadingGif} /> }
        {error && <h1>{error}</h1>}
   </div>
  )
}

export default App;
