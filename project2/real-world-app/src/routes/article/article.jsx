import { useNavigate, useParams, Link } from "react-router-dom";

import { Layout } from "../layout/layout.jsx";
import { CommentSection } from "./comment-section.jsx";

import { cs } from "../../common/chain-services.js";
import { EmptyFC } from "../../common/react/empty-fc.js";
import { consumeContext } from "../../common/react/context.js";
import { Load2 } from "../../common/react/load2.js";

import { ArticleMeta } from "./article-meta.jsx";

export const Article = () => {
    return cs(
        consumeContext("apis"),
        consumeContext("auth"),
        ({}, next) => <Layout>{next()}</Layout>,
        ({}, next) => EmptyFC({ next }),
        ["navigate", ({}, next) => next(useNavigate())],
        ["params", ({}, next) => next(useParams())],

        // prettier-ignore
        ["article", ({ apis, params }, next) => Load2({
            _key: params.slug,
            fetch: async () => await apis.article.getSingleArticle({ slug: params.slug }),
            next,
        })],

        ({ apis, auth, navigate, article, params }) => {
            console.log(params);
            if (article.loading) {
                return (
                    <div className="article-page">
                        <div className="banner">
                            <div className="container">
                                <h1>Loading...</h1>
                            </div>
                        </div>
                    </div>
                );
            }

            if (article.value?.errors) {
                return (
                    <div className="article-page" style={{ color: "red", marginTop: "10px" }}>
                        <div className="banner">
                            <div className="container">
                                <h1>{article.value.errors.body[0]}</h1>
                            </div>
                        </div>
                    </div>
                );
            }

            if (article.value.article == null) {
                return (
                    <div className="article-page">
                        <div className="banner">
                            <div className="container">
                                <h1>Article not found</h1>
                            </div>
                        </div>
                    </div>
                );
            }

            // console.log(article.value.article);

            return (
                <div className="article-page">
                    <div className="banner">
                        <div className="container">
                            <h1>{article.value.article?.title}</h1>
                            {ArticleMeta({ article })}
                        </div>
                    </div>

                    <div className="container page">
                        <div className="row article-content">
                            <div className="col-md-12">
                                <p>{article.value.article?.body}</p>
                                <p>{article.value.article?.description}</p>
                                <ul className="tag-list">
                                    {article.value.article?.tagList.map((tag, i) => (
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
                                {CommentSection({ slug: params.slug })}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    );
};
