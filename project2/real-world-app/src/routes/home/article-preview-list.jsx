import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { Pagination } from "./pagination";

import { cs } from "../../common/chain-services";
import { Load2 } from "../../common/react/load2";
import { consumeContext } from "../../common/react/context";
import { EmptyFC } from "../../common/react/empty-fc";
import { formatDate } from "../../common/utils/date";
import { State } from "../../common/react/state";
import { parseUrlQuery } from "../../common/parse-url-query";
import { LikeButton } from "./like-button";

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
        Load2({
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
      if (feeds.loading) {
        return "Loading...";
      }

      if (feeds.value?.errors) {
        return (
          <div style={{ color: "red", marginTop: "10px" }}>
            {feeds.value.errors.body[0]}
          </div>
        );
      }

      if (!feeds.value.articles?.length) {
        return "No data";
      }

      return (
        <>
          {feeds.value.articles?.map((article, i) => {
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
                  {LikeButton({
                    article,
                    onChange: async (updatedArticle) => {
                      feeds.onChange({
                        ...feeds.value,
                        articles: feeds.value.articles.map((a) =>
                          a.slug === updatedArticle.slug ? updatedArticle : a
                        ),
                      });
                    },
                  })}
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
                      <li key={i} className="tag-default tag-pill tag-outline">
                        {tag}
                      </li>;
                    })}
                  </ul>
                </NavLink>
              </div>
            );
          })}

          {Pagination({ currentPage: page.value, onChange: page.onChange })}
        </>
      );
    }
  );
};
