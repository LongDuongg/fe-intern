import { useLocation, Link } from "react-router-dom";

import { cs } from "../../common/chain-services";
import { consumeContext } from "../../common/react/context";
import { EmptyFC } from "../../common/react/empty-fc";

import { ArticlePreviewList } from "../home/article-preview-list";
import { Tabs } from "../home/tab";

export const ArticleTabs = ({ profile }) => {
    // prettier-ignore
    return cs(
        consumeContext("apis"),
        consumeContext("auth"),
        ({}, next) => EmptyFC({ next }),
        ["location", ({}, next) => next(useLocation())],
        [
            "tabs",
            ({ apis }, next) => {
                const username = profile.username;
                return next([
                    {
                        key: "my-articles",
                        label: "My Articles",
                        renderLabel: (children) => {
                            return (
                                <Link
                                    to={`/profile/${username}`}
                                    style={{ textDecoration: "none" }}
                                >
                                    {children}
                                </Link>
                            );
                        },
                        path: `/profile/${username}`,
                        render: () =>
                            ArticlePreviewList({
                                getData: ({ page }) => apis.article.getMyFeed({ username, page }),
                            }),
                    },
                    {
                        key: "favorited-articles",
                        label: "Favorited Articles",
                        renderLabel: (children) => {
                            return (
                                <Link
                                    to={`/profile/${username}/favorite`}
                                    style={{ textDecoration: "none" }}
                                >
                                    {children}
                                </Link>
                            );
                        },
                        path: `/profile/${username}/favorite`,
                        render: () =>
                            ArticlePreviewList({
                                getData: ({ page }) =>
                                    apis.article.getFavoritedArticles({ username, page }),
                            }),
                    },
                ]);
            },
        ],

        ({ tabs, location }) => {
            return Tabs({ tabs, isActive: (tab) => tab.path === location.pathname });
        }
    );
};
