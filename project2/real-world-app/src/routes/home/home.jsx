import { TagPanel } from "./tag-panel.jsx";
import { cs } from "../../common/chain-services.js";
import { Layout } from "../layout/layout.jsx";
import { FeedPanel } from "./feed-panel.jsx";

export const Home = () => {
  return cs(
    ({}, next) => <Layout>{next()}</Layout>,
    ({}) => {
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
              <div className="col-md-9">{FeedPanel()}</div>

              <div className="col-md-3">
                {TagPanel({ title: "Popular Tags" })}
              </div>
            </div>
          </div>
        </div>
      );
    }
  );
};
