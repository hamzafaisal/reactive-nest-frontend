import React from "react";
import Layout from "./components/layout/Layout";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Suspense } from "react";
import Loader from "./components/UI/loader/Loader";
import AuthContextProvider from "./contexts/AuthContext";
import SinglePost from "./pages/posts/SinglePost";

const Home = React.lazy(() => import("./pages/Home"));
const About = React.lazy(() => import("./pages/About"));
const AddPost = React.lazy(() => import("./pages/posts/AddPost"));
const EditPost = React.lazy(() => import("./pages/posts/EditPost"));
// const SinglePost = React.lazy(() => import("./pages/posts/SinglePost"));
const Signup = React.lazy(() => import("./pages/auth/Signup"));
const Login = React.lazy(() => import("./pages/auth/Login"));

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <div className="App">
          <Layout>
            <Switch>
              <Route
                path="/"
                exact
                render={() => (
                  <Suspense fallback={<Loader />}>
                    <Home />
                  </Suspense>
                )}
              />
              <Route
                path="/about"
                render={() => (
                  <Suspense fallback={<Loader />}>
                    <About />
                  </Suspense>
                )}
              />
              <Route
                path="/add-post"
                render={() => (
                  <Suspense fallback={<Loader />}>
                    <AddPost />
                  </Suspense>
                )}
              />
              <Route
                path="/login"
                render={() => (
                  <Suspense fallback={<Loader />}>
                    <Login />
                  </Suspense>
                )}
              />
              <Route
                path="/signup"
                render={() => (
                  <Suspense fallback={<Loader />}>
                    <Signup />
                  </Suspense>
                )}
              />

              <Route
                path="/post/edit/:id"
                render={() => (
                  <Suspense fallback={<Loader />}>
                    <EditPost />
                  </Suspense>
                )}
              />
              <Route path="/post/:id">
                <SinglePost />
              </Route>
            </Switch>
          </Layout>
        </div>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
