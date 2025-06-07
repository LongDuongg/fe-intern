import { Link } from "react-router-dom";

import { cs } from "../../common/chain-services";
import { formatDate } from "../../common/utils/date.js";

import { LikeButton } from "../home/like-button.jsx";
import { consumeContext } from "../../common/react/context.js";
import { FollowButton } from "./follow-button.jsx";

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
                        <button className="btn btn-sm btn-outline-secondary">
                            <Link to={`/editor/${article.value.article?.slug}`}>
                                <i className="ion-edit"></i> Edit Article
                            </Link>
                        </button>
                        &nbsp;&nbsp;
                        <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={async () => {
                                await apis.article.deleteArticle({
                                    slug: article.value?.article?.slug,
                                });
                                navigate("/");
                            }}
                        >
                            <i className="ion-trash-a"></i> Delete Article
                        </button>
                    </>
                ) : (
                    <>
                        {FollowButton({
                            userInfo: article.value.article.author,
                            className: "btn btn-sm btn-outline-secondary",
                            onFollow: (updatedProfile) => {
                                article.onChange({
                                    ...article.value,
                                    article: { ...article.value.article, author: updatedProfile },
                                });
                            },
                        })}
                        &nbsp;&nbsp;
                        {LikeButton({
                            title: "Favorite Post",
                            className: "btn btn-sm btn-outline-primary",
                            article: article.value.article,
                            onChange: async (updatedArticle) => {
                                article.onChange({
                                    ...article.value,
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
