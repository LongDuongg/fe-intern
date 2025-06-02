import { useNavigate, useLocation } from "react-router-dom";

import { cs } from "../../common/chain-services.js";
import { Layout } from "../layout/layout.jsx";
import { EmptyFC } from "../../common/react/empty-fc.js";
import { bindInput } from "../../common/react/bind-input.js";
import { scope } from "../../common/react/scope.js";
import { State } from "../../common/react/state.js";
import { consumeContext } from "../../common/react/context.js";
import { Load } from "../../common/react/load.js";

export const ArticleForm = () => {
  return cs(
    consumeContext("apis"),
    ({}, next) => <Layout>{next()}</Layout>,
    ({}, next) => EmptyFC({ next }),
    ["navigate", ({}, next) => next(useNavigate())],
    ["location", ({}, next) => next(useLocation())],
    [
      "slug",
      ({ location }, next) => next(location.pathname.split("/").slice(-1)[0]),
    ],
    [
      "selectedArticle",
      ({ apis, slug }, next) =>
        Load({
          _key: slug,
          fetch: async () => await apis.article.getSingleArticle({ slug }),
          next,
        }),
    ],
    [
      "state",
      ({ selectedArticle }, next) =>
        State({
          initValue:
            {
              title: selectedArticle?.article?.title,
              description: selectedArticle?.article?.description,
              body: selectedArticle?.article?.body,
              tagList: selectedArticle?.article?.tagList,
            } || null,
          next,
        }),
    ],
    ["errors", ({}, next) => State({ next })],
    ["isLoading", ({}, next) => State({ next })],
    ({ apis, navigate, state, errors, isLoading }) => {
      return (
        <div className="editor-page">
          <div className="container page">
            <div className="row">
              <div className="col-md-10 offset-md-1 col-xs-12">
                {errors?.value && (
                  <ul className="error-messages">
                    {errors?.value.map((error, i) => (
                      <li key={i}>{error}</li>
                    ))}
                  </ul>
                )}

                <form>
                  <fieldset>
                    <fieldset className="form-group">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Article Title"
                        {...bindInput(scope(state, ["title"]))}
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="What's this article about?"
                        {...bindInput(scope(state, ["description"]))}
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <textarea
                        className="form-control"
                        rows="8"
                        placeholder="Write your article (in markdown)"
                        {...bindInput(scope(state, ["body"]))}
                      ></textarea>
                    </fieldset>
                    <fieldset className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter tags"
                        {...bindInput(scope(state, ["tagList"]))}
                      />
                      <div className="tag-list">
                        <span className="tag-default tag-pill">
                          {" "}
                          <i className="ion-close-round"></i> tag{" "}
                        </span>
                      </div>
                    </fieldset>
                    <button
                      className="btn btn-lg pull-xs-right btn-primary"
                      type="button"
                      onClick={async (e) => {
                        e.preventDefault();
                        isLoading.onChange(true);
                        const articleData = await apis.article.createArticle(
                          state?.value
                        );
                        if (articleData.errors) {
                          console.error(articleData.errors);
                          errors.onChange(articleData.errors.body);
                          isLoading.onChange(false);
                        } else {
                          navigate("/article/fasdf");
                        }
                      }}
                    >
                      {isLoading.value ? "Publishing..." : "Publish Article"}
                    </button>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
  );
};
