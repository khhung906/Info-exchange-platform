import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const useRowStyles = makeStyles({
  title:{
    color:"black",
    marginLeft:"20px",
  },
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

// function createData(divider, title, date, text) {
//   return {
//     divider,
//     title,
//     date, 
//     text
//   };
// }

function Row(props) {
  const { row } = props;
  // const [open, setOpen] = useState(false);
  const classes = useRowStyles();
  const showtime = row.end.split('G')[0]

  return (
    <React.Fragment>
      <TableRow classdivider={classes.root}>
        <TableCell component="th" scope="row">{row.divider}</TableCell>
        <TableCell align="right">{row.title}</TableCell>
        <TableCell align="right">{showtime}</TableCell>
        <TableCell align="right">{row.description}</TableCell>
      </TableRow>
    </React.Fragment>
  );
}


function UpcomingTable(props) {
  const { events } = props;
  const classes = useRowStyles();
  const sortedEvents = events.sort((a, b) => {
      const now = new Date();
      const n = now.toJSON();
      if(b.end < n) {
          return -1;
        }
      else if(a.end < n) return 1;
      else if(b.end > a.end) return -1;
      else return 1;
    })

  let rows = sortedEvents.slice(0,3);

  return (
    <>
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            Upcoming events
        </Typography>
        <TableContainer component={Paper} title="Editable Example">
        <Table aria-label="collapsible table" >
            <TableBody>
            {rows.map((row, id) => (
                <Row key={id} row={row} />
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </>
  );
}

export default UpcomingTable;
