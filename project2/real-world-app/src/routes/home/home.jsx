import {NavLink, useLocation, useNavigate, useParams} from "react-router-dom";

import {cs}             from "../../common/chain-services.js";
import {consumeContext} from "../../common/react/context.js";
import {Load}           from "../../common/react/load.js";
import {formatDate}     from "../../common/utils/date.js";
import {Layout}         from "../layout/layout.jsx";
import {State} from "../../common/react/state.js";
import {keyed} from "../../common/react/keyed.js";
import {cx1} from "../../common/cx1.js";
import {EmptyFC} from "../../common/react/empty-fc.js";
import {parseUrlQuery} from "../../common/parse-url-query.js";

export const Home = () => cs(
    ({}, next) => <Layout>{next()}</Layout>,
    consumeContext("apis"),
    ({}, next) => EmptyFC({next}),
    ["routeLoc", (_, next) => next(useLocation())],
    ["routeNavigate", (_, next) => next(useNavigate())],
    ["page", ({routeLoc, routeNavigate}, next) => State({
        initValue: +(parseUrlQuery(routeLoc.search)?.page??1),
        next: (state) => next({
            value: state.value,
            onChange: (newPage) => {
                state.onChange(newPage);
                routeNavigate("?page="+newPage)
            },
        }),
    })],
    ["globalFeed", ({apis, page}, next) => Load({
        _key: page.value,
        fetch: async () => await apis.article.getArticles({page: page.value}),
        next,
    })],
    ({globalFeed, apis, page, }) => (
        <div className="home-page">
            <div className="banner">
                <div className="container">
                    <h1 className="logo-font">conduit</h1>
                    <p>A place to share your knowledge.</p>
                </div>
            </div>

            <div className="container page">
                <div className="row">
                    <div className="col-md-9">
                        <div className="feed-toggle">
                            <ul className="nav nav-pills outline-active">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="">
                                        Your Feed
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link active" to="">
                                        Global Feed
                                    </NavLink>
                                </li>
                            </ul>
                        </div>

                        {globalFeed?.articles.map((article, i) => {
                            return (
                                <div key={i} className="article-preview">
                                    <div className="article-meta">
                                        <NavLink to="/profile/eric-simons">
                                            {/* <img src="http://i.imgur.com/Qr71crq.jpg" /> */}
                                            <img src={article.author.image}/>
                                        </NavLink>
                                        <div className="info">
                                            <NavLink to={`/profile/${article.author.username}`} className="author">
                                                {article.author.username}
                                            </NavLink>
                                            <span className="date">{formatDate(article.createdAt)}</span>
                                        </div>
                                        <button className="btn btn-outline-primary btn-sm pull-xs-right">
                                            <i className="ion-heart"></i> {article.favoritesCount}
                                        </button>
                                    </div>
                                    <NavLink
                                        to={`/article/${article.slug}`}
                                        className="preview-link"
                                    >
                                        <h1>{article.title}</h1>
                                        <p>{article.description}</p>
                                        <span>Read more...</span>
                                        <ul className="tag-list">
                                            {article.tagList.map((tag, i) => {
                                                <li key={i} className="tag-default tag-pill tag-outline">
                                                    {tag}
                                                </li>
                                            })}
                                        </ul>
                                    </NavLink>
                                </div>
                            );
                        })}

                        <ul className="pagination">
                            {[1, 2, 3].map((p1) => cs(
                                keyed(p1),
                                () => (
                                    <li {...{
                                        className: cx1("page-item", {active: p1 === page.value}),

                                        onClick: () => {
                                            page.onChange(p1);
                                        },
                                    }}>
                                        <a className="page-link">
                                            {p1}
                                        </a>
                                    </li>
                                ),
                            ))}
                            {/*<li className="page-item active">*/}
                            {/*    <a className="page-link" href="">*/}
                            {/*        1*/}
                            {/*    </a>*/}
                            {/*</li>*/}
                            {/*<li className="page-item">*/}
                            {/*<a {...{*/}
                            {/*        className: "page-link",*/}
                            {/*        href: "",*/}
                            {/*        onClick: () => {*/}
                            {/*            page.onChange(2);*/}
                            {/*        },*/}
                            {/*    }}>*/}
                            {/*        2*/}
                            {/*    </a>*/}
                            {/*</li>*/}
                        </ul>
                    </div>

                    <div className="col-md-3">
                        <div className="sidebar">
                            <p>Popular Tags</p>
                            <div className="tag-list">
                                {cs(
                                    ["tags", ({}, next) => Load({
                                        fetch: async () => await apis.tag.getTags(),
                                        next,
                                    })],
                                    ({tags}) => tags?.tags.map((tag, i) => (
                                        <NavLink key={i} to="" className="tag-pill tag-default">
                                            {tag}
                                        </NavLink>
                                    )),
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
);

