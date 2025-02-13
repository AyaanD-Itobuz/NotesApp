import react from "react";
import { useState } from "react";
import ReactModal from "react-modal";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ToastContainer , toast } from "react-toastify";
import { NoteCard } from "../components/NoteCard";


const notifySuccess = (msg) => toast.success(msg, { autoClose: 2000 });
const notifyError = (msg) => toast.error(msg, { autoClose: 2000 });  
export function Notes() {
  const [isModalOpen, setModalOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const [render, setrender] = useState();
  const [type, setType] = useState({
    header: "Create",
    Route: "create",
    NoteTitle: "",
    NoteContent: "",
    data_id:""
  });



  const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) {
      return null;
    }

    return (
      <>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6    relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              <img
                className="h-8 w-8"
                src="src/assets/closeIcon.jpg"
                alt="Close"
              />
            </button>
            {children}
          </div>
        </div>
      </>
    );
  };

  const CreateModal = ({ isOpen, onClose }) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="flex flex-col gap-5">
          <h2 className="text-lg font-bold">Create Note</h2>
          <form action="#" onSubmit={handleSubmit(createNote)}>
            <div className="flex flex-col gap-5">
              <input
                type="text"
                className="ps-2 min-w-[28vw] min-h-[5vh]"
                placeholder="Enter Title"
                {...register("title")}
              />

              <textarea
                aria-label="Post Content"
                type="text"
                placeholder="Start Typing. . ."
                id="content"
                className="min-h-[20vh] min-w-[28vw] p-5 placeholder:text-2xl text-2xl"
                {...register("content")}
              />
            </div>
            <div className="flex justify-center items-center">
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                type="submit"
              >
                Save Note
              </button>
            </div>
          </form>
        </div>
      </Modal>
    );
  };


  const createNote = async (data) => {
    const access_token = localStorage.getItem("accessToken");
    // const refresh_token = localStorage.getItem("refreshToken");
    // console.log("Access T: ",access_token)
    // console.log("Refresh T: ",refresh_token)

    try{
      const response = await axios.post("http://localhost:8000/noteData/createNote" , data,{
        headers : {
          Authorization :  `Bearer ${access_token}`,
          "Content-Type" : "application/json"
        }});
        
        notifySuccess("Note Successfully Created")
        // console.log(response.data.status)
    }
    catch(error)
    {
      notifyError("Title Already Exists")
      console.log(error)
    }
  };

  async function getNotes() {
    try{

    }
    catch(error)
    {
      console.log(error)
      notifyError("Error Occured")
    }
  }

  return (
    <>
      <div className="h-[89.8vh] flex flex-col items-center justify-center bg-[#1f2937]">
        <div>
          <button
            onClick={() => setModalOpen(true)}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
              Create Note
            </span>
          </button>
          <CreateModal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
          />
        </div>
        <div className="flex flex-row flex-wrap gap-8 justify-center items-center">
          <NoteCard
            setrender={setrender}
            render={render}
            onClose={() => setModalOpen(false)}
            setModalOpen={setModalOpen}
            setType={setType}
          />
        </div>
      </div>
    </>
  );
}
