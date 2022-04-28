import React from "react";
import ReactDOM from "react-dom/client";

import { Autocomplete } from "./Autocomplete";

import "./App.css";
import "../node_modules/json-tree-view/devtools.css";

import functionsPlugin from "./plugins/functionsPlugin";
import gitHubReposPlugin from "./plugins/githubReposPlugin";
import { defaultUsagePlugin } from "./plugins/defaultUsagePlugin";

export default function App() {
  return (
    <div className="App">
      <Autocomplete
        openOnFocus={true}
        defaultActiveItemId={0}
        plugins={[gitHubReposPlugin, functionsPlugin, defaultUsagePlugin]}
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
