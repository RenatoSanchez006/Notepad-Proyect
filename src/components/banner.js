import React, { useEffect } from 'react';

export default function Banner({ name, day }) {
  useEffect(() => { console.log('Banner updated'); }, [name]);
  useEffect(() => { console.log('Day changed'); }, [day]);

    return <p>This is the first {name} in {day}.</p>
};
