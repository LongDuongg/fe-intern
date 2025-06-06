import { cs } from "../../common/chain-services";
import { scope } from "../../common/react/scope";
import { State } from "../../common/react/state";
import { bindInput } from "../../common/react/bind-input";
import { consumeContext } from "../../common/react/context";

export const CommentSection = () => {
    return cs(() => {
        return (
            <>
                <CommentForm />
                {[1].map((i) => (
                    <CommentCard key={i} />
                ))}
            </>
        );
    });
};

export const CommentForm = ({ slug, onChange }) => {
    return cs(
        consumeContext("apis"),
        ["state", ({}, next) => State({ initValue: "", next })],
        ({ apis, state }) => {
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
                        <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                        <button
                            className="btn btn-sm btn-primary"
                            onClick={async (e) => {
                                e.preventDefault();
                                console.log(state.value);
                                // prettier-ignore
                                const comment = await apis.article.commentArticle({
                                    slug: slug,
                                    body: state.value,
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

export const CommentCard = () => {
    return cs(({}) => {
        return (
            <div className="card">
                <div className="card-block">
                    <p className="card-text">
                        With supporting text below as a natural lead-in to additional content.
                    </p>
                </div>
                <div className="card-footer">
                    <a href="/profile/author" className="comment-author">
                        <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                    </a>
                    &nbsp;
                    <a href="/profile/jacob-schmidt" className="comment-author">
                        Jacob Schmidt
                    </a>
                    <span className="date-posted">Dec 29th</span>
                    <span className="mod-options">
                        <i className="ion-trash-a"></i>
                    </span>
                </div>
            </div>
        );
    });
};
