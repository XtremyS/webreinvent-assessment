import React, { useState, useEffect } from "react";
import { UserCardProps } from "../utils/types";
import ConfirmPopup from "../components/ConfirmPopup ";

const UserCard: React.FC<UserCardProps> = ({
  user,
  isOpen,
  onToggle,
  onEdit,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const hasChanges = JSON.stringify(user) !== JSON.stringify(editedUser);
    const isValid =
      editedUser.age > 0 &&
      editedUser.country !== "" &&
      editedUser.description !== "";
    setIsSaveEnabled(hasChanges && isValid);
  }, [editedUser, user]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSave = () => {
    if (isSaveEnabled) {
      onEdit(editedUser);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  const handleDelete = () => {
    setIsPopupOpen(true);
  };

  return (
    <React.Fragment>
      <ConfirmPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onConfirm={() => onDelete(user.id)}
      />
      <div className="border border-gray-300 rounded-lg shadow-sm p-6 mb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img
              src={user.picture}
              alt={user.first}
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              {isEditing ? (
                <div className="flex gap-4">
                  <input
                    type="text"
                    name="first"
                    value={editedUser.first}
                    onChange={handleInputChange}
                    className="border rounded-lg p-2 mb-2 w-full"
                    disabled
                  />
                  <input
                    type="text"
                    name="last"
                    value={editedUser.last}
                    onChange={handleInputChange}
                    className="border rounded-lg p-2 mb-2 w-full"
                    disabled
                  />
                </div>
              ) : (
                <h2 className="text-lg font-semibold">
                  {user.first} {user.last}
                </h2>
              )}
            </div>
          </div>
          <button
            onClick={onToggle}
            className={`text-xl ${isEditing && "cursor-not-allowed"}`}
            disabled={isEditing}
          >
            <img
              src="/down-chevron.png"
              alt={user.first}
              className={`w-6 h-6 rounded-full mr-4 ${
                isOpen ? "rotate-180" : ""
              } `}
            />
          </button>
        </div>

        {isOpen && (
          <div className="mt-4">
            {!isEditing ? (
              <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <div>
                    <h2 className="text-gray-400">Age</h2>
                    <p>{user.age} Years</p>
                  </div>
                  <div>
                    <h2 className="text-gray-400">Gender</h2>
                    <p className="capitalize">{user.gender}</p>
                  </div>
                  <div>
                    <h2 className="text-gray-400">Country</h2>
                    <p>{user.country}</p>
                  </div>
                </div>
                <div>
                  <h2 className="text-gray-400">Description</h2>
                  <p>{user.description}</p>
                </div>
                <div className="flex justify-end items-center gap-4">
                  {user.age >= 18 && (
                    <div onClick={() => setIsEditing(true)}>
                      <img
                        src="/pencil.png"
                        className="w-5 h-5 cursor-pointer"
                        alt={user.first}
                      />
                    </div>
                  )}
                  <div onClick={handleDelete}>
                    <img
                      src="/delete.png"
                      className="w-5 h-5 cursor-pointer"
                      alt={user.first}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <div className="space-y-1">
                    <h2 className="text-gray-400">Age</h2>
                    <input
                      type="text"
                      name="age"
                      value={editedUser.age.toString()}
                      onChange={handleInputChange}
                      className="border rounded-lg p-2 mb-2 w-full"
                    />
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-gray-400">Gender</h2>
                    <select
                      name="gender"
                      value={editedUser.gender}
                      onChange={handleInputChange}
                      className="border rounded-lg p-2 mb-2 w-full"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Rather not say">Rather not say</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-gray-400">Country</h2>
                    <input
                      type="text"
                      name="country"
                      value={editedUser.country}
                      onChange={handleInputChange}
                      className="border rounded-lg p-2 mb-2 w-full"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <h2 className="text-gray-400">Description</h2>
                  <textarea
                    rows={5}
                    name="description"
                    value={editedUser.description}
                    onChange={handleInputChange}
                    className="border rounded-lg p-2 mb-2 w-full"
                  />
                </div>
                <div className="flex justify-end items-center gap-4">
                  <div onClick={handleCancel}>
                    <img
                      src="/cross.png"
                      className="w-6 h-6 cursor-pointer"
                      alt={user.first}
                    />
                  </div>
                  <div
                    onClick={handleSave}
                    className={`${
                      isSaveEnabled ? "cursor-pointer" : "cursor-not-allowed"
                    }`}
                  >
                    <img
                      src="/check.png"
                      className="w-6 h-6"
                      alt={user.first}
                      style={{ opacity: isSaveEnabled ? 1 : 0.5 }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default UserCard;
