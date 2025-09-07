import "../styles/modal.css"

export function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modalPanel">
      <div className="modalScreen">
        {children}
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
          ✕
        </button>
      </div>
    </div>
  );
}
