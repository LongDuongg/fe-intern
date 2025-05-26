import {cs}       from "../common/chain-services.js";
import {rLsStore} from "../common/react/ls-store.js";

export const Auth = ({ next }) => {
    return cs(
        ["userInfo", rLsStore("user")],
        ({ userInfo }) => next({
            user: userInfo.value?.user,
            login: (user) => {
                userInfo.onChange(user);
            },
            logout: () => {
                userInfo.onChange(null);
            },
        })
    );
};
