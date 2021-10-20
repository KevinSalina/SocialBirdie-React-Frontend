import React, { useState, useEffect } from 'react';
import axios from 'axios'

// MUI Import
import Grid from '@mui/material/Grid'

// Components
import Round from '../components/Round'

function Home(props) {
  const [rounds, setRounds] = useState(null)

  useEffect(() => {
    fetchRounds()
  }, [])

  const fetchRounds = async () => {
    try {
      const fetch = await axios.get('/rounds')

      console.log(fetch)
      setRounds(fetch.data)
    } catch (err) {
      console.log(err)
    }
  }

  let recentRounds = rounds ? rounds.map(round => {
    return (
      <Round key={round.roundId} round={round} />
    )
  }) : <p>Loading....</p>

  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {recentRounds}
      </Grid>
      <Grid item sm={4}>
        <p>Profile</p>
      </Grid>
    </Grid>
  );
}

export default Home;