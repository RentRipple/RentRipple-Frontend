import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppContent } from "./views";
import { ContextProvider } from "./context/AppContext";
import { ProfileContextProvider } from "./context/ProfileContext";
import routes from "./routes";
import { PropertyContextProvider } from "./context/PropertyContext";

function App() {
  return (
    <Router>
      <ContextProvider>
        <ProfileContextProvider>
          <PropertyContextProvider>
            <AppContent routes={routes} />
          </PropertyContextProvider>
        </ProfileContextProvider>
      </ContextProvider>
    </Router>
  );
}

export default App;
