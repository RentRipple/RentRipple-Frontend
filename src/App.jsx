import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppContent } from './views';
import {ContextProvider} from "./context/AppContext";
import routes from './routes';

function App() {
  return (
    <ContextProvider>
    <Router>
      <AppContent routes={routes} />
    </Router>
    </ContextProvider>
  );
}

export default App;
