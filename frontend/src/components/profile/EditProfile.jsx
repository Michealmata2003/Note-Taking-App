import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiSave, FiArrowLeft, FiEye, FiEyeOff } from "react-icons/fi";
import api from "../../utils/api";

function EditProfile() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("profile");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(profileForm.name || "User")}&background=1e646e&color=fff&size=128`;

  const handleProfileSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError("");
      setSuccess("");
      const res = await api.put("/auth/me", { name: profileForm.name });
      // Update auth context with new name
      login({ ...user, name: res.data.user?.name || profileForm.name });
      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError("New passwords do not match");
      return;
    }
    try {
      setSaving(true);
      setError("");
      setSuccess("");
      await api.put("/auth/change-password", {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      setSuccess("Password changed successfully!");
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to change password");
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { key: "profile", label: "Edit Profile" },
    { key: "password", label: "Change Password" },
  ];

  return (
    <main className="p-4 lg:p-6 flex-1">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Page Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/profile")}
            className="p-2 rounded-lg hover:bg-gray-200 text-gray-500 transition-colors"
          >
            <FiArrowLeft className="text-lg" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-gray-800">Account Settings</h1>
            <p className="text-xs text-gray-400">Manage your profile and password</p>
          </div>
        </div>

        {/* Avatar Preview */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex items-center gap-5">
          <img src={avatarUrl} alt="avatar" className="w-20 h-20 rounded-2xl object-cover border-4 border-gray-100" />
          <div>
            <p className="text-sm font-semibold text-gray-800">{profileForm.name || "User"}</p>
            <p className="text-xs text-gray-400 mt-0.5">{user?.email}</p>
            <p className="text-xs mt-2 text-gray-400">Avatar is auto-generated from your name</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex border-b border-gray-100">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => { setActiveTab(tab.key); setError(""); setSuccess(""); }}
                className={`flex-1 py-3.5 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === tab.key
                    ? "border-current"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
                style={activeTab === tab.key ? { color: "#1e646e", borderColor: "#1e646e" } : {}}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Alerts */}
            {error && (
              <div className="mb-4 px-4 py-3 bg-red-50 border border-red-100 rounded-xl">
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}
            {success && (
              <div className="mb-4 px-4 py-3 bg-green-50 border border-green-100 rounded-xl">
                <p className="text-green-600 text-sm">{success}</p>
              </div>
            )}

            {/* Profile Form */}
            {activeTab === "profile" && (
              <form onSubmit={handleProfileSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={profileForm.email}
                    disabled
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none bg-gray-50 text-gray-400 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => navigate("/profile")}
                    className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-sm font-medium disabled:opacity-60 transition-colors"
                    style={{ backgroundColor: "#002c2f" }}
                  >
                    {saving ? (
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                    ) : <FiSave />}
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            )}

            {/* Password Form */}
            {activeTab === "password" && (
              <form onSubmit={handlePasswordSave} className="space-y-4">
                {[
                  { key: "current", label: "Current Password", field: "currentPassword" },
                  { key: "new", label: "New Password", field: "newPassword" },
                  { key: "confirm", label: "Confirm New Password", field: "confirmPassword" },
                ].map((item) => (
                  <div key={item.key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{item.label}</label>
                    <div className="relative">
                      <input
                        type={showPasswords[item.key] ? "text" : "password"}
                        value={passwordForm[item.field]}
                        onChange={(e) => setPasswordForm({ ...passwordForm, [item.field]: e.target.value })}
                        required
                        placeholder="••••••••"
                        className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-50 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords({ ...showPasswords, [item.key]: !showPasswords[item.key] })}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPasswords[item.key] ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>
                ))}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => navigate("/profile")}
                    className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-sm font-medium disabled:opacity-60 transition-colors"
                    style={{ backgroundColor: "#002c2f" }}
                  >
                    {saving ? (
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                    ) : <FiSave />}
                    {saving ? "Saving..." : "Change Password"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}

export default EditProfile;