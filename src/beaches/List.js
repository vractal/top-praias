import React from 'react'
import map from 'lodash/map'
import Beach from './Beach'

export default ({ list, filters }) => (
  <div>
    {list && map(list,beach => {
      const show = ({state,location, name }) => {
        let show = true

        const normalizeString = str => {
          str = str.toUpperCase()
          str = str.replace(/[ÀÁÂÃÄÅ]/,"A");
          str = str.replace(/[ÈÉÊË]/,"E");
          str = str.replace(/[Ç]/,"C");
          str = str.replace(/[Í]/,"I");
          str = str.replace(/[ÓÔ]/,"O");

          return str.replace(/[^A-Z0-9]/gi,'');
        }

        if (filters.state){
          show = normalizeString(state).includes(normalizeString(filters.state))
        }
        if (filters.name) {
          show = normalizeString(name).includes(normalizeString(filters.name)) || normalizeString(location).includes(normalizeString(filters.name))
        }
        return show
      }

      return show(beach) && <Beach {...beach} />

    })}
  </div>
)
  
