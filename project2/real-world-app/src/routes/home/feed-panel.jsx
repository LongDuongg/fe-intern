import { cs } from "../../common/chain-services";

import { TabHeader, Tabs } from "./tab";
import { ArticlePreviewList } from "./article-preview-list";
import { consumeContext } from "../../common/react/context";

export const FeedPanel = ({ selectedTag }) => {
  return cs(consumeContext("apis"), ({ apis }) => {
    const tabs = [
      {
        key: "your-feed",
        label: "Your Feed",
        // render: () => (
        //   <ArticlePreviewList
        //     key={"your-feed"}
        //     getData={apis.article.getMyFeed}
        //   />
        // ),
        render: () =>
          ArticlePreviewList({
            getData: apis.article.getMyFeed,
          }),
      },
      {
        key: "global-feed",
        label: "Global Feed",
        // render: () => (
        //   <ArticlePreviewList
        //     key={"global-feed"}
        //     getData={apis.article.getGlobalFeed}
        //   />
        // ),
        render: () =>
          ArticlePreviewList({
            getData: apis.article.getGlobalFeed,
          }),
      },
    ];

    if (selectedTag.value) {
      tabs.push({
        key: `${selectedTag.value}`,
        label: `#${selectedTag.value}`,
        render: () =>
          ArticlePreviewList({
            getData: ({ page }) =>
              apis.article.getFeedByTag({ page, tag: selectedTag.value }),
          }),
        forced: true,
      });
    }

    return Tabs({
      tabs,
      initActive: 1,
      onChangeTab: () => {
        selectedTag.onChange(null);
      },
    }); // 1 is the index for "Global Feed"
  });
};
