import React from 'react';

export default function Actions({ delItem }) {
  return (
    <button onClick={delItem}>
      Delete
    </button>
  )
}