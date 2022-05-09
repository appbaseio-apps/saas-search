# SAAS search with `autocomplete.js`

A searchbar which can not only search for results but also perform tasks at your fingertips. Tasks such as toggling your theme to dark/light, searching the same on google, etc. It's not just a searchbar, it's a swiss army knife.

This demo is made using [autocomplete-suggestions-plugin](https://github.com/appbaseio/autocomplete-suggestions-plugin) and [autocomplete](https://github.com/algolia/autocomplete).

[You can watch a video preview on loom.](https://www.loom.com/share/bcfeab721f184fbdb832b00de9cc0693)

## Use cases

New users not familiar with the interface can get lost and not find features quickly. Help them by enabling discovery of features through search.

Users hate using the mouse. Eliminate the need to use the mouse by getting more done through the keyboard. Navigate pages without even having to click on a link.

If your site has a billion features then your users might not find the correct feature when they need it. Solve the problem of feature discovery through search.

## Using autocomplete-suggestion-plugin

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

In order to fetch results from **best-buy-dataset** index, we need to create a plugin using [**autocomplete-suggestions-plugin**.](https://github.com/appbaseio/autocomplete-suggestions-plugin)
We can pass the variables created above to the plugin and we are done.

```js
import createSuggestionsPlugin from "@appbaseio/autocomplete-suggestions-plugin";

const defaultUsagePlugin = createSuggestionPlugin(
  appbaseClientConfig,
  rsApiConfig
);
```

Make a plugin which displays results using custom UI.
![advanced usage plugin](/docs/assets/advancedUsagePlugin.png)

Use the plugins in autocomplete.
![Use plugins in autocomplete](/docs/assets/usage.png)

## Building locally

This guide assumes you have a node engine running on `v14` or similar and yarn package manager installed.

Install all dependencies by running `yarn` from project root.

Start the development server by running `yarn start`.

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
