import AppLayout from "../../components/common/AppLayout";

function SettingsPage() {
  return (
    <AppLayout>
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-400 text-sm mt-1">Manage your account settings.</p>
      </div>
    </AppLayout>
  );
}

export default SettingsPage;