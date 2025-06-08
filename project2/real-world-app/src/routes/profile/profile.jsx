import { useNavigate, useParams } from "react-router-dom";

import { cs } from "../../common/chain-services.js";
import { consumeContext } from "../../common/react/context.js";
import { EmptyFC } from "../../common/react/empty-fc.js";
import { Layout } from "../layout/layout.jsx";
import { Load2 } from "../../common/react/load2.js";
import { FollowButton } from "../article/follow-button.jsx";

export const Profile = () =>
    cs(
        consumeContext("auth"),
        consumeContext("apis"),
        ({}, next) => <Layout>{next()}</Layout>,
        ({}, next) => EmptyFC({ next }),
        ["navigate", ({}, next) => next(useNavigate())],
        ["params", ({}, next) => next(useParams())],
        ["username", ({ params }, next) => next(params.username)],

        // prettier-ignore
        ["profile", ({ apis, username }, next) => Load2({
            _key: username,
            fetch: async () => await apis.profile.getProfile({ username }),
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
                                <div className="articles-toggle">
                                    <ul className="nav nav-pills outline-active">
                                        <li className="nav-item">
                                            <a className="nav-link active" href="">
                                                My Articles
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="">
                                                Favorited Articles
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <div className="article-preview">
                                    <div className="article-meta">
                                        <a href="/profile/eric-simons">
                                            <img src="http://i.imgur.com/Qr71crq.jpg" />
                                        </a>
                                        <div className="info">
                                            <a href="/profile/eric-simons" className="author">
                                                {auth.user.username}
                                            </a>
                                            <span className="date">January 20th</span>
                                        </div>
                                        <button className="btn btn-outline-primary btn-sm pull-xs-right">
                                            <i className="ion-heart"></i> 29
                                        </button>
                                    </div>
                                    <a
                                        href="/article/how-to-buil-webapps-that-scale"
                                        className="preview-link"
                                    >
                                        <h1>How to build webapps that scale</h1>
                                        <p>This is the description for the post.</p>
                                        <span>Read more...</span>
                                        <ul className="tag-list">
                                            <li className="tag-default tag-pill tag-outline">
                                                realworld
                                            </li>
                                            <li className="tag-default tag-pill tag-outline">
                                                implementations
                                            </li>
                                        </ul>
                                    </a>
                                </div>

                                <div className="article-preview">
                                    <div className="article-meta">
                                        <a href="/profile/albert-pai">
                                            <img src="http://i.imgur.com/N4VcUeJ.jpg" />
                                        </a>
                                        <div className="info">
                                            <a href="/profile/albert-pai" className="author">
                                                Albert Pai
                                            </a>
                                            <span className="date">January 20th</span>
                                        </div>
                                        <button className="btn btn-outline-primary btn-sm pull-xs-right">
                                            <i className="ion-heart"></i> 32
                                        </button>
                                    </div>
                                    <a href="/article/the-song-you" className="preview-link">
                                        <h1>
                                            The song you won't ever stop singing. No matter how hard
                                            you try.
                                        </h1>
                                        <p>This is the description for the post.</p>
                                        <span>Read more...</span>
                                        <ul className="tag-list">
                                            <li className="tag-default tag-pill tag-outline">
                                                Music
                                            </li>
                                            <li className="tag-default tag-pill tag-outline">
                                                Song
                                            </li>
                                        </ul>
                                    </a>
                                </div>

                                <ul className="pagination">
                                    <li className="page-item active">
                                        <a className="page-link" href="">
                                            1
                                        </a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="">
                                            2
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    );
