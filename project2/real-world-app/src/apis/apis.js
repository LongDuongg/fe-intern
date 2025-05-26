
export const createApis = ({onUnauthen}) => {
    return ({
        user: {
            login: async ({ email, password }) => {
                // await waitTimeout(1000);
                return fetch( "https://conduit-realworld-example-app.fly.dev/api/users/login",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            user: {
                                email,
                                password,
                            },
                        }),
                    }
                )
                    .then((res) => res.json())
                    .then((data) => data);
            },

            signUp: async ({ name, email, password }) => {},
        },
        article: {
            getArticles: async ({page}) => {
                // await waitTimeout(1000);
                return fetch("https://conduit-realworld-example-app.fly.dev/api/articles?limit=3&offset=" + (page-1))
                    .then((res) => res.json())
                    .then((data) => data);
            },
        },
        tag: {
            getTags: async () => {
                // await waitTimeout(1000);
                return fetch("https://conduit-realworld-example-app.fly.dev/api/tags")
                    .then((res) => res.json())
                    .then((data) => data);
            },
        },
    });
};


