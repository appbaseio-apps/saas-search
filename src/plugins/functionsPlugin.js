import { bellIcon, moonIcon, sunIcon } from "./icons";
import Suggestion from "./Suggestion";

const data = [
  {
    label: "/alert",
    description: "Throws a friendly alert",
    callback: (item) => alert(`An alert was triggered.`),
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
];

const functionsPlugin = {
  getSources({ query, setQuery }) {
    return [
      {
        sourceId: "functions",
        getItems() {
          return data.filter(({ label }) =>
            label.toLowerCase().includes(query.toLowerCase())
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
            item.callback(item);
            setQuery("");
          }
        },
      },
    ];
  },
};

export default functionsPlugin;
