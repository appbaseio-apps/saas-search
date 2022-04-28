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
            return item.label;
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

export default gitHubReposPlugin;
