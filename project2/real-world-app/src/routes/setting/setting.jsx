import { useNavigate } from "react-router-dom";

import { cs } from "../../common/chain-services.js";
import { scope } from "../../common/react/scope.js";
import { bindInput } from "../../common/react/bind-input.js";
import { State } from "../../common/react/state.js";
import { consumeContext } from "../../common/react/context.js";
import { EmptyFC } from "../../common/react/empty-fc.js";

import { Layout } from "../layout/layout.jsx";

export const Setting = () => {
    return cs(
        consumeContext("apis"),
        consumeContext("auth"),
        ({}, next) => <Layout>{next()}</Layout>,
        ({}, next) => EmptyFC({ next }),
        ["navigate", ({}, next) => next(useNavigate())],
        ["state", ({ auth }, next) => State({ initValue: auth.user, next })],
        ["errors", ({}, next) => State({ next })],
        ["isSubmit", ({}, next) => State({ initValue: false, next })],
        ({ apis, auth, navigate, state, errors, isSubmit }) => {
            // console.log(auth);
            return (
                <div className="settings-page">
                    <div className="container page">
                        <div className="row">
                            <div className="col-md-6 offset-md-3 col-xs-12">
                                <h1 className="text-xs-center">
                                    Your Settings
                                </h1>

                                {errors?.value && (
                                    <ul className="error-messages">
                                        {errors?.value.map((error, i) => (
                                            <li key={i}>{error}</li>
                                        ))}
                                    </ul>
                                )}

                                <form>
                                    <fieldset>
                                        <fieldset className="form-group">
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="URL of profile picture"
                                                {...bindInput(
                                                    scope(state, ["image"])
                                                )}
                                            />
                                        </fieldset>
                                        <fieldset className="form-group">
                                            <input
                                                className="form-control form-control-lg"
                                                type="text"
                                                placeholder="Your Name"
                                                {...bindInput(
                                                    scope(state, ["username"])
                                                )}
                                            />
                                        </fieldset>
                                        <fieldset className="form-group">
                                            <textarea
                                                className="form-control form-control-lg"
                                                rows="8"
                                                placeholder="Short bio about you"
                                                {...bindInput(
                                                    scope(state, ["bio"])
                                                )}
                                            ></textarea>
                                        </fieldset>
                                        <fieldset className="form-group">
                                            <input
                                                className="form-control form-control-lg"
                                                type="text"
                                                placeholder="Email"
                                                {...bindInput(
                                                    scope(state, ["email"])
                                                )}
                                            />
                                        </fieldset>
                                        <fieldset className="form-group">
                                            <input
                                                className="form-control form-control-lg"
                                                type="password"
                                                placeholder="New Password"
                                                {...bindInput(
                                                    scope(state, ["password"])
                                                )}
                                            />
                                        </fieldset>
                                        {isSubmit.value ? (
                                            <></>
                                        ) : (
                                            <button
                                                className="btn btn-lg btn-primary pull-xs-right"
                                                onClick={async (e) => {
                                                    e.preventDefault();
                                                    // prettier-ignore
                                                    const user = await apis.user.updateUser(state?.value);
                                                    if (user.errors) {
                                                        errors.onChange(
                                                            user.errors.body
                                                        );
                                                    } else {
                                                        auth.updateUser(
                                                            user.user
                                                        );
                                                        // prettier-ignore
                                                        navigate(`/profile/${user.user.username}`);
                                                    }
                                                    isSubmit.onChange(true);
                                                }}
                                            >
                                                Update Settings
                                            </button>
                                        )}
                                    </fieldset>
                                </form>
                                <hr />
                                <button className="btn btn-outline-danger">
                                    Or click here to logout.
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    );
};
