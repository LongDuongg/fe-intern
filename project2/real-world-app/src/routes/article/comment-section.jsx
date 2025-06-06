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

            return (
                <>
                    {CommentForm({ slug })}
                    {!comments.value.comments.length ? (
                        <div>There are no comments yet...</div>
                    ) : (
                        comments.value.comments.map((comment) =>
                            cs(keyed(comment.id), ({}) => CommentCard({ comment }))
                        )
                    )}
                </>
            );
        }
    );
};

export const CommentForm = ({ slug, onChange }) => {
    return cs(
        consumeContext("auth"),
        consumeContext("apis"),
        ["state", ({}, next) => State({ initValue: "", next })],
        ({ auth, apis, state }) => {
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
                            onClick={async (e) => {
                                e.preventDefault();
                                console.log(state.value);
                                const comment = await apis.article.commentArticle({
                                    slug: slug,
                                    body: state.value.body,
                                });
                                onChange(comment);
                                state.onChange("");
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

export const CommentCard = ({ comment }) => {
    return cs(({}) => {
        return (
            <div className="card">
                <div className="card-block">
                    <p className="card-text">{comment.body}</p>
                </div>
                <div className="card-footer">
                    <a href={`/profile/${comment.author.username}`} className="comment-author">
                        <img src={comment.author.image} className="comment-author-img" />
                    </a>
                    &nbsp;
                    <a href={`/profile/${comment.author.username}`} className="comment-author">
                        {comment.author.username}
                    </a>
                    <span className="date-posted">{formatDate(comment.createdAt)}</span>
                    <span className="mod-options">
                        <i className="ion-trash-a"></i>
                    </span>
                </div>
            </div>
        );
    });
};
