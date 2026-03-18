function Modal({ isOpen, onClose, title, subtitle, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4">
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
        style={{ animation: "fadeSlideUp 0.3s ease forwards" }}
      >
        {/* Header */}
        {title && (
          <div className="mb-5">
            <h3 className="text-lg font-bold text-gray-800">{title}</h3>
            {subtitle && <p className="text-sm text-gray-400 mt-0.5">{subtitle}</p>}
          </div>
        )}

        {/* Content */}
        {children}
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default Modal;