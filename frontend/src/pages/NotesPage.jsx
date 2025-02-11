import react from "react";
import { useState } from "react";
import ReactModal from "react-modal";
// function CreateNote() {}

const Modal = ({ isOpen, closeModal }) => {
    if (!isOpen) return null; // Don't render modal if it's not open
  
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-semibold mb-4">This is a modal</h2>
          <p className="mb-4">You can place your modal content here.</p>
          <button
            onClick={closeModal}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Close Modal
          </button>
        </div>
      </div>
    );
};

export function Notes() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
      setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

  return (
    <>
      <div className="flex justify-center items-center h-[91.2vh] bg-[#1f2937]">
        <button
            onClick={() => openModal}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
            Create Note
          </span>
        </button>
        <Modal isOpen={isModalOpen} closeModal={closeModal} />
        
        
      </div>
    </>
  );
}
