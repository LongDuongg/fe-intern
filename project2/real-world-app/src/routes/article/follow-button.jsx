import { cs } from "../../common/chain-services";
import { consumeContext } from "../../common/react/context";

export const FollowButton = ({ userInfo, className, onFollow }) => {
    // prettier-ignore
    return cs(
        consumeContext("apis"),
        ({apis}) => {
            return (
                <button
                    className={className}
                    onClick={async () => {
                        let res = null;
                        if (userInfo?.following) {
                            res = await apis.profile.unfollowUser({
                                username: userInfo?.username,
                            });
                        } else {
                            res = await apis.profile.followUser({
                                username: userInfo?.username,
                            });
                        }
                        onFollow(res.profile);
                        // console.log(res);
                    }}
                >
                    {userInfo?.following ? "" : <i className="ion-plus-round"></i>}
                    &nbsp; {userInfo?.following ? "Following" : "Follow"} {userInfo?.username}{" "}
                    <span className="counter">({userInfo?.followersCount})</span>
                </button>
            );
        }
    );
};
