import { useNavigate, useParams } from "react-router-dom";

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
        ["params", ({}, next) => next(useParams())],

        // prettier-ignore
        ["article", ({ apis, params }, next) => {
            if (params.slug) {
                return Load2({
                    _key: params.slug,
                    fetch: async () => {
                        const res = await apis.article.getSingleArticle({ slug: params.slug });
                        return res.article;
                    },
                    // fetch:  () =>  apis.article.getSingleArticle({ slug }).then(res => res.article),
                    next,
                });
            }
            return State({ next });
        }],

        ["errors", ({}, next) => State({ next })],
        ["isLoading", ({}, next) => State({ next })],
        ({ apis, navigate, article, errors, isLoading }) => {
            if (article.loading) {
                return (
                    <div className="editor-page">
                        <div className="container page">
                            <div className="row">
                                <div className="col-md-10 offset-md-1 col-xs-12">Loading....</div>
                            </div>
                        </div>
                    </div>
                );
            }
            console.log(article.value?.tagList);
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
                                                {...bindInput(scope(article, ["title"]))}
                                            />
                                        </fieldset>
                                        <fieldset className="form-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="What's this article about?"
                                                {...bindInput(scope(article, ["description"]))}
                                            />
                                        </fieldset>
                                        <fieldset className="form-group">
                                            <textarea
                                                className="form-control"
                                                rows="8"
                                                placeholder="Write your article (in markdown)"
                                                {...bindInput(scope(article, ["body"]))}
                                            ></textarea>
                                        </fieldset>
                                        <fieldset className="form-group">
                                            {(() => {
                                                const { value, onChange } = scope(article, [
                                                    "tagList",
                                                ]);
                                                return (
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter tags"
                                                        {...bindInput({
                                                            value: value?.join(","),
                                                            onChange: (v) => onChange(v.split(",")),
                                                        })}
                                                        // value={value ? value.join(",") : ""}
                                                        // onChange={(e) =>
                                                        //     onChange(e.target.value.split(","))
                                                        // }
                                                    />
                                                );
                                            })()}

                                            <div className="tag-list">
                                                {article.value?.tagList
                                                    ?.filter((v) => v)
                                                    .map((tag, i) => (
                                                        <span
                                                            key={i}
                                                            className="tag-default tag-pill"
                                                        >
                                                            {" "}
                                                            <i
                                                                className="ion-close-round"
                                                                onClick={() => {
                                                                    console.log(tag);
                                                                    article.onChange({
                                                                        ...article.value,
                                                                        tagList:
                                                                            article.value.tagList.filter(
                                                                                (v) => v !== tag
                                                                            ),
                                                                    });
                                                                }}
                                                            />{" "}
                                                            {tag}{" "}
                                                        </span>
                                                    ))}
                                            </div>
                                        </fieldset>
                                        <button
                                            className="btn btn-lg pull-xs-right btn-primary"
                                            type="button"
                                            onClick={async (e) => {
                                                e.preventDefault();
                                                isLoading.onChange(true);
                                                let res = null;
                                                let payload = {
                                                    ...article.value,
                                                    tagList: article.value.tagList?.filter(
                                                        (v) => v
                                                    ),
                                                };

                                                if (article.value.slug) {
                                                    // prettier-ignore
                                                    res = await apis.article.updateArticle(payload);
                                                } else {
                                                    // prettier-ignore
                                                    res = await apis.article.createArticle(payload);
                                                }

                                                if (res.errors) {
                                                    console.error(res.errors);
                                                    errors.onChange(res.errors.body);
                                                    isLoading.onChange(false);
                                                } else {
                                                    isLoading.onChange(false);
                                                    // prettier-ignore
                                                    navigate(`/article/${res.article.slug}`);
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
