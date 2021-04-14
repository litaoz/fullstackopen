import React from 'react'

const Filter = (props) => {
    const {filter, changeFilter} = props;
    return(
        <div>find countries <input value={filter} onChange={changeFilter}/></div>
    )

}

export default Filter