import React from 'react'

export default ({name, imgSrc, location }) =>{
  return <div>
            <h1>{name}</h1>
            <img src={imgSrc} />
            <h3>{location}</h3>
          </div>
}
