import { cs } from "../../common/chain-services.js";
import { Layout } from "../layout/layout.jsx";
import { EmptyFC } from "../../common/react/empty-fc.js";
import { useNavigate } from "react-router-dom";

export const ArticleForm = () => {
  return cs(
    ({}, next) => EmptyFC({ next }),
    ["navigate", ({}, next) => next(useNavigate())],
    ({}, next) => <Layout>{next()}</Layout>,
    ({ navigate }) => {
      return (
        <div className="editor-page">
          <div className="container page">
            <div className="row">
              <div className="col-md-10 offset-md-1 col-xs-12">
                <ul className="error-messages">
                  <li>That title is required</li>
                </ul>

                <form>
                  <fieldset>
                    <fieldset className="form-group">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Article Title"
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="What's this article about?"
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <textarea
                        className="form-control"
                        rows="8"
                        placeholder="Write your article (in markdown)"
                      ></textarea>
                    </fieldset>
                    <fieldset className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter tags"
                      />
                      <div className="tag-list">
                        <span className="tag-default tag-pill">
                          {" "}
                          <i className="ion-close-round"></i> tag{" "}
                        </span>
                      </div>
                    </fieldset>
                    <button
                      className="btn btn-lg pull-xs-right btn-primary"
                      type="button"
                      onClick={() => {
                        navigate("/article/fasdf");
                      }}
                    >
                      Publish Article
                    </button>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
  );
};
