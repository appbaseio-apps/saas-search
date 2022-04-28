import { bellIcon } from "./icons";
import Suggestion from "./Suggestion";

const data = [
  {
    label: "/alert",
    description: "Throws a friendly alert",
    callback: (item) => alert(`An alert was triggered.`),
    icon: bellIcon,
    matchAny: true,
  },
];

const functionsPlugin = {
  getSources({ query }) {
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
          if (typeof item.callback === "function") item.callback(item);
        },
      },
    ];
  },
};

export default functionsPlugin;
