import { useState} from "react";

function UserProfile() {
  const [name, setName] = useState(localStorage.getItem("username") || "");
  const [message, setMessage] = useState("");

  // Generate initials from name (e.g. "Vivek Kumar" -> "VK")
  const getInitials = (fullName) => {
    if (!fullName) return "U";
    const words = fullName.trim().split(" ");
    if (words.length === 1) return words[0][0].toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  const handleUpdate = () => {
    if (!name.trim()) {
      alert("Name cannot be empty");
      return;
    }
    localStorage.setItem("username", name.trim());
    setMessage("✅ Profile updated locally");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-md rounded">
      {/* User Card with round dummy avatar and name */}
      <div className="flex items-center space-x-4 mb-6">
        <div
          aria-label="User Avatar"
          className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-2xl select-none"
          title={name || "User"}
        >
          {getInitials(name)}
        </div>
        <h2 className="text-2xl font-semibold">{name || "User"}</h2>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="w-full px-4 py-2 border rounded"
          aria-label="Enter your name"
        />

        <button
          onClick={handleUpdate}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          aria-label="Update Profile"
        >
          Update Profile
        </button>

        {message && <p className="text-center text-green-600">{message}</p>}
      </div>
    </div>
  );
}

export default UserProfile;
