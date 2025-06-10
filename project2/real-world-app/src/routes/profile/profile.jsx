import { useNavigate, useParams } from "react-router-dom";

import { cs } from "../../common/chain-services.js";
import { consumeContext } from "../../common/react/context.js";
import { EmptyFC } from "../../common/react/empty-fc.js";
import { Layout } from "../layout/layout.jsx";
import { Load2 } from "../../common/react/load2.js";
import { FollowButton } from "../article/follow-button.jsx";
import { ArticleTabs } from "./article-tabs.jsx";

export const Profile = () =>
    cs(
        consumeContext("auth"),
        consumeContext("apis"),
        ({}, next) => <Layout>{next()}</Layout>,
        ({}, next) => EmptyFC({ next }),
        ["navigate", ({}, next) => next(useNavigate())],
        ["params", ({}, next) => next(useParams())],

        // prettier-ignore
        ["profile", ({ apis, params }, next) => Load2({
            _key: params.username,
            fetch: async () => await apis.profile.getProfile({ username: params.username }),
            next,
        })],

        ({ auth, navigate, profile }) => {
            if (profile.loading) {
                return;
            }

            // console.log(profile.value);
            return (
                <div className="profile-page">
                    <div className="user-info">
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-12 col-md-10 offset-md-1">
                                    <img src={profile.value.profile?.image} className="user-img" />
                                    {auth.user.username === profile.value.profile?.username ? (
                                        <>
                                            {" "}
                                            <h4>{auth.user.username}</h4>
                                            <p>{auth.user.bio}</p>
                                            <button
                                                className="btn btn-sm btn-outline-secondary action-btn"
                                                onClick={() => {
                                                    navigate("/settings");
                                                }}
                                            >
                                                <i className="ion-gear-a"></i>
                                                &nbsp; Edit Profile Settings
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            {" "}
                                            <h4>{profile.value.profile?.username}</h4>
                                            <p>{profile.value.profile?.bio}</p>
                                            {FollowButton({
                                                userInfo: profile.value.profile,
                                                className: " action-btn",
                                                onFollow: (updatedProfile) => {
                                                    profile.onChange({
                                                        ...profile.value,
                                                        profile: updatedProfile,
                                                    });
                                                },
                                            })}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-md-10 offset-md-1">
                                {ArticleTabs({ profile: profile.value?.profile })}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    );
