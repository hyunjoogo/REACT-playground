import React, { useEffect, useMemo, useState } from "react";
import { InView, useInView } from "react-intersection-observer";
import axios from "axios";
import styled from "styled-components";

const PAGE_SIZE = 10 * Math.ceil(visualViewport.width / 1000);

const ReactIntersection = () => {

  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [isFetching, setFetching] = useState(false);
  const [hasNextPage, setNextPage] = useState(true);

  const [ref, inView] = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) fetch();
  }, [inView]);

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
        <Item key={user.id}>{user.id} / {user.name} / 라이브러리</Item>
      ))}
      {isFetching && <>Loading...</>}
      <Target className="ref2" ref={ref}/>
    </Container>


  );
};

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

export default ReactIntersection;
