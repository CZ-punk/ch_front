import React, { useState } from 'react';
import './CoupleConnect.css';
import { useCouple } from '../../contexts/CoupleContext';

const CoupleConnect = () => {
  const { isConnected, setIsConnected, couple, setCouple } = useCouple();
  const [code, setCode] = useState('');
  const [myCode] = useState(() => Math.random().toString(36).substring(2, 8).toUpperCase());
  const [status, setStatus] = useState('');

  const handleConnect = () => {
    // 실제로는 서버에 코드 전송 및 연결 요청
    setStatus('연결 요청 전송됨! 상대방이 수락하면 연결됩니다.');
    // setIsConnected(true); // 실제 연결 성공 시
  };

  return (
    <div className="couple-connect">
      <h2>커플 연결</h2>
      {isConnected ? (
        <div>
          <p>커플이 연결되었습니다!</p>
          <p>커플명: {couple?.coupleName}</p>
        </div>
      ) : (
        <>
          <div className="my-code-box">
            <span>내 커플 코드: <b>{myCode}</b></span>
            <button onClick={() => navigator.clipboard.writeText(myCode)}>복사</button>
          </div>
          <div className="connect-form">
            <input
              type="text"
              placeholder="상대방 코드 입력"
              value={code}
              onChange={e => setCode(e.target.value.toUpperCase())}
              maxLength={8}
            />
            <button onClick={handleConnect}>연결 요청</button>
          </div>
          {status && <p className="status-msg">{status}</p>}
        </>
      )}
    </div>
  );
};

export default CoupleConnect; 