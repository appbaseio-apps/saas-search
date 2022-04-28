import { autocomplete } from "@algolia/autocomplete-js";
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
      ...props,
    });
    // Destroy the search instance in cleanup
    return () => {
      search.destroy();
    };
  }, [props]);

  return <div ref={containerRef} />;
}
