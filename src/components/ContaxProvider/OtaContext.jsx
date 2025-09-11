import React, { createContext, useContext, useState } from "react";

const OtaContext = createContext({
  selectedOta: "",
  changeOta: () => {}
});

export function OtaProvider({ children }) {
  const [selectedOta, setSelectedOta] = useState("");

  // dedicated updater function
  const changeOta = (ota) => {
    console.log("OTA changed:", ota);
    setSelectedOta(ota);
  };

  return (
    <OtaContext.Provider value={{ selectedOta, changeOta }}>
      {children}
    </OtaContext.Provider>
  );
}

export function useOta() {
  const context = useContext(OtaContext);
  if (context === undefined) {
    throw new Error("useOta must be used within an OtaProvider");
  }
  return context;
}


function OtaControls() {
  const { selectedOta, changeOta } = useOta();
  return (
    <div>
      <p>Current OTA: {selectedOta || "None selected"}</p>
      <button onClick={() => changeOta("Booking.com")}>Booking.com</button>
      <button onClick={() => changeOta("Expedia")}>Expedia</button>
    </div>
  );
}

function OtaSelector() {
  return (
    <OtaProvider>
      <OtaControls />
    </OtaProvider>
  );
}


export default function App() {
  return <OtaSelector />;
}
