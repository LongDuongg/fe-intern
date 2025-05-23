import { EmptyFC } from "../../common/react/empty-fc.js";
import { cs } from "../../common/chain-services.js";
import { Layout } from "../layout/layout.jsx";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  return cs(
    ({}, next) => EmptyFC({ next }),
    ["navigate", ({}, next) => next(useNavigate())],
    ({}, next) => <Layout>{next()}</Layout>,
    ({ navigate }) => {
      return (
        <div className="auth-page">
          <div className="container page">
            <div className="row">
              <div className="col-md-6 offset-md-3 col-xs-12">
                <h1 className="text-xs-center">Sign up</h1>
                <p className="text-xs-center">
                  <a href="/login">Have an account?</a>
                </p>

                <ul className="error-messages">
                  <li>That email is already taken</li>
                </ul>

                <form>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Username"
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Email"
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                    />
                  </fieldset>
                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Sign up
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
