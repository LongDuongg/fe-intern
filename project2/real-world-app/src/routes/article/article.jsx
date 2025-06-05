import { useNavigate, useLocation } from "react-router-dom";

import { Layout } from "../layout/layout.jsx";
import { CardComment } from "./card-comment.jsx";
import { CommentForm } from "./comment-form.jsx";
import { LikeButton } from "../home/like-button.jsx";

import { cs } from "../../common/chain-services.js";
import { EmptyFC } from "../../common/react/empty-fc.js";
import { consumeContext } from "../../common/react/context.js";
import { Load2 } from "../../common/react/load2.js";
import { formatDate } from "../../common/utils/date.js";

export const Article = () => {
    return cs(
        consumeContext("apis"),
        consumeContext("auth"),
        ({}, next) => <Layout>{next()}</Layout>,
        ({}, next) => EmptyFC({ next }),
        ["navigate", ({}, next) => next(useNavigate())],
        ["location", ({}, next) => next(useLocation())],

        // prettier-ignore
        ["slug", ({ location }, next) => next(location.pathname.split("/").slice(-1)[0])],

        // prettier-ignore
        ["article", ({ apis, slug }, next) => Load2({
            _key: slug,
            fetch: async () => await apis.article.getSingleArticle({ slug }),
            next,
        })],

        ({ apis, auth, navigate, article }) => {
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

            if (article.value?.error) {
                return (
                    <div
                        className="article-page"
                        style={{ color: "red", marginTop: "10px" }}
                    >
                        <div className="banner">
                            <div className="container">
                                <h1>{article.value.error.body[0]}</h1>
                            </div>
                        </div>
                    </div>
                );
            }

            if (article.value.article?.length) {
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

            console.log(article.value.article);

            return (
                <div className="article-page">
                    <div className="banner">
                        <div className="container">
                            <h1>{article.value.article?.title}</h1>

                            <div className="article-meta">
                                <a
                                    href={`/profile/${article.value.article?.author?.username}`}
                                >
                                    <img
                                        src={
                                            article.value.article?.author?.image
                                        }
                                    />
                                </a>
                                <div className="info">
                                    <a
                                        href="/profile/eric-simons"
                                        className="author"
                                    >
                                        {
                                            article.value.article?.author
                                                ?.username
                                        }
                                    </a>
                                    <span className="date">
                                        {formatDate(
                                            article.value.article?.createdAt
                                        )}
                                    </span>
                                </div>

                                {article.value.article?.author?.username ===
                                auth.user?.username ? (
                                    <>
                                        <button
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={() =>
                                                navigate(
                                                    `/editor/${article.value.article?.slug}`
                                                )
                                            }
                                        >
                                            <i className="ion-edit"></i> Edit
                                            Article
                                        </button>
                                        &nbsp;&nbsp;
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={async () => {
                                                await apis.article.deleteArticle(
                                                    {
                                                        slug: article.value
                                                            ?.article?.slug,
                                                    }
                                                );
                                                navigate("/");
                                            }}
                                        >
                                            <i className="ion-trash-a"></i>{" "}
                                            Delete Article
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button className="btn btn-sm btn-outline-secondary">
                                            <i className="ion-plus-round"></i>
                                            &nbsp; Follow{" "}
                                            {
                                                article.value.article.author
                                                    .username
                                            }{" "}
                                            <span className="counter">
                                                (
                                                {
                                                    article.value.article.author
                                                        .followersCount
                                                }
                                                )
                                            </span>
                                        </button>
                                        &nbsp;&nbsp;
                                        {LikeButton({
                                            title: "Favorite Post",
                                            className:
                                                "btn btn-sm btn-outline-primary",
                                            article: article.value.article,
                                            // prettier-ignore
                                            onChange: async ( updatedArticle) => {
                                                article.onChange({
                                                    ...article.value,
                                                    article: updatedArticle,
                                                });
                                            },
                                        })}
                                        {/* <button className="btn btn-sm btn-outline-primary">
                                            <i className="ion-heart"></i>
                                            &nbsp; Favorite Post{" "}
                                            <span className="counter">
                                                (
                                                {
                                                    article.value.article
                                                        ?.favoritesCount
                                                }
                                                )
                                            </span>
                                        </button> */}
                                        &nbsp;&nbsp;
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="container page">
                        <div className="row article-content">
                            <div className="col-md-12">
                                <p>{article.value.article.body}</p>
                                <p>{article.value.article.description}</p>
                                <ul className="tag-list">
                                    {article.value.article.tagList.map(
                                        (tag, i) => (
                                            <li
                                                key={i}
                                                className="tag-default tag-pill tag-outline"
                                            >
                                                {tag}
                                            </li>
                                        )
                                    )}
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
