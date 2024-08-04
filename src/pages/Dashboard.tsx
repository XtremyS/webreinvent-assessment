import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import SearchBar from "../components/SearchBar";
import UserList from "../components/UserList";
import { User } from "../utils/types";
import data from "../utils/userData.json";
import { clearUser } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import AlertBox from "../components/AlertBox";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [alertDetails, setAlertDetails] = useState({
    isOpen: false,
    message: "",
    duration: 3000,
    position: "bottom",
    type: "success",
  });

  useEffect(() => {
    const processedUsers = data.map((user) => {
      const age = new Date().getFullYear() - new Date(user.dob).getFullYear();
      return { ...user, age };
    });
    setUsers(processedUsers);
  }, []);

  const filteredUsers = users.filter((user) =>
    `${user.first} ${user.last}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  const handleLogout = () => {
    setAlertDetails({
      isOpen: true,
      message: "Logout successfully, Redirecting in 3 seconds...",
      duration: 3000,
      position: "top",
      type: "success",
    });
    setTimeout(() => {
      dispatch(clearUser());
      navigate("/signin");
    }, 2000);
  };

  if (!isAuthenticated) {
    return (
      <div className="text-red-500">
        Please sign in to access the dashboard.
      </div>
    );
  }

  return (
    <React.Fragment>
      {alertDetails.isOpen && (
        <AlertBox
          message={alertDetails.message}
          duration={alertDetails.duration}
          onClose={() =>
            setAlertDetails({
              ...alertDetails,
              isOpen: false,
            })
          }
          position={alertDetails.position}
          type={alertDetails.type}
        />
      )}
      <div className="container mx-auto p-4">
        <div className="flex justify-end">
          <button
            onClick={handleLogout}
            type="button"
            className="py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          >
            Logout
          </button>
        </div>
        <h1 className="text-2xl text-center font-bold mb-4">User Dashboard</h1>
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <UserList users={filteredUsers} setUsers={setUsers} />
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
