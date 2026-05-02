import React, { useState } from "react";
import LoadingScreen from "./LoadingScreen";
import LandingPage from "./LandingPage";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <LandingPage />
      )}
    </>
  );
}

export default App;
