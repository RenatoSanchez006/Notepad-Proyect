import React from 'react';
// import Button from '@material-ui/core/Button';

export default function Actions({ delItem }) {
  return (
    <div>
      <button onClick={delItem}>
        Delete
      </button>
      {/* <button >
        Done
      </button> */}
      <button >
        Edit
      </button>
    </div>
  )
}