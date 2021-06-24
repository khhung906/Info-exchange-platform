import * as React from 'react';

function LibraryInfo(props) {
  const {info} = props;
  const displayName = `${info.Name}`;
  const displaySeats = `${info.Seats}`

  return (
    <div>
      <div>
        {displayName}
      </div>
      <img width={160} src={info.image} />
    </div>
  );
}

export default React.memo(LibraryInfo);