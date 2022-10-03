/**
 *  첫 이벤트 발생 시 핸들러를 실행하고 실행된 시간을 저장한 후
 *  다음 이벤트부터는 timeout으로 지정한 시간이 지나기 전까지 계속 timer를 초기화하여
 *  이벤트 발생을 무효로 합니다.
 *  그리고 이전 이벤트가 발생하고 나서부터 timeout만큼 시간이 지나면
 *  handler를 실행하여 결과적으로 timeout 시간 동안 단 한 번의 이벤트가 발생하도록 제어합니다.
 * @param handler
 * @param timeout
 * @returns {(function(...[*]): void)|*}
 */


const throttle = (handler, timeout = 300) => {
  let invokedTime;
  let timer;
  return function (...args) {
    if (!invokedTime) {
      handler.apply(this, args);
      invokedTime = Date.now();
    }
    else {
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        if (Date.now() - invokedTime >= timeout) {
          handler.apply(this, args);
          invokedTime = Date.now();
        }
      }, Math.max(timeout - (Date.now() - invokedTime), 0));
    }
  };
};

export default throttle
