import { Layout } from "../layout/layout.jsx";

import { cs } from "../../common/chain-services.js";
import apis from "../../apis/apis.js";
import { State } from "../../common/react/state.js";
import { bindInput } from "../../../../../project1/interactive-card/src/common/react/bind-input.js";
import { scope } from "../../../../../project1/interactive-card/src/common/react/scope.js";
import { consumeContext } from "../../common/react/context.js";

export const Login = () => {
  return cs(
    consumeContext("auth"),
    ["state", ({}, next) => State({ initValue: {}, next })],
    ["errors", ({}, next) => State({  next })],
    ["isLoading", ({}, next) => State({  next })],
    ({}, next) => <Layout>{next()}</Layout>,
    ({ state, auth, errors, isLoading }) => {
      return (
        <div className="auth-page">
          <div className="container page">
            <div className="row">
              <div className="col-md-6 offset-md-3 col-xs-12">
                <h1 className="text-xs-center">Sign in</h1>
                <p className="text-xs-center">
                  <a href="/register">Need an account?</a>
                </p>

                {errors?.value && (
                  <ul className="error-messages">
                    {errors?.value.map((error, i) => (
                      <li key={i}>{error}</li>
                    ))}
                  </ul>
                )}

                <form>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Email"
                      {...bindInput(scope(state, ["email"]))}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      {...bindInput(scope(state, ["password"]))}
                    />
                  </fieldset>
                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    onClick={async (e) => {
                      e.preventDefault();
                      isLoading.onChange(true);
                      const user = await apis.user.login(state?.value);
                      if (user.errors) {
                        errors.onChange(user.errors.body);
                        isLoading.onChange(false);
                      } else {
                        auth.login(user);
                      }
                    }}
                  >
                    {isLoading.value ? "Loading..." : "Sign in"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
  );
};
