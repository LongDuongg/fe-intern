import { Layout } from "../layout/layout.jsx";
import { NavLink } from "react-router-dom";


import apis from "../../apis/apis.js";
import { cs } from "../../common/chain-services.js";
import { Load } from "../../common/react/load.js";
import { formatDate } from "../../common/utils/date.js";


export const Home = () => {
  return cs(
    ({}, next) => <Layout>{next()}</Layout>,
    ["tags", ({}, next) => Load({ fetch: async () => await apis.tag.getTags(), next })],
    ["globalFeed", ({}, next) => Load({ fetch: async () => await apis.article.getArticles(), next })],
    ({tags, globalFeed}) => {
      console.log(globalFeed);
      return (
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

                {globalFeed?.articles.map((article,i) => {
                  return (
                    <div key={i} className="article-preview">
                      <div className="article-meta">
                        <NavLink to="/profile/eric-simons">
                          {/* <img src="http://i.imgur.com/Qr71crq.jpg" /> */}
                          <img src={article.author.image} />
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
                          {article.tagList.map((tag,i) => {
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

              <div className="col-md-3">
                <div className="sidebar">
                  <p>Popular Tags</p>
                  <div className="tag-list">
                    {tags?.tags.map((tag,i) => (
                      <NavLink key={i} to="" className="tag-pill tag-default">
                       {tag}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  );
};
