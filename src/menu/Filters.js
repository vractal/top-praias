import React, { useState } from 'react'
import Select from 'react-select'
import uniqBy from 'lodash/uniqBy'
import uniq from 'lodash/uniq'
import map from 'lodash/map'


export default ({ beaches, filters, setFilters }) => {
  const [selectedState, setSelectedState ] = useState(undefined)
  const states = uniqBy(map(beaches,({ state }) => ({ value: state, label: state})),'value')

  return <div className="filters">
  <input placeholder="Filtrar por nome ou cidade" onChange={event => setFilters({...filters, name: event.target.value})}/>
  <Select
   className="select"
   placeholder="Filtrar por estado"
   isClearable
   options={states}
   inputValue={selectedState}
   onInputChange={(option) => setSelectedState(option)}
   onChange={(option) => setFilters({...filters, state:  option && option.value})}
   />
  <p> Use os campos acima para filtrar a lista por nome, cidade ou Estado. Foque as imagens para ver a descrição.</p>
  </div>
}
