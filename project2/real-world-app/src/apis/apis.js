const API_HOST = "https://conduit-realworld-example-app.fly.dev/api";

export const createApis = ({ onUnauthen, token }) => {
  const fetcher = createFetcher({ onUnauthen, token });
  return {
    user: {
      login: ({ email, password }) =>
        fetcher.post("/users/login", {
          user: {
            email,
            password,
          },
        }),

      // login: async ({ email, password }) => {
      //   return fetch(`${API_HOST}/users/login`, {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       user: {
      //         email,
      //         password,
      //       },
      //     }),
      //   })
      //     .then((res) => res.json())
      //     .then((data) => data);
      // },

      signUp: async ({ username, email, password }) =>
        fetcher.post("/users", {
          user: {
            username,
            email,
            password,
          },
        }),
    },

    article: {
      getGlobalFeed: ({ page }) =>
        fetcher.get(`/articles?limit=5&offset=${page}`),

      getFeedByTag: ({ tag, page }) =>
        fetcher.get(`/articles?tag=${tag}&limit=5&offset=${page}`),

      getMyFeed: async ({ username, page }) =>
        fetcher.get(`/articles?author=${username}&limit=5&offset=${page}`),

      getSingleArticle: async ({ slug }) => fetcher.get(`/articles/${slug}`),

      createArticle: async ({ title, description, body, tagList }) =>
        fetcher.post("/articles", {
          article: {
            title,
            description,
            body,
            tagList,
          },
        }),

      deleteArticle: async ({ slug }) => fetcher.delete(`/articles/${slug}`),

      likeArticle: async ({ slug }) =>
        fetcher.post(`/articles/${slug}/favorite`),
    },

    tag: {
      getTags: async () => fetcher.get("/tags"),
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
