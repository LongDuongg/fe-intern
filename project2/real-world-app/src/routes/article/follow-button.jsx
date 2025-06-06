import { cs } from "../../common/chain-services";

export const FollowButton = ({ article }) => {
    return cs(({}) => {
        return (
            <button className="btn btn-sm btn-outline-secondary">
                <i className="ion-plus-round"></i>
                &nbsp; Follow {article?.author.username}{" "}
                <span className="counter">({article?.author.followersCount})</span>
            </button>
        );
    });
};
