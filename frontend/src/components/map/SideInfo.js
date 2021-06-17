import React from 'react';

const openInfo = () => {
    document.getElementById("sidebar").style.width = "250px";
}
const closeInfo = () => {
    document.getElementById("sidebar").style.width = "0";
}


function SideInfo (data) {

    document.getElementById("sidebar").style.width = "250px";
    console.log('click')
    return (
        <div id="sidebar" className='sidenav'>
            <a href="javascript:void(0)" class="closebtn" onClick={closeInfo}>&times;</a>
            <p>{data}</p>
        </div>
    )
}

export default SideInfo;