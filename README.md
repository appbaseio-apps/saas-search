# SAAS search with `autocomplete.js`

A searchbar which can not only search for results but also perform tasks at your fingertips. Tasks such as toggling your theme to dark/light, searching the same on google, etc. It's not just a searchbar, it's a swiss army knife.

This demo is made using [autocomplete-suggestions-plugin](https://github.com/appbaseio/autocomplete-suggestions-plugin) and [autocomplete](https://github.com/algolia/autocomplete).

[You can watch a video preview on loom.](https://www.loom.com/share/bcfeab721f184fbdb832b00de9cc0693)

## Use cases

New users not familiar with the interface can get lost and not find features quickly. Help them by enabling discovery of features through search.

Users hate using the mouse. Eliminate the need to use the mouse by getting more done through the keyboard. Navigate pages without even having to click on a link.

If your site has a billion features then your users might not find the correct feature when they need it. Solve the problem of feature discovery through search.

## Using autocomplete-suggestion-plugin

### Configuration

First we make some config variables to use in the plugin. This details are available from your [appbase cluster.](https://docs.appbase.io/docs/reactivesearch/autocomplete-plugin/apireference/)

Below is appbase config with app(index), url and credentials. The `settings` field is optional.

```js
// appbase client config object
export const appbaseClientConfig = {
  url: "https://appbase-demo-ansible-abxiydt-arc.searchbase.io",
  app: "best-buy-dataset",
  credentials: "b8917d239a52:82a2f609-6439-4253-a542-3697f5545947",
  settings: {
    userId: "s@s",
    enableQueryRules: true,
    recordAnalytics: true,
  },
};
```

Below is **reactivesearch** config. It is similar to `props` you would pass to [`SearchBox` component.](https://docs.appbase.io/docs/reactivesearch/v3/search/searchbox/#props)

```js
export const rsApiConfig = {
  highlight: true,
  dataField: [
    {
      field: "name.autosuggest",
      weight: "1",
    },
    {
      field: "name",
      weight: "3",
    },
  ],
  enableRecentSuggestions: true,
  recentSuggestionsConfig: {
    size: 2,
    minHits: 2,
    minChars: 4,
    index: "best-buy-dataset",
  },
  enablePopularSuggestions: true,
  popularSuggestionsConfig: {
    size: 2,
    minChars: 3,
    minCount: 3,
    index: "best-buy-dataset",
  },
  index: "best-buy-dataset",
  size: 5,
};
```

### Default usage

In order to fetch results from **best-buy-dataset** index, we need to create a plugin using [**autocomplete-suggestions-plugin**.](https://github.com/appbaseio/autocomplete-suggestions-plugin)
We can pass the variables created above to the plugin and we are done.

```js
import createSuggestionsPlugin from "@appbaseio/autocomplete-suggestions-plugin";

const defaultUsagePlugin = createSuggestionPlugin(
  appbaseClientConfig,
  rsApiConfig
);
```

Then you can just pass it inside [`autocomplete.js`.](https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/).

```js
// Initialize autocomplete on the newly created container
const search = autocomplete({
  container: containerRef.current,
  placeholder: "Search",
  plugins: [defaultUsagePlugin],
});
```

You would get the suggestions on search.

### Advanced usage

We can customize the UI rendered for suggestions, actions when a suggestion is clicked. We can do so by passing a third parameter to `createSuggestionPlugin`.

If we want to customize how suggestions get rendered then we can pass a third parameter with a property `renderItem`. It would be called by `autocomplete-suggestion-plugin` with `props` similar to [template's item method in autocomplete.](https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/templates/#rendering-each-item).

```js
const advancedUsagePlugin = createSuggestionsPlugin(
  appbaseClientConfig,
  rsApiConfig,
  {
    //props would be similar to template's item method.
    renderItem: (props) => {
      const { item } = props;
      return (
        <div className="aa-item product-item" target="_blank" rel="noreferrer">
          <div className="product-image">
            <img
              src={
                item._source
                  ? item._source.image
                  : "https://m.media-amazon.com/images/I/81c83vd4O+L._SY879_.jpg"
              }
              alt={item.value}
            />
          </div>
          <div className="product-details">
            <h4>{item.value} (Promoted)</h4>
            <p>
              {item._source
                ? item._source.shortDescription
                : "Samsung offers latest smartphones with advanced technology and design. Buy 3G, 4G, dual sim smartphone at best prices in India."}
            </p>
          </div>
        </div>
      );
    },
  }
);
```

Similarly, for customizing the UI for header, footer and no suggestions, `autocomplete-suggestion-plugin` provides us with `renderHeader`, `renderFooter` and `renderNoSuggestions`. Their usage is below.

```js
const advancedUsagePlugin = createSuggestionsPlugin(
  appbaseClientConfig,
  rsApiConfig,
  {
    renderHeader: () => {
      return <div className="header">Product listings</div>;
    },
    renderFooter: (props) => {
      return <hr style={{ borderColor: "#d7d5f5" }} />;
    },
    renderNoResults: (props) => {
      if (props.state.query === "") {
        return <p>Search for something to get direct product suggestions!</p>;
      } else {
        return <p>No products found! Try searching for something else!</p>;
      }
    },
  }
);
```

We can also customize the action when a user clicks on one of the suggestion displayed. This can be done by passing a callback function as a property `onItemSelect`.

```js
const advancedUsagePlugin = createSuggestionsPlugin(
  appbaseClientConfig,
  rsApiConfig,
  {
    onItemSelect: (props) => {
      const {
        item: { url, label, type },
        setQuery,
        refresh,
      } = props;

      if (url) {
        window.open(url, "_blank");
      }
    },
  }
);
```

Similar to default usage, add the plugin to autocomplete.

```js
// Initialize autocomplete on the newly created container
const search = autocomplete({
  container: containerRef.current,
  placeholder: "Search",
  plugins: [advancedUsagePlugin],
});
```

## Github repos plugin

This is a custom plugin create using autocomplete. We have a static array as a data source. Each item is of the form

```js
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
];
```

The plugin is created as below. [`<Suggestion/>`](/blob/master/src/plugins/Suggestion.js) is a UI component for rendering suggestions.

```js
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
          header() {
            return <div className="header">Repositories</div>;
          },
          item({ item }) {
            return <Suggestion item={item} icon="#" />;
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
```

## Building locally

This guide assumes you have a node engine running on `v14` or similar and yarn package manager installed.

Install all dependencies by running `yarn` from project root.

Start the development server by running `yarn start`.

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
