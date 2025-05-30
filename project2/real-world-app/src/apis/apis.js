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

      signUp: async ({ username, email, password }) => {
        return fetch(
          "https://conduit-realworld-example-app.fly.dev/api/users",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user: {
                username,
                email,
                password,
              },
            }),
          }
        )
          .then((res) => res.json())
          .then((data) => data);
      },
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

      createArticle: async ({ title, description, body, tagList }) => {
        return fetch(
          "https://conduit-realworld-example-app.fly.dev/api/articles",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              article: {
                title,
                description,
                body,
                tagList,
              },
            }),
          }
        )
          .then((res) => res.json())
          .then((data) => data);
      },

      likeArticle: async ({ slug }) => {
        return fetch(
          `https://conduit-realworld-example-app.fly.dev/api/articles/${slug}/favorite`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            // body: JSON.stringify({
            //   article: {
            //     title,
            //     description,
            //     body,
            //     tagList,
            //   },
            // }),
          }
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

const createFetcher = ({ onUnauthen, token }) => {
  const makeRequest = (method) => {
    return async (url, payload) => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");

      if (token) {
        headers.append("Authorization", `Token ${token}`);
      }

      const res = await fetch(`${API_HOST}${url}`, {
        method,
        headers,
        body: payload ? JSON.stringify(payload) : null,
      });

      const data = await res.json();

      if (res.status === 401) {
        console.log(data);
        onUnauthen?.(data.errors.body[0]);
      }
      return data;
    };
  };
  return {
    get: makeRequest("GET"),
    post: makeRequest("POST"),
    put: makeRequest("PUT"),
    delete: makeRequest("DELETE"),
  };
};
