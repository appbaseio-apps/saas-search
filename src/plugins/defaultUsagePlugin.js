import createSuggestionsPlugin from "@appbaseio/autocomplete-suggestions-plugin";
import JSONTreeView from "json-tree-view";

import { appbaseClientConfig, rsApiConfig } from "./config";
import { renderResults } from "./utils";

// default usage: plugin to fetch suggestions
export const defaultUsagePlugin = createSuggestionsPlugin(
  appbaseClientConfig,
  rsApiConfig,
  {
    renderHeader() {
      return <div className="header">Appbase search</div>;
    },
    onItemSelect: (props) => {
      const {
        item: { label },
        setQuery,
      } = props;

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
    },
  }
);
