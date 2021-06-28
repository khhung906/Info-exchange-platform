import React from 'react'
import { NavLink } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        NTU
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    minWidth:'300px',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));


function AboutUs() {
  console.log('about us')

  const classes = useStyles();
  return (
    <div style={{backgroundColor:"#f7f3f3", minHeight:'100vh',}}>
      <div className="navBar">
        <NavLink style={{fontFamily: "copperplate", float: 'left'}} to="/home">Info Exchange</NavLink>
        <NavLink className="redirect" to="/aboutus">About Us</NavLink>
      </div>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              About Us
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              The best well-organized site for NTU student, where you can find every specific campus informations.
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>

              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Chang-Syu Chen 陳昶旭
                    </Typography>
                    <Typography>
                      Frontend Developer
                    </Typography>
                    <br/>
                    <Typography>
                      National Taiwan University Department of Electrial & Electronic Engineering
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Kuo-Han Hung 洪國瀚
                    </Typography>
                    <Typography>
                      Frontend and Backend Connector
                    </Typography>
                    <br/>
                    <Typography>
                      National Taiwan University Department of Computer Science & Information Engineering
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Hong-jie Fang 方泓傑
                    </Typography>
                    <Typography>
                      Backend Developer
                    </Typography>
                    <br/>
                    <Typography>
                      National Taiwan University Department of Computer Science & Information Engineering
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom style={{fontFamily: "copperplate"}}>
          <NavLink style={{textDecoration: 'none', color:'black'}}to="/">Info Exchange</NavLink>
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          National Taiwan University
        </Typography>
        <Copyright />
      </footer>
    </div>
  );
}

export default AboutUs;
