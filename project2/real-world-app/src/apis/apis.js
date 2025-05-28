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
      getArticles: async ({ page }) => {
        return fetch(
          "https://conduit-realworld-example-app.fly.dev/api/articles?limit=5&offset=" +
            (page - 1)
        )
          .then((res) => res.json())
          .then((data) => data);
      },

      getArticlesWithTag: async ({ tag }) => {
        return fetch(
          `https://conduit-realworld-example-app.fly.dev/api/articles?tag=${tag}`
        )
          .then((res) => res.json())
          .then((data) => data);
      },

      getArticlesByAuthor: async ({ username, page }) => {
        return fetch(
          `https://conduit-realworld-example-app.fly.dev/api/articles?author=${username}` +
            (page - 1)
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
