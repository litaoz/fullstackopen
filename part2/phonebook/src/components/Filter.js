import React from 'react'

const Filter = (props) => {
  const {filter, changeFilter} = props
  return (
    <div>
      filter shown with <input value={filter} onChange={changeFilter}/>
    </div>  
  )
}

export default Filter