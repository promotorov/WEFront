import React, { useEffect } from 'react'
import Categories from './Categories'
import Recommendations from './Recommendations'
import UserEvents from './UserEvents'
import { Container, Col, Row } from 'reactstrap'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    favorites: state.favorites,
    isFavoritesLoading: state.isLoading,
    favoritesError: state.error
  };
};

function Home(props) {
  return (
    <div>
      <Container>
        <Row>
          <Col xs="4"><Categories/></Col>
          <Col xs="4"><Recommendations/></Col>
          <Col xs="4"><UserEvents events={props.favorites.map(x => x.eventId)} /></Col>
        </Row>
      </Container>
    </div>
  )
}

export default connect(mapStateToProps)(Home)