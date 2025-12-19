import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./Components/Body";
import LogIn from "./Components/LogIn";
import Home from "./Components/Home";
import Profile from "./Components/Profile";
import UpdateProfile from "./Components/UpdateProfile";
import NewPostPage from "./Components/NewPostPage";
import { Provider } from "react-redux";
import appStore, { persistor } from "./utils/appStore";
import ProtectRoute from "./Components/protectRoute";
import PostPage from "./Components/PostPage";
import { PersistGate } from "redux-persist/integration/react";
import AllPost from "./Components/AllPost";
import SearchedPost from "./Components/SearchedPost";

function App() {
  return (
    <div>
      <Provider store={appStore}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter basename="/">
            <Routes>
              <Route path="/" element={<Body />}>
                <Route path="/login" element={<LogIn />} />
                <Route path="/" element={<Home />} />
                <Route
                  path="/profile"
                  element={
                    <ProtectRoute>
                      <Profile />
                    </ProtectRoute>
                  }
                />
                <Route
                  path="/updateprofile"
                  element={
                    <ProtectRoute>
                      <UpdateProfile />
                    </ProtectRoute>
                  }
                />
                <Route
                  path="/newpostpage"
                  element={
                    <ProtectRoute>
                      <NewPostPage />
                    </ProtectRoute>
                  }
                />
                <Route
                  path="/allpost"
                  element={
                    <ProtectRoute>
                      <AllPost />
                    </ProtectRoute>
                  }
                />
                <Route
                  path="/postpage"
                  element={
                    <ProtectRoute>
                      <PostPage />
                    </ProtectRoute>
                  }
                />
                <Route
                  path="/searchedpost"
                  element={
                    <ProtectRoute>
                      <SearchedPost />
                    </ProtectRoute>
                  }
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
