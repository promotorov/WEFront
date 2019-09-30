import React, { Component, useState } from 'react'
import { Button } from 'reactstrap'
import { Redirect } from 'react-router-dom';
import axios from '../axios/config'

function Logout() {
  const [redirect, setRedirect] = useState(false)

  async function onClick(event) {
    event.preventDefault()
    try {
      const res = await axios.delete('/session')
      if (res.status === 204)
        setRedirect(true)
      else
        console.log('Client error')
    }
    catch (error) {
      if (error.response)
        console.log(error.response.data.error)
      else
        console.log('Server is not available')
    }
  }

  return (
    <div>
      {redirect && <Redirect to="/login" />}
      <Button onClick={onClick}>Logout</Button>
    </div>
  )
}

export default Logout