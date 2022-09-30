import React, { useCallback, useEffect, useState } from 'react';
import axios from "axios";
import styled from "styled-components";

const PAGE_SIZE = 10 * Math.ceil(visualViewport.width / 1000);

const ScrollEvent = () => {
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState([]);
  const [isFetching, setFetching] = useState(false);
  const [hasNextPage, setNextPage] = useState(true);

  const fetchUsers = useCallback(async () => {
    const {data} = await axios.get('/users', {
      params: {page, size: PAGE_SIZE},
    });
    setUsers(users.concat(data.contents));
    setPage(data.pageNumber + 1);
    setNextPage(!data.isLastPage);
    setFetching(false);
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      const {scrollTop, offsetHeight} = document.documentElement;
      // 브라우저의 스크롤 포함 크기(고정) + 엘리멘트상단과 스크롤의 상단의 거리 >= 컨텐츠의 높이
      // 엘리멘트는 추가가 되면서 커진다.
      // scrollTop이 커지면서 컨텐츠의 높이보다 커지면 (즉, 끝까지 왔다) 새로운 자료를 받을 수 있도록 한다.
      if (window.innerHeight + scrollTop >= offsetHeight) {
        setFetching(true);
      }
    };
    setFetching(true);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isFetching && hasNextPage) fetchUsers();
    else if (!hasNextPage) setFetching(false);
  }, [isFetching]);

  const onClick = () => {
    const box = document.querySelector(".box");
    box.style.width = '200px';
    box.style.height = '200px';
  };


  return (
    <div>
      {/*{users.map((user) => (*/}
      {/*  <Item key={user.id} name={user.name}>{user.name}</Item>*/}
      {/*))}*/}
      {/*{isFetching && <>Loading...</>}*/}
      <Box onClick={onClick} className="box"></Box>
    </div>
  );
};

export default ScrollEvent;

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


const Box = styled.div`
  background-color: red;
  width: 100px;
  height: 100px;
`;
