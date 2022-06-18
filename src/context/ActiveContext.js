import React, { useContext, useState } from "react";
const ActiveContext = React.createContext();

export function useActive() {
  return useContext(ActiveContext);
}
export default function ActiveProivider({ children }) {
  const [active, setActive] = useState("");
  const value = {
    active,
    setActive,
  };
  return (
    <ActiveContext.Provider value={value}>{children}</ActiveContext.Provider>
  );
}
