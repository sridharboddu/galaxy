import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Header() {
  return (
    <div className="App">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            Galaxy
          </a>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <Link to="/" class="nav-link active" aria-current="page" href="#">
                Home
              </Link>
              <Link to="/About" class="nav-link" href="#">
                About
              </Link>
              <Link to="/FlowTrace" class="nav-link" href="#">
                FlowTrace
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
