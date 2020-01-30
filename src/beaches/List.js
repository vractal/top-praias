import React from 'react'
import map from 'lodash/map'


export default ({ list }) => {
  return <div>{map(list, ({ name, location, imgSrc }) => {
    return (
      <div>
        <h1>{name}</h1>
        <img src={imgSrc} />
        <h3>{location}</h3>
      </div>
    )
  })}
  </div>
}
