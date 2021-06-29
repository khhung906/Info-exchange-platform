import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import calander_img from '../img/Calendar.jpg';
import map_img from '../img/Map.jpg';
import book_img from '../img/book.jpg'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    background: '#f6f7f7',
  },
  media: {
    height: 180,
  },
});
const cards = [{name:'Student Calendar', 
                dis:'Shared calendar for HW/EXAMS due dates | Club Activities | NTU Events',
                imgsrc: calander_img,
                route: '/calendar'
                },
               {name:'NTU Map', 
                dis:'Real-time Library/Cafe Seats | Courts Usage',
                imgsrc: map_img,
                route:'/map'
                },
               {
                name:'Past Exams', 
                dis:'Past Exams for all courses (midterm/final/quiz)',
                imgsrc: book_img,
                route:'/pastexams'
                },
              //  {
              //   name:'Other Features', 
              //   dis:'Other Features2',
              //   imgsrc:'',
              //   route:''
              //   },
              //  {
              //   name:'Other Features', 
              //   dis:'Other Features3',
              //   imgsrc:'',
              //   route:''
              //   },
];

const card = (classes, message, id) =>{
    return(
      <div>
        <Card className={classes.root} key = {id}>
          <CardActionArea component={Link} to={message.route}>
              <CardMedia
                component="img"
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
          {/* <CardActions>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions> */}
        </Card>
      </div>
    );
}


export default function Cards() {
  const classes = useStyles();
  return (
    <>
        {cards.map((x, id) => card(classes, x, id))}
    </>
  );
}
