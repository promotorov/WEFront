import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { Link } from 'react-router-dom';

function Categories() {
  return (
    <ListGroup>
      <ListGroupItem><Link to="/movies">Movies</Link></ListGroupItem>
    </ListGroup>
  )
}

export default Categories