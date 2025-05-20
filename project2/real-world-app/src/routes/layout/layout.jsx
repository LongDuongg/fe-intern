import { NavLink } from "react-router-dom";

export const Layout = ({ children }) => {
  return (
    <>
      <nav className="navbar navbar-light">
        <div className="container">
          <NavLink className="navbar-brand" href="/">
            conduit
          </NavLink>
          <ul className="nav navbar-nav pull-xs-right">
            {/* process authen and unauthen user here  */}
            <li className="nav-item">
              <NavLink className="nav-link" href="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" href="/#/login">
                Sign in
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" href="/#/register">
                Sign up
              </NavLink>
            </li>

            {/* <li className="nav-item">
            <NavLink className="nav-link active" href="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" href="/editor">
              {" "}
              <i className="ion-compose"></i>&nbsp;New Article{" "}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" href="/settings">
              {" "}
              <i className="ion-gear-a"></i>&nbsp;Settings{" "}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" href="/profile/eric-simons">
              <img src="" className="user-pic" />
              Eric Simons
            </NavLink>
          </li> */}
          </ul>
        </div>
      </nav>

      {children}

      <footer>
        <div className="container">
          <a href="/" className="logo-font">
            conduit
          </a>
          <span className="attribution">
            An interactive learning project from{" "}
            <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
            licensed under MIT.
          </span>
        </div>
      </footer>
    </>
  );
};
