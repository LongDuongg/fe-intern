import { cs } from "../../common/chain-services";

import { Tabs } from "./tab";
import { ArticlePreviewList } from "./article-preview-list";
import { consumeContext } from "../../common/react/context";

export const FeedPanel = ({ selectedTag }) => {
  return cs(
    consumeContext("apis"),
    consumeContext("auth"),
    ({ apis, auth }) => {
      const tabs = [
        auth.user && {
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
        selectedTag.value && {
          key: `${selectedTag.value}`,
          label: `#${selectedTag.value}`,
          render: () =>
            ArticlePreviewList({
              getData: ({ page }) =>
                apis.article.getFeedByTag({ page, tag: selectedTag.value }),
            }),
          forced: true,
        },
      ].filter((v) => v);

      return Tabs({
        tabs,
        initActive: auth.user ? 1 : 0,
        onChangeTab: () => {
          selectedTag.onChange(null);
        },
      });
    }
  );
};
