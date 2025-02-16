import { useState, useCallback, useMemo , memo } from "react";

// Mock list of users
const users = [
  { id: 1, name: "Alice", isFollowing: false },
  { id: 2, name: "Bob", isFollowing: true },
  { id: 3, name: "Charlie", isFollowing: false },
];

const UserList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [followedUsers, setFollowedUsers] = useState(users);

  // 1. Optimize filtering with useMemo
  const filteredUsers = useMemo(() => {
    console.log("Filtering users...");
    return followedUsers.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, followedUsers]);

  // 2. Memoize the follow/unfollow handler with useCallback
  const handleFollowToggle = useCallback((id) => {
    setFollowedUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, isFollowing: !user.isFollowing } : user
      )
    );
  }, []);

  return (
    <div>
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search users"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* User List */}
      <ul>
        {filteredUsers.map((user) => (
          <UserItem
            key={user.id}
            user={user}
            onToggleFollow={handleFollowToggle}
          />
        ))}
      </ul>
    </div>
  );
};

// Memoized UserItem to avoid unnecessary re-renders
const UserItem = memo(({ user, onToggleFollow }) => {
  console.log(`Rendering user: ${user.name}`);
  return (
    <li>
      {user.name}{" "}
      <button onClick={() => onToggleFollow(user.id)}>
        {user.isFollowing ? "Unfollow" : "Follow"}
      </button>
    </li>
  );
});

export default UserList;
