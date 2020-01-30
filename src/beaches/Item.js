import React from 'react'
import './beach.css'

export default ({name, imgSrc, location, state, description }) =>{
  return <div className="overlay">
            <img src={imgSrc}/>
            <div  className="name title">
              <div>
                <h3>{location}</h3>
                <h1>{name}</h1>
              </div>
              <h4>{state}</h4>
            </div>
            <div class="description" >
              <h1 className="title">{name}</h1>
              <p>{description}</p>
            </div>
          </div>
}
