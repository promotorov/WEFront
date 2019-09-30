import React, { Component, useState } from 'react'
import { Button, Form, Input, FormGroup} from 'reactstrap'
import axios from '../axios/config'

function Login(props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  async function onSubmit(event) {
    event.preventDefault()
    try {
      const res = await axios.post('/session', {
        email,
        password
      })
      if (res.status === 200)
        props.history.push('/')
      else
        setError('Client error')
    }
    catch (error) {
      if (error.response)
        setError(error.response.data.error)
      else
        setError('Server is not available')
    }
  }

  function handleInputChange(event) {
    const { value, name } = event.target
    if (name === "email")
      setEmail(value)
    else if (name === "password")
      setPassword(value)
  }

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <Input
          type="text"
          name="email"
          value={email}
          placeholder="email"
          onChange={handleInputChange}
        />
        <Input
          type="password"
          name="password"
          value={password}
          placeholder="password"
          onChange={handleInputChange}
        />
        {error && <div>{error}</div>}
        <Button>Login</Button>
      </Form>
    </div>
  )
}

export default Login