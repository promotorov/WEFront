import React, { Component, useState, useEffect } from 'react'
import { Container, Col, Row } from 'reactstrap'
import axios from '../axios/config'
import MovieCard from './MovieCard'
import { connect } from 'react-redux'
import {addFavorite} from "../actions";
import {removeFavorite} from "../actions";

const mapStateToProps = state => {
  return {
    favorites: state.favorites,
    isFavoritesLoading: state.isLoading,
    favoritesError: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addFavorite: id => dispatch(addFavorite(id)),
    removeFavorite: id => dispatch(removeFavorite(id))
  }
}

function Movies({favorites, isFavoritesLoading, favoritesError, addFavorite, removeFavorite}) {
  const [playingMovies, setPlayingMovies] = useState([])
  const [upcomingMovies, setUpcomingMovies] = useState([])
  const [genres, setGenres] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    (async function () {
      try {
        const response = await Promise.all([axios.get('/movies'), axios.get('/movies/genres')])
        setLoading(false)
        setError(null)
        setPlayingMovies(response[0].data.playing)
        setUpcomingMovies(response[0].data.upcoming)
        setGenres(response[1].data.genres)
      }
      catch (error) {
        console.log(error)
        setLoading(false)
        if (error.response)
          setError(error.response.data.error)
        else
          setError('Server is not available')
      }
    })()
  }, [])
  return (
    <div>
      <Container>
        <Row>
          <Col xs="8">
            <div className="text-center">Movies content</div>
            {isLoading && <div>Loading...</div>}
            {!isLoading && error && <div>{error}</div>}
            {!isLoading && !error && <div>
              <div className="font-weight-bold">Playing</div>
              <ul>
                {playingMovies.map(movie => <li>
                  <MovieCard
                    movie={movie}
                    isDisabled={isFavoritesLoading}
                    isFavorite={favorites.findIndex(x => x.eventId == movie.id) !== -1}
                    onLike={addFavorite}
                    onDislike={removeFavorite}
                  />
                </li>)}
              </ul>
              <div className="font-weight-bold">Upcoming</div>
              <ul>
                {upcomingMovies.map(movie => <li>
                  <MovieCard movie={movie} />
                </li>)}
              </ul>
            </div>}
          </Col>
          <Col xs="4">
            <div className="text-center">Filters</div>
            {isLoading && <div>Loading...</div>}
            {!isLoading && error && <div>{error}</div>}
            {!isLoading && !error && <ul>
              {genres.map(genre => <li>
                <p>{genre.name}</p>
              </li>)}
            </ul>}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Movies)