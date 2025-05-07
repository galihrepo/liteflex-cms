import React, { createContext, ReactNode, useContext } from "react";
import { configLoader } from "./configLoader";

const ConfigContext = createContext(configLoader());

export const useConfig = () => useContext(ConfigContext);

export const ConfigProvider = ({ children } : { children : ReactNode}) => {
  const config = configLoader();  
  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  );
};
