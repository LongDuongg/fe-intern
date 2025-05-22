import { waitTimeout } from "../common/utils/async";

export const user = {
  login: async ({ email, password }) => {
    // await waitTimeout(1000);
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
};

const apis = { user };

export default apis;
