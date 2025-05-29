import { cs } from "../../common/chain-services";

import { TabHeader, Tabs } from "./tab";
import { ArticlePreviewList } from "./article-preview-list";

export const FeedPanel = ({ selectedTag }) => {
  return cs(consumeContext("apis"), ({ apis }) => {
    const tabs = [
      {
        key: "your-feed",
        label: "Your Feed",
        //   render: () => ArticlePreviewList({ activeTab }),
        render: () => "Your Feed is not implemented yet.",
      },
      {
        key: "global-feed",
        label: "Global Feed",
        //   render: () => ArticlePreviewList({ activeTab }),
        render: () => "Global Feed is not implemented yet.",
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
