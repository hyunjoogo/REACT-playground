import { useCallback, useEffect, useState } from "react";
import throttle from "./throttle";

const useInfiniteScroll = (fetcher, size) => {
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [isFetching, setFetching] = useState(false);
  const [hasNextPage, setNextPage] = useState(true);

  const executeFetch = useCallback(async () => {
    try {
      const {
        data: {contents, pageNumber, isLastPage},
      } = await fetcher({page, size});
      setData((prev) => prev.concat(contents));
      setPage(pageNumber + 1);
      setNextPage(!isLastPage);
      setFetching(false);
    } catch (err) {
      console.error(err);
    }
  }, [page]);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const {scrollTop, offsetHeight} = document.documentElement;
      console.log(window.innerHeight , scrollTop , offsetHeight);
      // 브라우저의 스크롤 포함 크기(고정) + 엘리멘트상단과 스크롤의 상단의 거리 >= 컨텐츠의 높이
      // 엘리멘트는 추가가 되면서 커진다.
      // scrollTop이 커지면서 컨텐츠의 높이보다 커지면 (즉, 끝까지 왔다) 새로운 자료를 받을 수 있도록 한다.
      console.log('normal scroll');
      if (window.innerHeight + scrollTop >= offsetHeight) {
        setFetching(true);
      }
    });

    setFetching(true);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isFetching && hasNextPage) executeFetch();
    else if (!hasNextPage) setFetching(false);
  }, [isFetching]);

  return {page, data, isFetching, hasNextPage};
};


export default useInfiniteScroll;
