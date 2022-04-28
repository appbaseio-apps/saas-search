import { bellIcon, googleIcon, moonIcon, sunIcon } from "./icons";
import Suggestion from "./Suggestion";

const data = [
  {
    label: "/alert",
    description: "Throws a friendly alert",
    callback: (query) => alert(`An alert was triggered.`),
    icon: bellIcon,
    matchAny: false,
  },
  {
    label: "/dark",
    description: "Enable dark mode",
    callback: () => {
      const bodyElement = document.querySelector("body");
      bodyElement.classList.add("dark");
    },
    icon: moonIcon,
    matchAny: false,
  },
  {
    label: "/light",
    description: "Enable light mode",
    callback: () => {
      const bodyElement = document.querySelector("body");
      bodyElement.classList.remove("dark");
    },
    icon: sunIcon,
    matchAny: false,
  },
  {
    label: "Search on Google",
    description: "Google search in new window",
    callback: (query) => {
      const queryParam = query.replace(" ", "+");
      //Open in new window
      window.open(`https://www.google.com/search?q=${queryParam}`, "_blank");
    },
    icon: googleIcon,
    matchAny: true,
  },
];

const functionsPlugin = {
  getSources({ query, setQuery }) {
    return [
      {
        sourceId: "functions",
        getItems() {
          return data.filter(
            ({ label, matchAny }) =>
              label.toLowerCase().includes(query.toLowerCase()) || matchAny
          );
        },
        templates: {
          header() {
            return <div className="header">Functions</div>;
          },
          item({ item }) {
            return <Suggestion item={item} icon={item.icon} />;
          },
          noResults() {
            return "No results";
          },
        },
        onSelect({ item }) {
          if (typeof item.callback === "function") {
            item.callback(query);
            setQuery("");
          }
        },
      },
    ];
  },
};

export default functionsPlugin;
