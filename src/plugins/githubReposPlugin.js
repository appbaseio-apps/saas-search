const data = [
  {
    label: "@appbaseio/autocomplete-suggestions-plugin (Same tab)",
    description:
      "An appbase.io suggestions plugin for autocomplete.js library from Algolia",
    link: {
      target: "_self",
      url: "https://github.com/appbaseio/autocomplete-suggestions-plugin",
    },
  },
  {
    label: "@appbaseio/autocomplete-suggestions-plugin (New tab)",
    description:
      "An appbase.io suggestions plugin for autocomplete.js library from Algolia",
    link: {
      target: "_blank",
      url: "https://github.com/appbaseio/autocomplete-suggestions-plugin",
    },
  },
  {
    label: "@algolia/autocomplete (Same tab)",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    link: {
      target: "_self",
      url: "https://github.com/algolia/autocomplete",
    },
  },
  {
    label: "@algolia/autocomplete (New tab)",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    link: {
      target: "_blank",
      url: "https://github.com/algolia/autocomplete",
    },
  },
];

const gitHubReposPlugin = {
  getSources({ query }) {
    return [
      {
        sourceId: "github-repos",
        getItems() {
          return data.filter(({ label }) =>
            label.toLowerCase().includes(query.toLowerCase())
          );
        },
        templates: {
          item({ item }) {
            return <Suggestion item={item} />;
          },
          noResults() {
            return "No results";
          },
        },
        onSelect({ item }) {
          if (item.link.url) window.open(item.link.url, item.link.target);
        },
      },
    ];
  },
};

function Suggestion({ item }) {
  return (
    <div className="aa-ItemWrapper">
      <div className="aa-ItemContent">
        <div className="aa-ItemIcon">#</div>
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

export default gitHubReposPlugin;
