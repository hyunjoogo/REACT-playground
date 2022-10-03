import React from 'react';

const DebounceAndThrottle = () => {
  let timer;

  const debounceSearch = (e) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      console.log('여기에 ajax 요청', e.target.value);
    }, 1000);
  };

  const throttleSearch = (e) => {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        console.log('여기에 ajax 요청', e.target.value);
      }, 200);
    }
  };


  return (
    <div>
      <input onChange={throttleSearch}/>
    </div>
  );
};

export default DebounceAndThrottle;
