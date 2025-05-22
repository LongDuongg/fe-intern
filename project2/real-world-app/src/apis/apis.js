import { waitTimeout } from "../common/utils/async";

export const user = {
  login: async ({ email, password }) => {
    await waitTimeout(1000);
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
};

export const article = {
  getArticles: async () => {
    await waitTimeout(1000);
    return fetch("https://conduit-realworld-example-app.fly.dev/api/articles")
    .then((res) => res.json())
    .then((data) => data);
  },
}


export const tag = {
  getTags: async () => {
    await waitTimeout(1000);
    return fetch("https://conduit-realworld-example-app.fly.dev/api/tags")
    .then((res) => res.json())
    .then((data) => data);
  },
}

const apis = { user, article, tag };

export default apis;
