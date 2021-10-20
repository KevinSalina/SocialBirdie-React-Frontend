import React from 'react';
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'


// MUI Imports
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography';

dayjs.extend(relativeTime)

function Round(props) {
  const { round } = props
  const { roundId, score, numHoles, createdAt, course, commentCount, par, likeCount, userImage, username } = round
  return (
    <Card sx={{ display: 'flex', flexDirection: 'row', mb: 5 }}>
      <CardMedia image={userImage} title="Profile Image" sx={{ width: '200px', height: 'inherit', objectFit: 'contain' }} />
      <CardContent>
        <Typography variant="h5">{course}</Typography>
        <Typography variant="body1" >{numHoles} Holes</Typography>
        <Typography variant="body1" >Score: {score}</Typography>
        <Typography variant="body1" component={Link} to={`/users/${username}`} >{username}</Typography>
        <Typography variant="body2" color="secondary">{dayjs(createdAt).fromNow()}</Typography>
      </CardContent>
    </Card>
  );
}

export default Round;