import { cs } from "../../common/chain-services";
import { consumeContext } from "../../common/react/context";
import { State } from "../../common/react/state";

import { Tabs } from "./tab";
import { ArticlePreviewList } from "./article-preview-list";

export const FeedPanel = ({ selectedTag }) => {
    // prettier-ignore
    return cs(
        consumeContext("apis"),
        consumeContext("auth"),
        ["tabs", ({auth, apis}, next) => next([
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
                            getData: ({ page }) =>
                                apis.article.getMyFeed({ username: auth.user.username, page }),
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
            ].filter((v) => v))
        ],
        [
            "forcedIndex",
            ({tabs}, next) => {
                const forcedIndex = tabs.findIndex((tab) => tab.forced);
                return next(forcedIndex > -1 ? forcedIndex : null);
            },
        ],
        [
            "active",
            ({ forcedIndex, auth }, next) => State({ initValue: forcedIndex || auth.user ? 1 : 0, next }),
        ],
        ({  tabs, active, forcedIndex }) => {
            return Tabs({
                tabs,
            
                isActive: (tab, index) => {
                    const activeIndex = forcedIndex || active.value;
                    return index === activeIndex;
                },
                onChange: (i) => {
                    if (forcedIndex && i === forcedIndex) {
                        return;
                    }
                    active.onChange(i);
                    selectedTag.onChange(null);
                },
            });
        }
    );
};
