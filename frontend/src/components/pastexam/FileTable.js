import React, { useState } from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import instance from '../../axios';

const useStyles1 = makeStyles((theme) => ({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
}));

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
        <IconButton
            onClick={handleFirstPageButtonClick}
            disabled={page === 0}
            aria-label="first page"
        >
            {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
            onClick={handleNextButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="next page"
        >
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
            onClick={handleLastPageButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="last page"
        >
            {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
        </div>
    );
}

const useStyles2 = makeStyles({
    table: {
        minWidth: 500,
    },
    title: {
        flex: '1 1 100%',
      },
});
  
function FileTable(props) {
    const { rows } = props;
    const classes = useStyles2();
    const [page, setPage] = useState(0);
    const [loading, setLoad] = useState(false)
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDownload = async (examid, filename) =>{
        // console.log('onclick')
        // console.log(examid)
        setLoad(true)
        const {
            data : {message, exam}
        } = await instance.post('api/loadfile', {examid});
        if(message === "load Succesfully"){
            console.log(exam)
            const buffer = Buffer.from(exam.file, 'utf8');
            const blob = new Blob([buffer], { type: 'application/pdf'});
            const data = window.URL.createObjectURL(blob);
            var link = document.createElement('a');
            link.href = data;
            link.download = filename;
            link.click();
        }
        else{
            //temp
            alert('something went wrong')
        }
        setLoad(false)
    }

    return (
    <>
        {/* <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
        &emsp;&emsp;Nutrition
        </Typography>     */}
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
            <TableHead>
                <TableRow>
                    <TableCell style={{fontWeight: "bold"}}>File Name</TableCell>
                    <TableCell align="center" style={{fontWeight: "bold"}}>Test</TableCell>
                    <TableCell align="right" style={{fontWeight: "bold"}}>Academic Year</TableCell>
                    <TableCell align="right" style={{fontWeight: "bold"}}>Download</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {(rowsPerPage > 0
                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows
            ).map((row, idx) => {
                return(<TableRow key={idx}>
                <TableCell component="th" scope="row">
                    {row.filename}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                    {row.test}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                    {row.year+' '+row.semester}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                    {loading? <CircularProgress size="25px"/>:<Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.button}
                        startIcon={<SaveIcon />}
                        onClick={()=>{handleDownload(row.examid, row.filename)}}
                    >
                        Save
                    </Button>}
                    
                </TableCell>
                </TableRow>)
            })}

            {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
                </TableRow>
            )}
            </TableBody>
            <TableFooter>
            <TableRow>
                <TablePagination
                rowsPerPageOptions={[10, 20, 100, { label: 'All', value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
                />
            </TableRow>
            </TableFooter>
        </Table>
        </TableContainer>
    </>
  );

};

export default FileTable;