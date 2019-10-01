import React from 'react'

function MovieCard({movie}) {
  return (
    <div>
      <div>{movie.title}</div>
      <div>{movie.id}</div>
    </div>
  )
}

export default MovieCard