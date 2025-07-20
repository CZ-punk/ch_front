import React from 'react';
import './CoupleProfile.css';
import { useCouple } from '../../contexts/CoupleContext';

const CoupleProfile = () => {
  const { profile, couple } = useCouple();

  return (
    <div className="couple-profile">
      <h2>프로필</h2>
      <div className="profile-section">
        <img src={profile?.photo || '/default-profile.png'} alt="내 프로필" className="profile-photo" />
        <div>
          <div><b>닉네임:</b> {profile?.nickname || '-'}</div>
          <div><b>한 줄 소개:</b> {profile?.intro || '-'}</div>
          <div><b>생년월일:</b> {profile?.birth || '-'}</div>
          <div><b>관심사:</b> {profile?.interests?.join(', ') || '-'}</div>
        </div>
      </div>
      <h3>커플 정보</h3>
      <div className="profile-section">
        <img src={couple?.couplePhoto || '/default-couple.png'} alt="커플 사진" className="profile-photo" />
        <div>
          <div><b>커플명:</b> {couple?.coupleName || '-'}</div>
          <div><b>D-day:</b> {couple?.dday || '-'}</div>
          <div><b>공유 관심사:</b> {couple?.sharedInterests?.join(', ') || '-'}</div>
        </div>
      </div>
    </div>
  );
};

export default CoupleProfile; 