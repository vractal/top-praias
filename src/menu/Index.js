import React from 'react'
import './menu.css'
import Paper from '@material-ui/core/Paper';
import Logo from './Logo'
import Filters from './Filters'

export default props => {
  return(
     <div className="menu">
        <Logo />
        <Filters {...props} />
      </div>
)
}
