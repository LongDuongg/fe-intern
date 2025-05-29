export const createApis = ({ onUnauthen }) => {
  return {
    user: {
      login: async ({ email, password }) => {
        return fetch(
          "https://conduit-realworld-example-app.fly.dev/api/users/login",
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
      getGlobalFeed: async ({ page }) => {
        return fetch(
          `https://conduit-realworld-example-app.fly.dev/api/articles?limit=5&offset=${page}`
        )
          .then((res) => res.json())
          .then((data) => data);
      },

      getFeedByTag: async ({ tag, page }) => {
        return fetch(
          `https://conduit-realworld-example-app.fly.dev/api/articles?tag=${tag}&offset=${page}&limit=5`
        )
          .then((res) => res.json())
          .then((data) => data);
      },

      getMyFeed: async ({ page }) => {
        return fetch(
          `https://conduit-realworld-example-app.fly.dev/api/articles/feed?offset=${page}`
        )
          .then((res) => res.json())
          .then((data) => data);
      },
    },
    tag: {
      getTags: async () => {
        return fetch("https://conduit-realworld-example-app.fly.dev/api/tags")
          .then((res) => res.json())
          .then((data) => data);
      },
    },
  };
};
