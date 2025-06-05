import { useNavigate, useLocation } from "react-router-dom";

import { cs } from "../../common/chain-services.js";
import { Layout } from "../layout/layout.jsx";
import { EmptyFC } from "../../common/react/empty-fc.js";
import { bindInput } from "../../common/react/bind-input.js";
import { scope } from "../../common/react/scope.js";
import { State } from "../../common/react/state.js";
import { consumeContext } from "../../common/react/context.js";
import { Load2 } from "../../common/react/load2.js";

export const ArticleForm = () => {
    return cs(
        consumeContext("apis"),
        ({}, next) => <Layout>{next()}</Layout>,
        ({}, next) => EmptyFC({ next }),
        ["navigate", ({}, next) => next(useNavigate())],
        ["location", ({}, next) => next(useLocation())],

        // prettier-ignore
        ["slug", ({ location }, next) => next(location.pathname.split("/").slice(-1)[0])],

        // prettier-ignore
        ["article", ({ apis, slug }, next) => Load2({
            _key: slug,
            fetch: async () =>  {
                const res = await apis.article.getSingleArticle({ slug });
                return res.article
            },
            // fetch:  () =>  apis.article.getSingleArticle({ slug }).then(res => res.article),
            next,
        })],

        ["errors", ({}, next) => State({ next })],
        ["isLoading", ({}, next) => State({ next })],
        ({ apis, navigate, article, errors, isLoading }) => {
            if (article.loading) {
                return (
                    <div className="editor-page">
                        <div className="container page">
                            <div className="row">
                                <div className="col-md-10 offset-md-1 col-xs-12">
                                    Loading....
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
            console.log(article.value);
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
                                                {...bindInput(
                                                    scope(article, ["title"])
                                                )}
                                            />
                                        </fieldset>
                                        <fieldset className="form-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="What's this article about?"
                                                {...bindInput(
                                                    scope(article, [
                                                        "description",
                                                    ])
                                                )}
                                            />
                                        </fieldset>
                                        <fieldset className="form-group">
                                            <textarea
                                                className="form-control"
                                                rows="8"
                                                placeholder="Write your article (in markdown)"
                                                {...bindInput(
                                                    scope(article, ["body"])
                                                )}
                                            ></textarea>
                                        </fieldset>
                                        <fieldset className="form-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter tags"
                                                {...bindInput(
                                                    scope(article, ["tagList"])
                                                )}
                                            />
                                            <div className="tag-list">
                                                <span className="tag-default tag-pill">
                                                    {" "}
                                                    <i className="ion-close-round"></i>{" "}
                                                    tag{" "}
                                                </span>
                                            </div>
                                        </fieldset>
                                        <button
                                            className="btn btn-lg pull-xs-right btn-primary"
                                            type="button"
                                            onClick={async (e) => {
                                                e.preventDefault();
                                                isLoading.onChange(true);
                                                let articleData = null;

                                                if (article.value.slug) {
                                                    // prettier-ignore
                                                    articleData = await apis.article.updateArticle(article?.value);
                                                } else {
                                                    // prettier-ignore
                                                    articleData = await apis.article.createArticle(article?.value);
                                                }

                                                if (articleData.errors) {
                                                    console.error(
                                                        articleData.errors
                                                    );
                                                    errors.onChange(
                                                        articleData.errors.body
                                                    );
                                                    isLoading.onChange(false);
                                                } else {
                                                    isLoading.onChange(false);
                                                    // prettier-ignore
                                                    navigate(`/article/${articleData.article.slug}`);
                                                }
                                            }}
                                        >
                                            {isLoading.value
                                                ? "Publishing..."
                                                : "Publish Article"}
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
