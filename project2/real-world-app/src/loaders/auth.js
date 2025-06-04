import { cs } from "../common/chain-services.js";
import { Load2 } from "../common/react/load2.js";
import { rLsStore } from "../common/react/ls-store.js";

export const Auth = ({ guestApis, next }) => {
    return cs(
        // prettier-ignore
        ["userInfo", ({}, next) => Load2({
            fetch: () => {
                const authToken = getCookie("auth_token");
                if (!authToken) {
                    return null;
                }
                return guestApis.user.getUser({ authToken });
            },
            next,
        })],
        // prettier-ignore
        ({ userInfo }) => next({
            user: userInfo.value?.user,
            login: (user) => {
                userInfo.onChange(user);
                document.cookie = "auth_token=" + user.user.token;
            },
            logout: () => {
                userInfo.onChange(null);
                deleteCookie("auth_token");
            },
        })
    );
};

const deleteCookie = (name) => {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

const getCookie = (name) => {
    for (const e of document.cookie.split(/;\s*/)) {
        const [n1, value] = e.split("=");
        if (n1 === name) {
            return value;
        }
    }
};
