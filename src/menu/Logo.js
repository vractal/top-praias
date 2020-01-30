import React from 'react'
import Typography from '@material-ui/core/Typography';

import umbrella from './umbrella.png'

export default props => {
  return <>
    <div className="logo">
      <h1 className="title">PRAIA<img src={umbrella}/><span>BRASIL</span></h1>
    </div>
    <p>as melhores praias do Brasil!</p>
    </>
}
