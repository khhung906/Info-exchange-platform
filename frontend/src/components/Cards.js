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
    height: 180,
  },
});
const cards = [{name:'Course Calendar', 
                dis:'HW/EXAMS due dates',
                imgsrc:'/img/Calendar.jpg',
                route:'/calender'
                },
               {name:'Library Map', 
                dis:'Library Seats',
                imgsrc:'/img/Map.png',
                route:'/library'
                },
               {
                name:'Other Features', 
                dis:'Other Features1',
                imgsrc:'',
                route:''
                },
               {
                name:'Other Features', 
                dis:'Other Features2',
                imgsrc:'',
                route:''
                },
               {
                name:'Other Features', 
                dis:'Other Features3',
                imgsrc:'',
                route:''
                },
               
              
];

const card = (classes, message) =>{
    return(
        <Card className={classes.root}>
          <CardActionArea component={Link} to={message.route}>
              <CardMedia
              className={classes.media}
              image={message.imgsrc}
              title="icon"
              />
              <CardContent>
              <Typography gutterBottom variant="h5" component="h2" >
                  {message.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                  {message.dis}
              </Typography>
              </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Delete
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
