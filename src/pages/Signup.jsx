import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/system/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom';

function Signup(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [username, setUsername] = useState('')
  const [isLoading, setIsLoading] = useState(null)
  const [errors, setErrors] = useState({})

  let history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const newUserData = { email, password, confirmPassword, username }
    try {
      const signUpResult = await axios.post('https://us-central1-socialbirdie-d941f.cloudfunctions.net/api/signup', newUserData)
      setIsLoading(false)
      console.log(signUpResult)
      localStorage.setItem('FBIdToken', `Bearer ${signUpResult.data.idToken}`)
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
    if (e.target.name === 'confirmPassword') return setConfirmPassword(value)
    if (e.target.name === 'username') return setUsername(value)
  }


  return (
    <Box sx={{ margin: 'auto', marginTop: 15, maxWidth: '500px', textAlign: 'center', p: 5 }}>
      <Typography variant="h2" sx={{ mb: 3 }}>
        Sign Up
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
          sx={{ mb: 2 }}
        />
        <TextField
          variant="standard"
          fullWidth
          id="confirmPassword"
          helperText={errors.confirmPassword}
          error={errors.confirmPassword ? true : false}
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          className='form.password'
          value={confirmPassword}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          variant="standard"
          fullWidth
          id="username"
          helperText={errors.username}
          error={errors.username ? true : false}
          name="username"
          type="text"
          label="Username"
          className='form.username'
          value={username}
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
          Sign Up
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
        to={`/login`}
      >
        Login
      </Button>
    </Box >
  );
}

export default Signup;