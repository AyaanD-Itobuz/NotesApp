import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer , toast } from "react-toastify";
import { useEffect } from "react";



export const EditNote = ({ setEditModalOpen,render, setType, dataObj, setrender }) => {
  const notifySuccess = (msg) => toast.success(msg, { autoClose: 2000 });
  const notifyError = (msg) => toast.error(msg, { autoClose: 2000 });
  
  const access_token = localStorage.getItem("accessToken");
  const refresh_token = localStorage.getItem("refreshToken");


  const [isModalOpen, setModalOpen] = useState(false);
  const { register, handleSubmit } = useForm();  

  // async function fetchInfo() {
  //   const response = await axios.get(
  //     `http://localhost:8000/noteData/getAllNote`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${access_token}`,
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );

  //   const data = await response.data.data;
  //   // console.log("Data: ", data);

  //   data.forEach((value) => {
  //     let date = value.createdAt;
  //     let newDate = date.slice(0, 10);
  //     value.createdAt = newDate;
  //   });
  //   setCards(data);
  // };

  const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
      <div
        className="fixed inset-0 flex
                          items-center justify-center
                          bg-black bg-opacity-50"
      >
        <div
          className="bg-white rounded-lg
                              shadow-lg p-6 max-w-md
                              w-full relative"
        >
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
    );
  };

  // useEffect(() => {
  //   fetchInfo();
  // }, [render]);

  const EditModal = ({ isOpen, onClose }) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="flex flex-col gap-5">
          <h2 className="text-lg font-bold">Edit Note</h2>
          <form action="#" onSubmit={handleSubmit(editNote)}>
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

  const editNote = async(data) => {
    
    
    try{
      const id = dataObj._id;
      const updated_data={
        _id:id,
        title:data.title,
        content:data.content
      }
      
      const response = await axios.post("http://localhost:8000/noteData/updateNote" ,updated_data,
        {
          headers : {
            Authorization : `Bearer ${access_token}`,
            "Content-Type" : "application/json"
          }
        })
        if(response)
        {
          setrender(!render);
        }
        console.log(response);
        if(response.data.message == "Data not Found")
        {
          notifyError("")
        }
        else
        {
          notifySuccess("Successfully Updated")
        }
    }
    catch(error)
    {
      notifyError(error.message)
      console.log(error.message)
    }
  }
  return (
    <>

      <button
        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
        onClick={() => {
          setModalOpen(true);
          setType({
            // header: "Edit",
            // Route: "update",
            NoteTitle: dataObj.title,
            NoteContent: dataObj.content,
            data_id: dataObj._id,
          });
        }}
      >
        Edit
      </button>
      <EditModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

