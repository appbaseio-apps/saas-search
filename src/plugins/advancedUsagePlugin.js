import createSuggestionsPlugin from "@appbaseio/autocomplete-suggestions-plugin";
import JSONTreeView from "json-tree-view";

import { appbaseClientConfig, rsApiConfig } from "./config";
import { renderResults } from "./utils";

// advanced usage: plugin to fetch suggestions and
// render custom ui for header, footer and suggestion items
const advancedUsagePlugin = createSuggestionsPlugin(
  {
    ...appbaseClientConfig,
    settings: {
      ...appbaseClientConfig.settings,
      enableQueryRules: false,
    },
  },
  {
    ...rsApiConfig,
    enableRecentSuggestions: false,
    enablePopularSuggestions: false,
  },
  {
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
    onItemSelect: (props) => {
      const {
        item: { url, label, type },
        setQuery,
        refresh,
      } = props;

      if (url) {
        window.open(url, "_blank");
      } else if (type === "index") {
        setQuery(label.replace(/(<([^>]+)>)/gi, ""));
        renderResults(
          {
            value: label.replace(/(<([^>]+)>)/gi, ""),
            url: appbaseClientConfig.url,
            app: appbaseClientConfig.app,
            credentials: appbaseClientConfig.credentials,
            settings: appbaseClientConfig.settings,
            query: {
              dataField: rsApiConfig.dataField,
            },
          },
          JSONTreeView
        );
        refresh();
      }
    },
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

export default advancedUsagePlugin;
