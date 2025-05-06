import React, { createContext, ReactNode, useContext } from "react";
import { configLoader } from "./configLoader";

const DealerContext = createContext(configLoader());

export const useDealer = () => useContext(DealerContext);

export const ConfigProvider = ({ children } : { children : ReactNode}) => {
  const config = configLoader();
  return (
    <DealerContext.Provider value={config}>
      {children}
    </DealerContext.Provider>
  );
};
