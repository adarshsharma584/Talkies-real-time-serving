import React from "react";
import MessageContainer from "./MessageContainer.jsx";
import SideBar from "./SideBar.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { getUserProfileThunk, getOtherParticipantsProfileThunk } from "../../redux/user/user.thunk";

function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.userReducer);

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  React.useEffect(() => {
    if (isAuthenticated) {
      // Ensure we have user profile and list of other users on entering home
      dispatch(getUserProfileThunk());
      dispatch(getOtherParticipantsProfileThunk());
    }
  }, [isAuthenticated, dispatch]);

  return (
    <Layout>
      <div className="flex h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <SideBar />
        <div className="flex-1">
          <MessageContainer />
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
