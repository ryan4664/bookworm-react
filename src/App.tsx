import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import PrivateRoute from "./components/PrivateRoute";
import { useAuth0 } from "./react-auth0-spa";
import history from "./utils/history";
import initFontAwesome from "./utils/initFontAwesome";
import Home from "./views/Home";
import Profile from "./views/Profile";
import Books from "./views/Books";

initFontAwesome();

const App = () => {
  const { loading } = useAuth0();

  if (loading) {
    return <Loading />;
  }

  return (
    <Router history={history}>
      <div id="app" className="d-flex flex-column h-100">
        <NavBar />
        <Container className="flex-grow-1 mt-5">
          <Switch>
            <Route path="/" exact component={Home} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/books" component={Books} />
          </Switch>
        </Container>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
