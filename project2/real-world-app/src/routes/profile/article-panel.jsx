import { cs } from "../../common/chain-services";
import { Tabs } from "../home/tab";
import { ArticlePreviewList } from "../home/article-preview-list";
import { consumeContext } from "../../common/react/context";

export const ArticlePanel = () => {
    // prettier-ignore
    return cs(
        consumeContext("apis"),
        consumeContext("auth"),
        ({ apis, auth }) => {
            const tabs = [
                {
                    key: "my-articles",
                    label: "My Articles",
                    render: () =>
                        ArticlePreviewList({
                            getData: ({ page }) => apis.article.getMyFeed({ 
                                username: auth.user.username, 
                                page 
                            }),
                        }),
                },
                {
                    key: "favorited-articles",
                    label: "Favorited Articles",
                    render: () =>
                        ArticlePreviewList({
                            getData: ({ page }) => apis.article.getFavoritedArticles({ 
                                username: auth.user.username, 
                                page 
                            }),
                        }),
                },
            ];

            return Tabs({ tabs, initActive: 0, onChangeTab: () => {} });
        }
    );
};
