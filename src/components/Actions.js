import React from 'react';
import Button from '@material-ui/core/Button';

export default function Actions({ delItem }) {
  return (
    <div>
      <Button onClick={delItem}>
        Delete
      </Button>
      <Button >
        Done
      </Button>
      <Button >
        Edit
      </Button>
    </div>
  )
}