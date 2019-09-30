import React, { Component, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from '../axios/config'

function withAuth(ProtectedComponent) {
  return function (props) {
    const [isLoading, setLoading] = useState(true)
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
      (async function() {
        try {
          const res = await axios.get('/session')
          setLoading(false)
          if (res.status !== 200) {
            setRedirect(true)
          }
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
}

export default withAuth