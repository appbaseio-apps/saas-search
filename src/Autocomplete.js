import { autocomplete } from "@algolia/autocomplete-js";
import "@algolia/autocomplete-theme-classic";
import { useEffect, useRef } from "react";

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
      ...props,
    });
    // Destroy the search instance in cleanup
    return () => {
      search.destroy();
    };
  }, [props]);

  return <div ref={containerRef} />;
}
