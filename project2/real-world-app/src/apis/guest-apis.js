const API_HOST = "https://conduit-realworld-example-app.fly.dev";

export const createGuestApis = () => {
    const fetcher = createFetcher();
    return {
        user: {
            getUser: async ({ authToken }) => {
                const res = await fetcher.get("/user", { authToken });
                if (res.errors) {
                    return null;
                }
                return res;
            },

            // prettier-ignore
            login: ({ email, password }) => fetcher.post("/users/login", {
                user: {
                    email,
                    password,
                },
            }),

            signUp: async ({ username, email, password }) => {
                return fetcher.post("/users", {
                    user: {
                        username,
                        email,
                        password,
                    },
                });
            },
        },
    };
};

const createFetcher = () => {
    const makeRequest = (method, noPayload) => {
        return async (url, payload, options) => {
            if (noPayload) {
                options = payload;
                payload = null;
            }

            const headers = new Headers();
            headers.append("Content-Type", "application/json");

            if (options?.authToken) {
                headers.append("Authorization", `Token ${options.authToken}`);
            }

            const res = await fetch(`${API_HOST}/api${url}`, {
                method,
                headers,
                body: payload ? JSON.stringify(payload) : null,
            });

            return await res.json();
        };
    };
    return {
        get: makeRequest("GET", true),
        post: makeRequest("POST"),
        put: makeRequest("PUT"),
        delete: makeRequest("DELETE", true),
    };
};
