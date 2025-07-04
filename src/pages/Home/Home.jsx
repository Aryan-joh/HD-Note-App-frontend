import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import moment from "moment";
import Toast from "../../components/ToastMessage/Toast";

Modal.setAppElement("#root");

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const [userInfo, setUserInfo] = useState(null);
  const [notes, setNotes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const showToastMessage = (message, type = "info") => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    });
  };

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
    });
  };

  const fetchNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data && !response.data.error) {
        setNotes(response.data.notes);
        setIsSearch(false);
      }
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    }
  };

  const deleteNote = async (data) => {
    try {
      const response = await axiosInstance.delete(`/delete-note/${data._id}`);
      if (response.data && !response.data.error) {
        showToastMessage("Note Deleted Successfully", "delete");
        fetchNotes();
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: { query },
      });

      if (response.data && response.data.notes) {
        setIsSearch(true);
        setNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateIsPinned = async (noteData) => {
    try {
      const response = await axiosInstance.put(`/update-note-pinned/${noteData._id}`, {
        isPinned: !noteData.isPinned,
      });

      if (response.data && response.data.note) {
        showToastMessage("Note Updated Successfully", "update");
        fetchNotes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    fetchNotes();
  };

  useEffect(() => {
    getUserInfo();
    fetchNotes();
  }, []);

  const handleOpenModal = () => {
    setOpenAddEditModal({
      isShown: true,
      type: "add",
      data: null,
    });
  };

  const handleCloseModal = () => {
    setOpenAddEditModal({
      isShown: false,
      type: "add",
      data: null,
    });
  };

  return (
    <>
      <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Welcome, {userInfo?.fullName || "User"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {notes.length === 0 ? (
            <div className="text-gray-500 col-span-full text-center">No notes available.</div>
          ) : (
            notes.map((note) => (
              <NoteCard
                key={note._id}
                title={note.title}
                date={moment(note.createdOn).format("DD MMM YYYY, h:mm A")}
                content={note.content}
                tags={note.tags?.join(", ")}
                isPinned={note.isPinned}
                onEdit={() =>
                  setOpenAddEditModal({
                    isShown: true,
                    type: "edit",
                    data: note,
                  })
                }
                onDelete={() => deleteNote(note)}
                onPinNote={() => updateIsPinned(note)}
              />
            ))
          )}
        </div>
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-full bg-[#2B85FF] hover:bg-blue-600 text-white text-3xl shadow-lg transition-colors duration-200 fixed right-6 bottom-6 sm:right-10 sm:bottom-10 z-50"
        onClick={handleOpenModal}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={handleCloseModal}
        overlayClassName="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center"
        className="bg-white rounded-lg p-4 sm:p-6 w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] max-w-xl outline-none shadow-xl"
        contentLabel="Add or Edit Note"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={handleCloseModal}
          getAllNotes={fetchNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>

      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default Home;
