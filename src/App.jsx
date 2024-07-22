import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppContent } from "./views";
import { ContextProvider } from "./context/AppContext";
import { ProfileContextProvider } from "./context/ProfileContext";
import routes from "./routes";
import { PropertyContextProvider } from "./context/PropertyContext";
import { SocketContextProvider } from "./context/ChatContext";

function App() {
  return (
    <Router>
            <ContextProvider>

      <SocketContextProvider>
        <ProfileContextProvider>
          <PropertyContextProvider>
            <AppContent routes={routes} />
          </PropertyContextProvider>
        </ProfileContextProvider>
      </SocketContextProvider>
      </ContextProvider>

    </Router>
  );
}

export default App;
