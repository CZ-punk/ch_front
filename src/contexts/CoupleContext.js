import React, { createContext, useContext, useState } from 'react';

const CoupleContext = createContext();

export const useCouple = () => useContext(CoupleContext);

export const CoupleProvider = ({ children }) => {
  const [profile, setProfile] = useState(null); // {nickname, photo, intro, birth, interests}
  const [couple, setCouple] = useState(null);   // {coupleName, couplePhoto, dday, sharedInterests, ...}
  const [isConnected, setIsConnected] = useState(false);

  return (
    <CoupleContext.Provider value={{
      profile, setProfile,
      couple, setCouple,
      isConnected, setIsConnected
    }}>
      {children}
    </CoupleContext.Provider>
  );
}; 