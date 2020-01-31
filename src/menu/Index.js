import React, { useState } from 'react'
import './menu.css'
import Logo from './Logo'
import Filters from './Filters'
import menuToggle from './menu-toggle.png'
import umbrella from './umbrella.png'


export default props => {
  const [menu, toggleMenu] = useState(false)
  const desktopClass = `menu ${menu ? '': 'hide'}`
  const mobileClass = `menu-bar ${menu ? 'hide' :  ''}`
  return <div>
          <div className={desktopClass}>
            <img alt="" className="arrow close" src={menuToggle} onClick={() => toggleMenu(!menu)}/>
            <Logo />
            <Filters {...props} />
          </div>
          <div className={mobileClass}>
            <img alt="" className="arrow open rotateImage" src={menuToggle} onClick={() => toggleMenu(!menu)} />
            <h1 className="title">PRAIA<img alt="" src={umbrella}/><span>BRASIL</span></h1>
          </div>
        </div>
}
