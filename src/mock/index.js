import Mock from "mockjs";
import qs from "qs";
Mock.setup({
  timeout: "300-600",
});
Mock.mock(/\/member\/collect/, "get", (params) => {
  const queryString = params.url.split("?")[1];
  const queryObj = qs.parse(queryString);
  let items = [];
  for (let i = 0; i < queryObj.pageSize; i++) {
    items.push(
      Mock.mock({
        id: "@id",
        picture:
          "https://yanxuan-item.nosdn.127.net/909d0d416a092228d10ee2752998385c.png",
        price: "@float(100,200,2,2)",
        desc: "@ctitle(4,10)",
        name: "@ctitle(4,20)",
      })
    );
  }
  return {
    msg: "获取收藏成功",
    result: {
      pageSize: +queryObj.pageSize,
      page: +queryObj.page,
      items,
    },
  };
});
