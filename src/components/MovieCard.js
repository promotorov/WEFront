import React from 'react'
import { Button } from 'reactstrap'

function MovieCard({movie, isDisabled, isFavorite, onLike, onDislike}) {

  const buttonStyles = {
    'backgroundColor': isFavorite ? 'red' : 'green'
  }

  return (
    <div>
      <div>{movie.title}</div>
      <div>{movie.id}</div>
      <Button
        style={buttonStyles}
        disabled={isDisabled}
        onClick={() => {
          if (isFavorite)
            onDislike(movie.id)
          else
            onLike(movie.id)
        }}
      >
        {isFavorite ? 'Dislike' : 'Like'}
      </Button>
    </div>
  )
}

export default MovieCard