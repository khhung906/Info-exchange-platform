import React from 'react';

const openInfo = () => {
    document.getElementById("sidebar").style.width = "250px";
}
const closeInfo = () => {
    document.getElementById("sidebar").style.width = "0";
}


function SideInfo () {


    return (
        <div id="sidebar" className='sidenav'>
            <a href="javascript:void(0)" className="closebtn">&times;</a>
            <p>Hello</p>
        </div>
    )
}

export default SideInfo;