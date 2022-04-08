import React, { useEffect, useRef, useState } from "react";
import jsSHA from "jssha";

// 비밀번호 재설정 후
// step1 설치 단계
// 다음 버튼을 누르면
// 서버에서 정해준 임의의 secret 키를 프론트로 넘겨줌

// Step2 계정 등록 단계
// 받은 secret 키로 QR Code와 Secret키를 화면에 표시
// 사용자가 구글에 등록후 다음 버튼을 누르면

// Step3 복구코드 저장
// 복구코드 (Secret키)를 다시 보여줌
// 다음을 누르면

// Step4 인증, 등록 완료
// 사용자는 이메일 인증코드, 구글OTP인증코드 이하 otp(30초마다 변경)
// 프론트 =>
// 입력한 인증코드와 계산되고 있는 otp키가 같다면 서버로 찌름
// 이메일 인증코드, Secret키
// 서버 ->
// 1. 이메일 인증코드 확인
// 2. Secret키 저장
// 3. 인증코드와 otp 키가 같음을 어떻게 알 수 있을까? (더블체크가 필요하지 않을까??)

// 로그인시
// 메일, 비번 확인이 되면
// Secret키 던져주기
// 프론트에서 받아서 otp 변환 후 사용자 입력이 맞는지 확인 후 전송


function Otp() {
  const [countDown, setCountDown] = useState(null);
  const [otp, setOtp] = useState(null);
  // 16자리 코드 - 임의적으로 만들어서 제공해야함
  // 이 키가 변경이 되면 다른 사용자로 인식
  // Secret (base32) : 핵심코드키
  const SECRET = "JBSWY3DPEHPK3PXD";
  // 생성한 QR URL : 중간에 이름을 설정할 수 있다.
  const qrUrl = "https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=200x200&chld=M|0&cht=qr&chl=otpauth://totp/achakeyAdmin.com%3Fsecret%3D" + SECRET;

  const inputRef = useRef();


  useEffect(() => {
    update();
  }, []);

  function timer() {
    // UTC 기준
    let epoch = Math.round(new Date().getTime() / 1000.0);
    console.log(epoch % 30);
    let countDown = 30 - (epoch % 30);
    if (epoch % 30 === 0) {
      updateOtp();
    }
    setCountDown(countDown);
  }

  function base32ToHex(base32) {
    const base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    let bits = "";
    let hex = "";

    for (let i = 0; i < base32.length; i++) {
      const val = base32chars.indexOf(base32.charAt(i).toUpperCase());
      bits += leftPad(val.toString(2), 5, '0');
    }

    for (let i = 0; i + 4 <= bits.length; i += 4) {
      const chunk = bits.substring(i, i + 4);
      hex = hex + parseInt(chunk, 2).toString(16);
    }
    return hex;
  }

  function leftPad(str, len, pad) {
    if (len + 1 >= str.length) {
      str = Array(len + 1 - str.length).join(pad) + str;
    }
    return str;
  }

  function updateOtp() {

    const key = base32ToHex(SECRET);
    const epoch = Math.round(new Date().getTime() / 1000.0);
    const time = leftPad(dec2hex(Math.floor(epoch / 30)), 16, '0');

    // updated for jsSHA v2.0.0 - http://caligatio.github.io/jsSHA/
    const shaObj = new jsSHA("SHA-1", "HEX");
    shaObj.setHMACKey(key, "HEX");
    shaObj.update(time);
    const hmac = shaObj.getHMAC("HEX");

    const offset = hex2dec(hmac.substring(hmac.length - 1));
    let otp = (hex2dec(hmac.substring(offset * 2, offset * 2 + 8)) & hex2dec('7fffffff')) + '';
    otp = (otp).substring(otp.length - 6, otp.length);
    setOtp(otp);
    console.log(otp);
  }

  function hex2dec(s) {
    // 받은 값을 16진수의 정수로 변환
    return parseInt(s, 16);
  }

  function dec2hex(s) {
    return (s < 15.5 ? '0' : '') + Math.round(s).toString(16);
  }

  function update() {
    updateOtp();
    setInterval(timer, 1000);
  }

  function compare() {
    otp === inputRef.current.value ? console.log('같음') : console.log('다름');
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={qrUrl} className="App-logo" alt="logo"/>
        <p>남은 시간 : {countDown}</p>
        <p>콘솔 확인</p>
      </header>
      <div>
        <input ref={inputRef}/>
        <button onClick={compare}>확인</button>
      </div>
    </div>
  );
}

export default Otp;


