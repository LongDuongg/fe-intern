import { cs } from "../../common/chain-services";
import { consumeContext } from "../../common/react/context";

export const FollowButton = ({ article, onFollow }) => {
    // prettier-ignore
    return cs(
        consumeContext("apis"),
        ({apis}) => {
            return (
                <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={async () => {
                        let res = null;
                        if (article?.author.following) {
                            res = await apis.profile.unfollowUser({
                                username: article?.author.username,
                            });
                        } else {
                            res = await apis.profile.followUser({
                                username: article?.author.username,
                            });
                        }
                        onFollow(res.profile);
                        // console.log(res);
                    }}
                >
                    {article?.author.following ? "" : <i className="ion-plus-round"></i>}
                    &nbsp; {article?.author.following ? "Followed" : "Follow"}{" "}
                    {article?.author.username}{" "}
                    <span className="counter">({article?.author.followersCount})</span>
                </button>
            );
        }
    );
};
