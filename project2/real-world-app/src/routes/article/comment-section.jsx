import { cs } from "../../common/chain-services";
import { scope } from "../../common/react/scope";
import { State } from "../../common/react/state";
import { bindInput } from "../../common/react/bind-input";
import { consumeContext } from "../../common/react/context";
import { Load2 } from "../../common/react/load2";
import { keyed } from "../../common/react/keyed";
import { formatDate } from "../../common/utils/date";

export const CommentSection = ({ slug }) => {
    return cs(
        consumeContext("apis"),
        // prettier-ignore
        ["comments", ({apis}, next) => Load2({ 
            _key: slug, 
            fetch: () => apis.article.getComments({ slug }), 
            next 
        })],
        ({ comments }) => {
            if (comments.loading) {
                return <div>Loading...</div>;
            }
            // console.log(comments.value);
            return (
                <>
                    {CommentForm({
                        slug,
                        onAdd: (comment) => {
                            // console.log(comment);
                            comments.onChange({
                                comments: [comment, ...comments.value.comments],
                            });
                        },
                    })}
                    {!comments.value.comments.length ? (
                        <div>There are no comments yet...</div>
                    ) : (
                        comments.value.comments.map((comment, i) =>
                            cs(keyed(i), ({}) =>
                                CommentCard({
                                    comment,
                                    slug,
                                    onDelete: (id) => {
                                        comments.onChange({
                                            comments: comments.value.comments.filter(
                                                (comment) => comment.id !== id
                                            ),
                                        });
                                    },
                                })
                            )
                        )
                    )}
                </>
            );
        }
    );
};

export const CommentForm = ({ slug, onAdd }) => {
    return cs(
        consumeContext("auth"),
        consumeContext("apis"),
        ["state", ({}, next) => State({ initValue: "", next })],
        ["isLoading", ({}, next) => State({ initValue: false, next })],
        ({ auth, apis, state, isLoading }) => {
            return (
                <form className="card comment-form">
                    <div className="card-block">
                        <textarea
                            className="form-control"
                            placeholder="Write a comment..."
                            rows="3"
                            {...bindInput(scope(state, ["body"]))}
                        ></textarea>
                    </div>
                    <div className="card-footer">
                        <img src={auth.user.image} className="comment-author-img" />
                        <button
                            className="btn btn-sm btn-primary"
                            disabled={isLoading.value}
                            onClick={async (e) => {
                                e.preventDefault();
                                isLoading.onChange(true);
                                const res = await apis.article.commentArticle({
                                    slug: slug,
                                    body: state.value.body,
                                });

                                if (!res.errors) {
                                    onAdd(res.comment);
                                    state.onChange("");
                                }

                                isLoading.onChange(false);
                            }}
                        >
                            Post Comment
                        </button>
                    </div>
                </form>
            );
        }
    );
};

export const CommentCard = ({ comment, slug, onDelete }) => {
    // prettier-ignore
    return cs(
        consumeContext("auth"), 
        consumeContext("apis"), 
        ({ auth, apis }) => {
            return (
                <div className="card">
                    <div className="card-block">
                        <p className="card-text">{comment?.body}</p>
                    </div>
                    <div className="card-footer">
                        <a href={`/profile/${comment.author?.username}`} className="comment-author">
                            <img src={comment.author?.image} className="comment-author-img" />
                        </a>
                        &nbsp;
                        <a href={`/profile/${comment.author?.username}`} className="comment-author">
                            {comment.author?.username}
                        </a>
                        <span className="date-posted">{formatDate(comment?.createdAt)}</span>
                        {comment.author?.username === auth.user?.username && (
                            <span
                                className="mod-options"
                                onClick={async () => {
                                    const res = await apis.article.deleteComment({
                                        slug: slug,
                                        id: comment?.id,
                                    });

                                    if (!res.errors) {
                                        onDelete(comment?.id);
                                    }
                                }}
                            >
                                <i className="ion-trash-a"></i>
                            </span>
                        )}
                    </div>
                </div>
            );
        }
    );
};
