import React from 'react';

function SideInfo (props) {
    //alert('side')
    const {info} = props;
    console.log(info)

    return (
        <div id="sidebar" className='sidenav'>
            {/* <a href="javascript:void(0)" className="closebtn">&times;</a> */}
            <p>side bar</p>
            <p>{(info === null) ? "":info.Name}</p>
        </div>
    )
}

export default SideInfo;