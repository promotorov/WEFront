import React, { Component } from 'react'
import Categories from './Categories'
import Recommendations from './Recommendations'
import { Container, Col, Row } from 'reactstrap'

function Home() {
  return (
    <div>
      <Container>
        <Row>
          <Col xs="4"><Categories/></Col>
          <Col xs="8"><Recommendations/></Col>
        </Row>
      </Container>
    </div>
  )
}

export default Home