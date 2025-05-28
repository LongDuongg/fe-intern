import { cs } from "../../common/chain-services";

import { TabHeader, Tabs } from "./tab";
import { ArticlePreviewList } from "./article-preview-list";

export const FeedPanel = () => {
  return cs(({}) => {
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
      //   {
      //     label: `#${"any tag"}`,
      //     render: () => {},
      //   },
    ];
    return Tabs({ tabs, initActive: 1 });
  });
};
