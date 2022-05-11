import { autocomplete } from "@algolia/autocomplete-js";
import "@algolia/autocomplete-theme-classic";

import React, { createElement, Fragment, useEffect, useRef } from "react";
import { render } from "react-dom";

import functionsPlugin from "./plugins/functionsPlugin";
import gitHubReposPlugin from "./plugins/githubReposPlugin";
import defaultUsagePlugin from "./plugins/defaultUsagePlugin";
import advancedUsagePlugin from "./plugins/advancedUsagePlugin";

export function Autocomplete(props) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    // Initialize autocomplete on the newly created container
    const search = autocomplete({
      container: containerRef.current,
      placeholder: "Search",
      renderer: { createElement, Fragment, render }, //Needed for rendering with react
      plugins: [
        gitHubReposPlugin,
        functionsPlugin,
        defaultUsagePlugin,
        advancedUsagePlugin,
      ],
      ...props,
    });
    // Destroy the search instance in cleanup
    return () => {
      search.destroy();
    };
  }, [props]);

  return <div ref={containerRef} />;
}
