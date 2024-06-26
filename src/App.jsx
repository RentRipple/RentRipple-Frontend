import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppContent } from "./views";
import { ContextProvider } from "./context/AppContext";
import { ProfileContextProvider } from "./context/ProfileContext";
import routes from "./routes";

function App() {
  return (
    <Router>
      <ContextProvider>
        <ProfileContextProvider>
          <AppContent routes={routes} />
        </ProfileContextProvider>
      </ContextProvider>
    </Router>
  );
}

export default App;
