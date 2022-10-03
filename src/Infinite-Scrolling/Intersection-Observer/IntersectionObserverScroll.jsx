import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from "styled-components";
import axios from "axios";
import useIntersect from "./useUntersect";

const PAGE_SIZE = 10 * Math.ceil(visualViewport.width / 1000);

const options = {
  root: null,
  // 타겟 이미지 접근 전 이미지를 불러오기 위해 rootMargin을 설정했습니다.
  rootMargin: '0px 0px 30px 0px',
  threshold: 0
};

const IntersectionObserverScroll = () => {
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [isFetching, setFetching] = useState(false);
  const [hasNextPage, setNextPage] = useState(true);

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      fetch();
    }
  }, options);

  const fetch = async () => {
    setFetching(true);
    try {
      const {
        data: {contents, pageNumber, isLastPage}
      } = await axios.get('/users', {params: {page, size: PAGE_SIZE}});
      setData((prev) => prev.concat(contents));
      setPage(pageNumber + 1);
      setNextPage(!isLastPage);
      setFetching(false);
    } catch (err) {
    }
  };


  const users = useMemo(() => data, [data]);

  return (
    <Container className="container">
      {users?.map((user) => (
        <Item key={user.id}>{user.id} / {user.name} / 인터섹션</Item>
      ))}
      {isFetching && <>Loading...</>}
      <Target className="ref2" ref={ref}/>
    </Container>
  );
};

export default IntersectionObserverScroll;

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

const Target = styled.div`
  height: 1px
`;
