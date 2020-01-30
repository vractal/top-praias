import React from 'react'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

export default ({ filters, setFilters }) => {
  return <div className="filters">
  <input placeholder="Filtrar por nome ou cidade" onChange={event => setFilters({...filters, name: event.target.value})}/>
  <input placeholder="Filtrar por estado" onChange={event => setFilters({...filters, state: event.target.value})}/>
  <p> Use os campos acima para filtrar a lista por nome, cidade ou Estado. Foque as imagens para ver a descrição.</p>
  </div>
}
