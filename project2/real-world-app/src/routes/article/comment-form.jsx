import { cs } from "../../common/chain-services";
import { scope } from "../../common/react/scope";
import { State } from "../../common/react/state";
import { bindInput } from "../../common/react/bind-input";
import { consumeContext } from "../../common/react/context";

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
                        <img
                            src="http://i.imgur.com/Qr71crq.jpg"
                            className="comment-author-img"
                        />
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
