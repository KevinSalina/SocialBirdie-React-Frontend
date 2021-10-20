import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/system/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom';

function Login(props) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(null)
  const [errors, setErrors] = useState({})

  let history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const userCredentials = { email, password }
    try {
      const sendLogin = await axios.post('https://us-central1-socialbirdie-d941f.cloudfunctions.net/api/login', userCredentials)
      setIsLoading(false)
      localStorage.setItem('FBIdToken', `Bearer ${sendLogin.data.idToken}`)
      console.log(sendLogin)
      history.push({
        pathname: '/',
      })
    } catch (err) {
      console.log(err.response)
      setErrors(err.response.data)
      setIsLoading(false)
    }

    console.log('Form Submitted')
  }

  const handleChange = (e) => {
    let value = e.target.value
    if (e.target.name === 'email') return setEmail(value)
    if (e.target.name === 'password') return setPassword(value)
  }


  return (
    <Box sx={{ margin: 'auto', marginTop: 15, maxWidth: '500px', textAlign: 'center', p: 5 }}>
      <Typography variant="h2" sx={{ mb: 3 }}>
        Login
      </Typography>
      <form noValidate onSubmit={handleSubmit} >
        <TextField
          variant="standard"
          helperText={errors.email}
          error={errors.email ? true : false}
          fullWidth
          id="email"
          name="email"
          type="email"
          label="Email"
          className='form.email'
          value={email}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          variant="standard"
          fullWidth
          id="password"
          helperText={errors.password}
          error={errors.password ? true : false}
          name="password"
          type="password"
          label="Password"
          className='form.password'
          value={password}
          onChange={handleChange}
          sx={{ mb: 5 }}
        />
        <Button
          sx={{ position: 'relative' }}
          fullWidth
          variant="contained"
          type="submit"
          disabled={isLoading}
        >
          Login
          {isLoading && (
            <CircularProgress sx={{ position: 'absolute', height: '100%' }} />
          )}
        </Button>
      </form>
      <Button
        fullWidth
        variant="outlined"
        type="submit"
        sx={{ mt: 2 }}
        component={Link}
        to={`/signup`}
      >
        Sign Up
      </Button>
    </Box >
  );
}

export default Login;