import ShakeInput from "./shakeInput/ShakeInput";
import ScrollEvent from "./Infinite-Scrolling/normalScroll/ScrollEvent";
import NumberOfScrollEvents from "./Infinite-Scrolling/efficientEventHandlering/NumberOfScrollEvents";
import DebounceAndThrottle from "./Infinite-Scrolling/efficientEventHandlering/DebounceAndThrottle";
import Otp from "./OTP/Otp";
import IntersectionObserverScroll from "./Infinite-Scrolling/Intersection-Observer/IntersectionObserverScroll";
import ReactIntersection from "./Infinite-Scrolling/react-intersection-obseerver/ReactIntersection";


function App() {
  return (
    // <ShakeInput/>
    // <Otp/>
    // <ScrollEvent/>
    // <IntersectionObserverScroll/>
    <ReactIntersection/>
    // <NumberOfScrollEvents/>
    // <DebounceAndThrottle/>
  );
}

export default App;
