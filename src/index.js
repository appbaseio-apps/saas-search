import React from "react";
import ReactDOM from "react-dom/client";

import "./App.css";
import { Autocomplete } from "./Autocomplete";

import gitHubReposPlugin from "./plugins/githubReposPlugin";

export default function App() {
  return (
    <div className="App">
      <Autocomplete
        openOnFocus={true}
        defaultActiveItemId={0}
        plugins={[gitHubReposPlugin]}
      />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
