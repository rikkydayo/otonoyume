const { google } = require("googleapis");
const fetch = require("node-fetch");
const { env } = require("process");

(async () => {
  //取得準備
  const client = await google.auth.getClient({
    keyFile: "./keys.json",
    scopes: "https://www.googleapis.com/auth/analytics.readonly",
  });
  const reporting = await google.analyticsreporting({
    version: "v4",
    auth: client,
  });

  //ランキング取得
  const response = await reporting.reports.batchGet({
    requestBody: {
      reportRequests: [
        {
          viewId: "201161107",
          dateRanges: [{ startDate: "8daysAgo", endDate: "1daysAgo" }],
          metrics: [{ expression: "ga:pageviews" }],
          dimensions: [{ name: "ga:pagePath" }],
          orderBys: [{ fieldName: "ga:pageviews", sortOrder: "DESCENDING" }],
          pageSize: 30,
        },
      ],
    },
  });
  console.log(JSON.stringify(response.data, null, 2));

  //コンテンツID一覧を抽出
  const rankedPaths = response.data.reports[0].data.rows.map(
    (row) => row.dimensions[0]
  );
  const maybeContentIds = rankedPaths
    .map((path) => path.split("/")[1])
    .filter((v) => v);

  //microCMSへのPATCH
  const result = await fetch(
    "https://9l39mwdgok.microcms.io/api/v1/popular-bs",
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-MICROCMS-API-KEY": process.env.API_KEY,
      },
      body: JSON.stringify({ articles: maybeContentIds }),
    }
  );
  console.log(await result.json());
})();