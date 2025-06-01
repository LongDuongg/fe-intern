import { useNavigate, useLocation } from "react-router-dom";

import { Layout } from "../layout/layout.jsx";

import { cs } from "../../common/chain-services.js";
import { EmptyFC } from "../../common/react/empty-fc.js";
import { consumeContext } from "../../common/react/context.js";
import { Load } from "../../common/react/load.js";
import { formatDate } from "../../common/utils/date.js";

export const Article = () => {
  return cs(
    consumeContext("apis"),
    consumeContext("auth"),
    ({}, next) => <Layout>{next()}</Layout>,
    ({}, next) => EmptyFC({ next }),
    ["navigate", ({}, next) => next(useNavigate())],
    ["location", ({}, next) => next(useLocation())],
    [
      "slug",
      ({ location }, next) => next(location.pathname.split("/").slice(-1)[0]),
    ],
    [
      "article",
      ({ apis, slug }, next) =>
        Load({
          _key: slug,
          fetch: async () => await apis.article.getSingleArticle({ slug }),
          next,
        }),
    ],
    ({ apis, auth, navigate, article }) => {
      console.log(article);
      return (
        <div className="article-page">
          <div className="banner">
            <div className="container">
              <h1>{article?.article?.title}</h1>

              <div className="article-meta">
                <a href={`/profile/${article?.article?.author?.username}`}>
                  <img src={article?.article?.author?.image} />
                </a>
                <div className="info">
                  <a href="/profile/eric-simons" className="author">
                    {article?.article?.author?.username}
                  </a>
                  <span className="date">
                    {formatDate(article?.article?.createdAt)}
                  </span>
                </div>

                {article?.article?.author?.username === auth.user?.username ? (
                  <>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => navigate("/editor/234234fdsdaf")}
                    >
                      <i className="ion-edit"></i> Edit Article
                    </button>
                    &nbsp;&nbsp;
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={async () => {
                        await apis.article.deleteArticle("slug here");
                      }}
                    >
                      <i className="ion-trash-a"></i> Delete Article
                    </button>
                  </>
                ) : (
                  <>
                    <button className="btn btn-sm btn-outline-secondary">
                      <i className="ion-plus-round"></i>
                      &nbsp; Follow {article?.article?.author?.username}{" "}
                      <span className="counter">
                        ({article?.article?.author?.followersCount})
                      </span>
                    </button>
                    &nbsp;&nbsp;
                    <button className="btn btn-sm btn-outline-primary">
                      <i className="ion-heart"></i>
                      &nbsp; Favorite Post{" "}
                      <span className="counter">
                        ({article?.article?.favoritesCount})
                      </span>
                    </button>
                    &nbsp;&nbsp;
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="container page">
            <div className="row article-content">
              <div className="col-md-12">
                <p>{article?.article?.body}</p>
                <p>{article?.article?.description}</p>
                <ul className="tag-list">
                  {article?.article?.tagList?.map((tag, i) => (
                    <li key={i} className="tag-default tag-pill tag-outline">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <hr />

            <div className="row">
              <div className="col-xs-12 col-md-8 offset-md-2">
                <form className="card comment-form">
                  <div className="card-block">
                    <textarea
                      className="form-control"
                      placeholder="Write a comment..."
                      rows="3"
                    ></textarea>
                  </div>
                  <div className="card-footer">
                    <img
                      src="http://i.imgur.com/Qr71crq.jpg"
                      className="comment-author-img"
                    />
                    <button className="btn btn-sm btn-primary">
                      Post Comment
                    </button>
                  </div>
                </form>

                <div className="card">
                  <div className="card-block">
                    <p className="card-text">
                      With supporting text below as a natural lead-in to
                      additional content.
                    </p>
                  </div>
                  <div className="card-footer">
                    <a href="/profile/author" className="comment-author">
                      <img
                        src="http://i.imgur.com/Qr71crq.jpg"
                        className="comment-author-img"
                      />
                    </a>
                    &nbsp;
                    <a href="/profile/jacob-schmidt" className="comment-author">
                      Jacob Schmidt
                    </a>
                    <span className="date-posted">Dec 29th</span>
                    <span className="mod-options">
                      <i className="ion-trash-a"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  );
};
