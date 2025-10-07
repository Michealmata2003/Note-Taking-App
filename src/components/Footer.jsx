function Footer() {
  return (
        <footer className="bg-white shadow-md px-3 mt-4 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-center w-full px-3 py-3">
                <div className="flex justify-between space-x-2 text-gray-500">
                    <p>Privacy Policy</p>
                    <p>Terms of Use</p>
                </div>
                <div className="flex justify-between space-x-2">
                    <p className="text-gray-500">2025&copy;</p>
                    <p>NotePlus</p>
                </div>
            </div>
        </footer>
  )
}

export default Footer
