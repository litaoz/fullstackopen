import React from 'react'

const Notification = (props) => {
  const typeMap = new Map([
    ['', 'blank'],
    ['info', 'green'],
    ['error', 'red']
  ])
  const { message, type } = props
  const color = typeMap.get(type, 'blank')
  const display = message !== '' ? 'block' : 'none'

  const notifStyle = {
    color: color,
    display: display,
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  return(
    <div style={notifStyle}>
      {message}
    </div>
  )
}

export default Notification
