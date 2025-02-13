import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { EditNote } from "./EditNote";

const access_token = localStorage.getItem("accessToken");
const user = localStorage.getItem("userName");

let data = "";
const notifySuccess = (msg) => toast.success(msg, { autoClose: 2000 });
const notifyError = (msg) => toast.error(msg, { autoClose: 2000 });

export const NoteCard = ({ setrender, render, setModalOpen, setType }) => {
  const [cards, setCards] = useState([]);

  //Fetching Notes
  const fetchInfo = async () => {
    const response = await axios.get(
      `http://localhost:8000/noteData/getAllNote`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );
    data = await response.data.data;
    data.forEach((value) => {
      let date = value.createdAt;
      let newDate = date.slice(0, 10);
      value.createdAt = newDate;
    });
    setCards(data);
  };

  //Deleting Notes
  const deleteCards = async () => {
    try {
      console.log(access_token);
      const response = await axios.delete("http://localhost:8000/noteData/deleteNote" , 
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.data.status === 200) {
        notifySuccess("success");
        setrender(!render);
      }
      if (response.data.status === 404) {
        notifyError("not exist");
      }
    } catch (error) {
      console.log(error);
      notifyError("fail");
    }
  };

  useEffect(() => {
    fetchInfo();
  }, [render]);

  return (
    <>
      {cards.map((dataObj, index) => {
        return (
          <div key={index} className="flex flex-col bg-white rounded-lg shadow-lg min-w-[30vw] min-h-[25vh] max-w-[30vw]  max-h-[25vh] p-6 justify-center items-center">
            <div className="flex flex-col gap-5 min-w-[25vw]">
                <div className="text-center text-black title">{dataObj.title}</div>
                <div className="overflow-scroll break-words h-20 content">{dataObj.content}</div>
                <div className="flex flex-row  justify-between">
                    <div className="flex items-end createdAt">{dataObj.createdAt}</div>
                    <div className="flex flex-row gap-2">
                        <div className="edit">
                            <EditNote
                            setModalOpen={setModalOpen}
                            setType={setType}
                            dataObj={dataObj}
                            ></EditNote>
                        </div>
                        <div className="delete">
                            <button className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center  cursor-pointer"
                            onClick={() => deleteCards(dataObj._id)}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
