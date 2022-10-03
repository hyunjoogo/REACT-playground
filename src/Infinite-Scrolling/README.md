# Infinite scrolling 구현
- 개요 : 
  - 회사 프로젝트 중 웹뷰로 사용자에게 자동차에 대한 관련정보를 보여주는 화면에 사용되었음
  - 웹뷰라는 특성상 페이지네이션보다는 아래로 스크롤하면 다음 페이지로 넘어가는 것이 UX상 좋은 경험을 줄 수 있을거라 생각하여 건의를 함
  - 스크롤이벤트를 이용한 방식으로 구현을 하려고 하였으나 Intersection Observer API 를 이용하여 구현함

# 스크롤과 height를 이용해서 구현
- 해당 내용은 노션에서 확인가능합니다.

## 1. 구현하기
   - 브라우저의 스크롤 포함 크기 + `scrollTop` 이 컨텐츠의 높이보다 클 때 다음 페이지를 가지고 오는 것
    
      > ### **`offsetWidth` vs `getBoundingClientRect`**
     > 
     > 두 프로퍼티의 차이는 offsetWidth는 정수형 값으로 반올림하며 getBoundingClientRect는 소수점까지 값을 리턴합니다. 만약 transform 속성을 적용했다면 offsetWidth는 엘리먼트의 레이아웃 width를 리턴하지만 getBoundingClientReact는 렌더링된 width, height를 리턴합니다.
     > 
     > 예를들어 width: 100px에 transform: scale(0.5)를 적용했다면 offsetWidth는 100을 리턴하지만 getBoundingClientRect는 width:50으로 리턴합니다. 
     > 
     > 즉, offestWidth는 CSS에 적용한 width를 따라가고 getBoundingClientRect는 transform까지 된 것을 따라간다. (transform이 적용안된다면 그냥 사용해도 상관없다)

## 2. 리플로우 발생
  1. 스크롤 이벤트가 여러번 발생
  2. `documentElement.scrollTop`과 `documentElement.offsetHeight` 는 매번값이 변경되므로 [리플로우](https://www.notion.so/feat-c521ebed578c4ccfb5cc7e365f6f569a)가 발생
## 3. 대안 : `Throttle`
  1. 이벤트를 그룹화하여 특정 시간이 지난 후 하나의 이벤트만 발생하도록 하는 `DebounceAndThrottle`
     예시 : 검색시 한 글자 칠 때마다 요청을 하는 것이 아니라 특정시간이 지난 후 검색이 될 수 있도록
  2. 일정 주기마다 이벤트를 모아서 한 번씩 이벤트가 발생하도록 하는 `Throttle`
     예시 : 스크롤 이벤트시 몇 초에 한번 실행되게 제한을 두는 것
     > ### **`scrollTop` , `offsetHeight`, `window*.innerHeight`, `visualViewport.width`**  
      > scrollTop : 엘리멘트의 상단에서 보이는 컨텐츠와 스크롤의 상단까지의 거리를 측정
     > 
      > offsetHeight :  요소의 높이.  패딩, 스크롤 바, 테두리(Border)가 포함. 마진은 제외 
     > 
      > window.innerWidth / innerHeight : 브라우저 viewport 의 스크롤 포함 크기
     > 
      > visualViewport.width : 브라우저 viewport 의 스크롤 제외 크기
