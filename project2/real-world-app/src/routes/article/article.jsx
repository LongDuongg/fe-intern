import { useNavigate, useLocation } from "react-router-dom";

import { Layout } from "../layout/layout.jsx";
import { CardComment } from "./card-comment.jsx";
import { CommentForm } from "./comment-form.jsx";

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
                      onClick={() =>
                        navigate(`/editor/${article?.article?.slug}`)
                      }
                    >
                      <i className="ion-edit"></i> Edit Article
                    </button>
                    &nbsp;&nbsp;
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={async () => {
                        await apis.article.deleteArticle({
                          slug: article?.article?.slug,
                        });
                        navigate("/");
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
                <CommentForm />
                <CardComment />
              </div>
            </div>
          </div>
        </div>
      );
    }
  );
};
