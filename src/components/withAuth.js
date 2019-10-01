import React, { Component, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from '../axios/config'
import { connect } from 'react-redux'
import { loadFavorites } from "../actions/index";

const mapStateToProps = state => {
  return {
    isLoaded: state.isLoaded
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadFavorites: () => dispatch(loadFavorites())
  }
}

function withAuth(ProtectedComponent) {
  function Protect(props) {
    const [isLoading, setLoading] = useState(true)
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
      (async function() {
        try {
          await axios.get('/session')
          setLoading(false)
          if (!props.isLoaded)
            props.loadFavorites()
        }
        catch (error) {
          setLoading(false)
          setRedirect(true)
        }
      })()
    }, [])

    if (isLoading)
      return <div>Loading...</div>

    if (redirect)
      return <Redirect to="/login" />

    return(
      <ProtectedComponent {...props} />
    )
  }
  return connect(mapStateToProps, mapDispatchToProps)(Protect)
}

export default withAuth