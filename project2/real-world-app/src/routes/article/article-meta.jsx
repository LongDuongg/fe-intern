import { Link, useNavigate } from "react-router-dom";

import { LikeButton } from "../home/like-button.jsx";
import { FollowButton } from "./follow-button.jsx";

import { cs } from "../../common/chain-services";
import { formatDate } from "../../common/utils/date.js";
import { consumeContext } from "../../common/react/context.js";
import { State } from "../../common/react/state.js";
import { EmptyFC } from "../../common/react/empty-fc.js";

export const ArticleMeta = ({ article }) => {
    // console.log(article.value);
    return cs(consumeContext("auth"), ({ auth }) => {
        return (
            <div className="article-meta">
                <Link to={`/profile/${article.value.article?.author.username}`}>
                    <img src={article.value.article?.author.image} />
                </Link>
                <div className="info">
                    <Link
                        to={`/profile/${article.value.article?.author.username}`}
                        className="author"
                    >
                        {article.value.article?.author?.username}
                    </Link>
                    <span className="date">{formatDate(article.value.article?.createdAt)}</span>
                </div>

                {article.value.article?.author?.username === auth.user?.username ? (
                    <>
                        <Link to={`/editor/${article.value.article?.slug}`}>
                            <button className="btn btn-sm btn-outline-secondary">
                                <i className="ion-edit"></i> Edit Article
                            </button>
                        </Link>
                        &nbsp;&nbsp;
                        {DeleteButton({ article: article.value.article })}
                    </>
                ) : (
                    <>
                        {FollowButton({
                            userInfo: article.value.article.author,

                            onChange: (updatedProfile) => {
                                article.onChange({
                                    article: { ...article.value.article, author: updatedProfile },
                                });
                            },
                        })}
                        &nbsp;&nbsp;
                        {LikeButton({
                            label: "Favorite Post",
                            article: article.value.article,
                            onChange: (updatedArticle) => {
                                article.onChange({
                                    article: updatedArticle,
                                });
                            },
                        })}
                        &nbsp;&nbsp;
                    </>
                )}
            </div>
        );
    });
};

const DeleteButton = ({ article }) => {
    // prettier-ignore
    return cs(
        consumeContext("apis"),
        ({}, next) => EmptyFC({next}),
        ["navigate", (_, next) => next(useNavigate())],
        ["isLoading", ({}, next) => State({ initValue: false, next })],
        ({ apis, navigate, isLoading }) => {
            return (
                <button
                    className="btn btn-sm btn-outline-danger"
                    disabled={isLoading.value}
                    onClick={async () => {
                        isLoading.onChange(true);
                        const res = await apis.article.deleteArticle({
                            slug: article?.slug,
                        });

                        if (!res.errors) {
                            navigate("/");
                        }

                        isLoading.onChange(false);
                    }}
                >
                    <i className="ion-trash-a"></i> Delete Article
                </button>
            );
        }
    );
};
