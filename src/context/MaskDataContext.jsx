import React, { createContext, useState, useContext } from "react";

const MaskDataContext = createContext();

export const useMaskData = () => useContext(MaskDataContext);

export const MaskDataProvider = ({ children }) => {
  const [maskData, setMaskData] = useState({
    root_count: 0,
    average_root_diameter: 0,
    total_root_length: 0,
    total_root_area: 0,
    total_root_volume: 0,
  });
  return (
    <MaskDataContext.Provider value={{ maskData, setMaskData }}>
      {children}
    </MaskDataContext.Provider>
  );
};
