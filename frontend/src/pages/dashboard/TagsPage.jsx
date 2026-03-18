import AppLayout from "../../components/common/AppLayout";

function TagsPage() {
  return (
    <AppLayout>
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-800">Tags</h1>
        <p className="text-gray-400 text-sm mt-1">Manage your tags here.</p>
      </div>
    </AppLayout>
  );
}

export default TagsPage;