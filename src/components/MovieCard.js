import React, { useState } from 'react'
import { Button } from 'reactstrap'
import { Container, Col, Row } from 'reactstrap'
import axios from "../axios/config";

function MovieCard({movie, isDisabled, isFavorite, onLike, onDislike}) {
  const buttonStyles = {
    'backgroundColor': isFavorite ? 'red' : 'green'
  }

  const [participants, setParticipants] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isFetched, setFetched] = useState(false)
  const [isOthersHidden, setOthersHidden] = useState(false)

  async function onFetchOthersClick(e, eventId) {
    e.preventDefault()
    try {
      setLoading(true)
      setError(null)
      const res = await axios.get(`/events/${eventId}/participants`)
      setLoading(false)
      setParticipants({ people: res.data.participants, total: res.data.total })
      setFetched(true)
    }
    catch (error) {
      setLoading(false)
      if (error.response)
        setError(error.response.data.error)
      else
        setError('Server is not available')
    }
  }

  function onShowOthersClick(e) {
    e.preventDefault()
    setOthersHidden(!isOthersHidden)
  }

  return (
    <div>
      <Container>
        <Row>
          <Col xs={6}>
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
          </Col>
          <Col xs={6}>
            {!isFavorite && <div>Join the event to see who is coming</div>}
            {isFavorite && <div>
              <p>Participants</p>
              {!isFetched &&
              <Button onClick={ e => onFetchOthersClick(e, movie.id)}>
                Show
              </Button>
              }
              {isFetched &&
                <Button onClick={onShowOthersClick}>
                  {isOthersHidden ? 'Show' : 'Hide'}
                </Button>
              }
              {isLoading && <div>Loading...</div>}
              {error && <div>{error}</div>}
              {isFetched && !isOthersHidden && <div>
                <p>Total: {participants.total}</p>
                <ul>
                  {participants.people.map(x => <li>
                    <p>{x.firstName}</p>
                    <p>{x.secondName}</p>
                    <p>{x.gender}</p>
                  </li>)}
                </ul>
              </div>}
            </div>}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default MovieCard