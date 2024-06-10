import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppContent } from './views';

import routes from './routes';

function App() {
  return (
    <Router>
      <AppContent routes={routes} />
    </Router>
  );
}

export default App;
