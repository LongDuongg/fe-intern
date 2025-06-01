import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { Pagination } from "./pagination";

import { cs } from "../../common/chain-services";
import { Load } from "../../common/react/load";
import { consumeContext } from "../../common/react/context";
import { EmptyFC } from "../../common/react/empty-fc";
import { formatDate } from "../../common/utils/date";
import { State } from "../../common/react/state";
import { parseUrlQuery } from "../../common/parse-url-query";

export const ArticlePreviewList = ({ getData }) => {
  return cs(
    consumeContext("apis"),
    consumeContext("auth"),
    // ({}, next) => EmptyFC({ next }),
    // ["location", (_, next) => next(useLocation())],
    // ["navigate", (_, next) => next(useNavigate())],
    // [
    //   "page",
    //   ({ location, navigate }, next) =>
    //     State({
    //       initValue: +(parseUrlQuery(location.search)?.page ?? 1),
    //       next: (state) =>
    //         next({
    //           value: state.value,
    //           onChange: (newPage) => {
    //             state.onChange(newPage);
    //             navigate("?page=" + newPage);
    //           },
    //         }),
    //     }),
    // ],
    ["page", ({}, next) => State({ initValue: 0, next })],
    [
      "feeds",
      ({ apis, auth, page }, next) =>
        Load({
          _key: page.value,
          fetch: async () => {
            return await getData({
              page: page.value,
            });
          },
          next,
        }),
    ],
    ({ page, feeds, apis, auth }) => {
      return (
        <>
          {feeds
            ? feeds?.articles?.map((article, i) => {
                return (
                  <div key={i} className="article-preview">
                    <div className="article-meta">
                      <NavLink to={`/profile/${article.author.username}`}>
                        <img src={article.author.image} />
                      </NavLink>
                      <div className="info">
                        <NavLink
                          to={`/profile/${article.author.username}`}
                          className="author"
                        >
                          {article.author.username}
                        </NavLink>
                        <span className="date">
                          {formatDate(article.createdAt)}
                        </span>
                      </div>
                      <button
                        className="btn btn-outline-primary btn-sm pull-xs-right"
                        onClick={async () => {
                          await apis.article.likeArticle({
                            slug: article.slug,
                          });
                          article.favoritesCount += 1;
                        }}
                      >
                        <i className="ion-heart"></i> {article.favoritesCount}
                      </button>
                    </div>
                    <NavLink
                      to={`/article/${article.slug}`}
                      className="preview-link"
                    >
                      <h1>{article.title}</h1>
                      <p>{article.description}</p>
                      <span>Read more...</span>
                      <ul className="tag-list">
                        {article.tagList.map((tag, i) => {
                          <li
                            key={i}
                            className="tag-default tag-pill tag-outline"
                          >
                            {tag}
                          </li>;
                        })}
                      </ul>
                    </NavLink>
                  </div>
                );
              })
            : `No articles found.`}

          {Pagination({ currentPage: page.value, onChange: page.onChange })}
        </>
      );
    }
  );
};
