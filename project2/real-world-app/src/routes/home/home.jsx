import { TagPanel } from "./tag-panel.jsx";
import { Layout } from "../layout/layout.jsx";
import { FeedPanel } from "./feed-panel.jsx";
import { ArticlePreviewList } from "./article-preview-list.jsx";

import { cs } from "../../common/chain-services.js";
import { State } from "../../common/react/state.js";
import { consumeContext } from "../../common/react/context.js";

export const Home = () => {
  return cs(
    consumeContext("apis"),
    ({}, next) => <Layout>{next()}</Layout>,
    ["selectedTag", ({}, next) => State({ initValue: null, next })],
    ({ apis, selectedTag }) => {
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

      return (
        <div className="home-page">
          <div className="banner">
            <div className="container">
              <h1 className="logo-font">conduit</h1>
              <p>A place to share your knowledge.</p>
            </div>
          </div>

          <div className="container page">
            <div className="row">
              <div className="col-md-9">{FeedPanel({ tabs, selectedTag })}</div>

              <div className="col-md-3">
                {TagPanel({ title: "Popular Tags", selectedTag })}
              </div>
            </div>
          </div>
        </div>
      );
    }
  );
};
