import { useNavigate } from "react-router-dom";

import { ArticlePreviewList } from "../home/article-preview-list.jsx";
import { FeedPanel } from "../home/feed-panel.jsx";

import { cs } from "../../common/chain-services.js";
import { consumeContext } from "../../common/react/context.js";
import { EmptyFC } from "../../common/react/empty-fc.js";
import { Layout } from "../layout/layout.jsx";

export const Profile = () =>
  cs(
    consumeContext("auth"),
    consumeContext("apis"),
    ({}, next) => <Layout>{next()}</Layout>,
    ({}, next) => EmptyFC({ next }),
    ["navigate", ({}, next) => next(useNavigate())],
    ({ auth, navigate }) => {
      const tabs = [
        {
          key: "my-articles",
          label: "My Articles",
          // render: () => (
          //   <ArticlePreviewList
          //     key={"your-feed"}
          //     getData={apis.article.getMyFeed}
          //   />
          // ),
          //   render: () =>
          //     ArticlePreviewList({
          //       getData: apis.article.getMyFeed,
          //     }),
          render: () => "you don't have any your own articles yet",
        },
        {
          key: "favorited-articles",
          label: "Favorited Articles",
          // render: () => (
          //   <ArticlePreviewList
          //     key={"global-feed"}
          //     getData={apis.article.getGlobalFeed}
          //   />
          // ),
          //   render: () =>
          //     ArticlePreviewList({
          //       getData: apis.article.getGlobalFeed,
          //     }),
          render: () => "you don't have any favorited articles yet",
        },
      ];

      return (
        <div className="profile-page">
          <div className="user-info">
            <div className="container">
              <div className="row">
                <div className="col-xs-12 col-md-10 offset-md-1">
                  <img
                    // src="http://i.imgur.com/Qr71crq.jpg"
                    src={auth.user.image}
                    className="user-img"
                  />
                  <h4>{auth.user.username}</h4>
                  <p>{auth.user.bio}</p>
                  <button className="btn btn-sm btn-outline-secondary action-btn">
                    <i className="ion-plus-round"></i>
                    &nbsp; Follow {auth.user.username}
                  </button>
                  <button
                    className="btn btn-sm btn-outline-secondary action-btn"
                    onClick={() => {
                      navigate("/settings");
                    }}
                  >
                    <i className="ion-gear-a"></i>
                    &nbsp; Edit Profile Settings
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                {FeedPanel({ tabs, selectedTag: null })}
              </div>
            </div>
          </div>
        </div>
      );
    }
  );
