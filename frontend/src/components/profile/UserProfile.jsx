import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { BsPencil } from "react-icons/bs";
import { FiMail, FiUser, FiCalendar, FiFileText } from "react-icons/fi";

function UserProfile() {
  const { user } = useAuth();

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=1e646e&color=fff&size=128`;

  const infoItems = [
    { icon: <FiUser />, label: "Full Name", value: user?.name || "—" },
    { icon: <FiMail />, label: "Email Address", value: user?.email || "—" },
    { icon: <FiCalendar />, label: "Member Since", value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "—" },
    { icon: <FiFileText />, label: "Account Type", value: "Standard" },
  ];

  return (
    <main className="p-4 lg:p-6 flex-1">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

          {/* Cover */}
          <div className="h-32 w-full" style={{ background: "linear-gradient(135deg, #002c2f 0%, #1e646e 100%)" }} />

          {/* Avatar + Name */}
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-12">
              <div className="relative">
                <img
                  src={avatarUrl}
                  alt={user?.name}
                  className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-md"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white" />
              </div>
              <Link
                to="/profile/edit"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium transition-colors self-start sm:self-auto"
                style={{ backgroundColor: "#002c2f" }}
              >
                <BsPencil className="text-sm" />
                Edit Profile
              </Link>
            </div>

            <div className="mt-4">
              <h1 className="text-xl font-bold text-gray-800">{user?.name || "User"}</h1>
              <p className="text-sm text-gray-400 mt-0.5">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-5">Profile Information</h2>
          <div className="space-y-4">
            {infoItems.map((item, i) => (
              <div key={i} className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#f0f9f9" }}>
                  <span style={{ color: "#1e646e" }}>{item.icon}</span>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">{item.label}</p>
                  <p className="text-sm font-semibold text-gray-700 mt-0.5">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Edit Profile", desc: "Update your name and info", to: "/profile/edit", color: "#002c2f" },
            { label: "Change Password", desc: "Keep your account secure", to: "/settings", color: "#1e646e" },
            { label: "Your Notes", desc: "View all your notes", to: "/dashboard", color: "#6366f1" },
          ].map((action) => (
            <Link
              key={action.label}
              to={action.to}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition-all group"
            >
              <div className="w-9 h-9 rounded-xl mb-3" style={{ backgroundColor: action.color }} />
              <p className="text-sm font-semibold text-gray-800 group-hover:text-teal-700 transition-colors">{action.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{action.desc}</p>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}

export default UserProfile;