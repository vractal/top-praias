import React from 'react'
import map from 'lodash/map'
import Beach from './Item'
import { normalizeString } from '../utils'

export default ({ list, filters }) => (
  <div style={{ width: '100%', maxWidth: '900px'}}>
    {list && map(list,beach => {
      const show = ({normalizedState, normalizedName, normalizedLocation }) => {
        if (!filters.state && !filters.name){
          return true
        }

        const stateMatch = normalizedState.includes(normalizeString(filters.state))
        const nameMatch = normalizedName.includes(normalizeString(filters.name)) || normalizedLocation.includes(normalizeString(filters.name))

        return stateMatch && nameMatch
      }

      return show(beach) && <Beach key={beach.name} {...beach} />

    })}
  </div>
)
