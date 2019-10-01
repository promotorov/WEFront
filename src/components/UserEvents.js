import React from 'react'

function UserEvents({events}) {
  return (
    <div>
      <div className="text-center">My Events</div>
      <ul>
        {events.length === 0 && <div>No events</div>}
        {events.map(e => {
          return <li key={e}>
              {e}
          </li>
        })}
      </ul>
    </div>
  )
}

export default UserEvents