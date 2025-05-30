import { cs } from "../../common/chain-services";

import { Tabs } from "./tab";
import { ArticlePreviewList } from "./article-preview-list";
import { consumeContext } from "../../common/react/context";

export const FeedPanel = ({ tabs, selectedTag }) => {
  return cs(consumeContext("apis"), ({ apis }) => {
    if (selectedTag?.value) {
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
        selectedTag?.onChange(null);
      },
    });
  });
};
