import React from 'react';
import styled from "styled-components";
import useInfiniteScroll from "./useInfiniteScroll";
import axios from "axios";

const fetchUsers = (params) => {
  console.log(params);
  return axios.get('/users', {
    params,
  });
};

const PAGE_SIZE = 10 * Math.ceil(visualViewport.width / 1000);

const ScrollEvent = () => {
  const {data: users, isFetching} = useInfiniteScroll(fetchUsers, PAGE_SIZE);
  return (
    <Container className="container">
      {users.map((user) => (
        <Item key={user.id}>{user.id} / {user.name} / 스크롤이벤트</Item>
      ))}
      {isFetching && <>Loading...</>}
    </Container>
  );
};

export default ScrollEvent;

const Container = styled.div`
`;

const Item = styled.div`
  color: yellow;
  height: 100px;
  width: 100px;

  margin: 10px;
  border: 1px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
`;
