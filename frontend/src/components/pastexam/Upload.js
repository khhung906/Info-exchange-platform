import React, { useState, useRef, useCallback, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';


function Search(props) {

    return (
      <>
        <Button variant="contained"
                component="label"
                startIcon={<CloudUploadIcon />}
                variant="outlined"
                color="primary">
        Upload File
        <input type="file"
                hidden/>
        </Button>
      </>
    );
};

export default Search;
