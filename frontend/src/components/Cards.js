import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});
const cards = [{name:'Course Calender', 
                dis:'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
                imgsrc:'/img/Calender.jpg',
                route:'/calender'
                },
               {name:'Library Map', 
                dis:'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
                imgsrc:'',
                route:'/library'
                }
];

const card = (classes, message) =>{
    return(
        <Card className={classes.root}>
        <CardActionArea>
            <CardMedia
            className={classes.media}
            image={message.imgsrc}
            title="icon"
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                {message.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                {message.dis}
            </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
            <Button size="small" color="primary" component={Link} to={message.route}>
              view
            </Button>
        </CardActions>
        </Card>
    );
}


export default function Cards() {
  const classes = useStyles();
  return (
    <>
        {cards.map(x => card(classes, x))}
    </>
  );
}
