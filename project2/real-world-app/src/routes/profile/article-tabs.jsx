import { useLocation, Link } from "react-router-dom";

import { cs } from "../../common/chain-services";
import { consumeContext } from "../../common/react/context";
import { keyed } from "../../common/react/keyed";
import { EmptyFC } from "../../common/react/empty-fc";
import { cx1 } from "../../common/cx1";

import { ArticlePreviewList } from "../home/article-preview-list";

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

const Tabs = ({ tabs, isActive }) => {
    // prettier-ignore
    return cs(

        ({ }) => {
            const activeTab = tabs.find((tab, i) => isActive(tab, i));
            const renderItem = (tab, i) => {
                return (
                    <div
                        style={{ cursor: "pointer" }}
                        className={cx1("nav-link", {
                            active: isActive(tab, i),
                        })}
                        // onClick={() => {
                        //     onChange(i);
                        // }}
                    >
                        {tab.label}
                    </div>
                );
            };
            return (
                <>
                    <div className="feed-toggle">
                         <ul className="nav nav-pills outline-active">
                            {tabs.map((tab, i) => {
                                return (
                                    <li key={i} className="nav-item">
                                        {tab.renderLabel(renderItem(tab, i))}

                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {cs(keyed(activeTab.key), () => activeTab.render())}
                    {/* <Fragment key={activeTab.key}>{activeTab.render()}</Fragment> */}
                </>
            );
        }
    );
};
