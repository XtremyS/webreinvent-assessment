import React, { useState } from "react";
import UserCard from "./UserCard";
import { User, UserListProps } from "../utils/types";

const UserList: React.FC<UserListProps> = ({ users, setUsers }) => {
  const [openUserId, setOpenUserId] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setOpenUserId(openUserId === id ? null : id);
  };

  const handleEdit = (updatedUser: User) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const handleDelete = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div>
      {users.length === 0 ? (
        <div className="flex justify-center h-72 items-center">
          <p className="italic">No User Found!</p>
        </div>
      ) : (
        <React.Fragment>
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              isOpen={user.id === openUserId}
              onToggle={() => handleToggle(user.id)}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </React.Fragment>
      )}
    </div>
  );
};

export default UserList;
