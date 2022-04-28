import { bellIcon } from "./icons";

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
            return <Suggestion item={item} />;
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

function Suggestion({ item }) {
  return (
    <div className="aa-ItemWrapper">
      <div className="aa-ItemContent">
        <div className="aa-ItemIcon">{item.icon}</div>
        <div className="aa-ItemContentBody">
          <div className="aa-ItemContentTitle">
            <span>{item.label}</span>
          </div>
        </div>
      </div>
      <div className="aa-ItemActions">
        <button
          className="aa-ItemActionButton aa-DesktopOnly aa-ActiveOnly"
          type="button"
          title="Select"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M18.984 6.984h2.016v6h-15.188l3.609 3.609-1.406 1.406-6-6 6-6 1.406 1.406-3.609 3.609h13.172v-4.031z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default functionsPlugin;
