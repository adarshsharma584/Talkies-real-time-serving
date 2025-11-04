import React from "react";
import MessageContainer from "./MessageContainer.jsx";
import SideBar from "./SideBar.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";

function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.userReducer);

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Layout>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        <SideBar />
        <div className="flex-1">
          <MessageContainer />
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
