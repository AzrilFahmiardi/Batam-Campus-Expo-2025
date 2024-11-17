const Popup = ({ title, message, isOpen, setIsOpen }) => {
  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-200 ${
        isOpen ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        className={`transform rounded-xl bg-white p-5 shadow-lg transition-transform duration-300 ${
          isOpen ? "scale-100" : "scale-90"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="mt-4">{message}</p>
        <div className="mt-6 flex justify-end">
          <button
            className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
