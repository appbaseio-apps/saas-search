export const renderResults = (
  { value, url, app, credentials, settings, query },
  JSONTreeView
) => {
  const resultStatsElement = document.getElementById("results-stats");
  const resultElement = document.getElementById("result");

  fetch(`${url}/${app}/_reactivesearch.v3`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Basic ${btoa(credentials)}`,
    },
    body: JSON.stringify({
      settings,
      query: [
        {
          id: "search",
          type: "search",
          ...query,
          value,
        },
      ],
    }), // body data type must match "Content-Type" header
  })
    .then((res) => res.json())
    .then((data) => {
      const responseData = data.search;

      if (responseData?.hits?.total?.value) {
        resultStatsElement.style.display = "block";
        // setting results stats
        resultStatsElement.innerHTML = `Displaying ${responseData?.hits?.hits.length} results, of ${responseData.hits.total.value} results found in ${responseData.took} ms`;
      } else {
        resultStatsElement.style.display = "none";
      }
      if (Array.isArray(responseData?.hits?.hits)) {
        resultElement.style.display = "block";
        resultElement.innerHTML = "";
        var jsonView = new JSONTreeView("Results", [
          ...responseData?.hits?.hits,
        ]);
        jsonView.readonly = true;
        jsonView.expand(true);
        var textnode = document.createTextNode("No Results Found");
        // setting results json
        resultElement.appendChild(
          Object.keys(responseData?.hits?.hits).length ? jsonView.dom : textnode
        );
      } else {
        resultElement.style.display = "none";
      }
    })
    .catch((err) => {
      console.error(err);
    });
};
