export const EditNote = ({ setModalOpen, setType, dataObj }) => {
    return (
      <>
        <button
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
          onClick={() => {
            setModalOpen(true);
            setType({
              header: "Edit",
              Route: "update",
              NoteTitle: dataObj.title,
              NoteContent: dataObj.content,
              data_id: dataObj._id,
            });
          }}
        >
          Edit
        </button>
      </>
    );
  };