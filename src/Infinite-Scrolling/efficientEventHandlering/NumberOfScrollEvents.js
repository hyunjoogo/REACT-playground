import React, { useEffect, useState } from 'react';
import styled from "styled-components";

const NumberOfScrollEvents = () => {

  const [count, setCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const {scrollTop} = document.documentElement;
      setCount(scrollTop);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const resetCount = () => {
    handleTop();
  };

  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <Wrapper>
      <h1>Number of scroll events </h1>
      <button onClick={resetCount}>리셋</button>
      <div id="counter">{count}</div>
      <button className="topBtn" onClick={resetCount}>TOP</button>
    </Wrapper>
  );
};

export default NumberOfScrollEvents;


const Wrapper = styled.div`
  background: #444444;
  color: white;
  margin: 0 auto;
  max-width: 600px;
  padding: 20px;
  min-height: 200vh;

  #counter {
    position: fixed;
    top: 100px;
    left: 40%;
    font-size: 50px;
  }

  .reset {
    color: white;
    text-decoration: none;
    border: 1px solid white;
    padding: 10px 20px;
    background: rgba(0, 0, 0, 0.1);
  }
  .topBtn {
    position: fixed;
    opacity: 1;
    bottom: 40px;
    right: 40px;
    z-index: 10;
    width: 50px;
    height: 50px;
    cursor: pointer;
  }

`;
