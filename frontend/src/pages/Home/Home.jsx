import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Card/NoteCard";
import { MdAdd } from "react-icons/md";
import AddNote from "./AddNote";
import Modal from "react-modal";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import axisoInstance from "../../utils/aixosInstance";
import moment from "moment";
const Home = () => {
	let subtitle;
	const navigite = useNavigate();

	const [modalIsOpen, setIsOpen] = useState(false);
	const [user, setUser] = useState(null);
	const [notes, allNotes] = useState([]);

	const openModal = () => {
		setIsOpen(true);
	};
	const closeModal = () => {
		setIsOpen(false);
	};

	const customStyles = {
		content: {
			top: "50%",
			left: "50%",
			right: "auto",
			bottom: "auto",
			marginRight: "-50%",
			transform: "translate(-50%, -50%)",
		},
	};
	function afterOpenModal() {}
	const userInfo = async () => {
		try {
			const response = await axisoInstance.get(`${BASE_URL}/information`);
			const { data } = response.data;
			if (data) {
				setUser(response.data);
			}
		} catch (error) {
			console.log(error);
		}
	};
	// get all notes
	const getListNote = async () => {
		try {
			const response = await axisoInstance.get(`${BASE_URL}/note`);
			const { data } = response.data;
			if (data) {
				allNotes(data);
			}
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		userInfo();
		getListNote();
		return () => {};
	}, []);
	return (
		<>
			<Navbar userInfo={user} />

			<div className="container mx-auto">
				<div className="grid grid-cols-3 gap-4 mt-8">
					{notes.map((e, i) => (
						<NoteCard
							key={e._id}
							title={e.title}
							content={e.content}
							date={moment(e.created).format("DD/MM/YYYY")}
							isPinned={true}
							onPinNote={() => {}}
							tags={"#tag"}
							onDelete={() => {}}
							onEdit={() => {}}
							onCreate={() => {}}
						/>
					))}
				</div>
			</div>
			<button className="w-16 h-16 flex items-center justify-center rounded bg-purple-400 absolute right-10 bottom-2" onClick={openModal}>
				<MdAdd className="text-[32px] text-white" />
			</button>
			<Modal
				isOpen={modalIsOpen}
				ariaHideApp={false}
				onAfterOpen={afterOpenModal}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel="Example Modal"
			>
				<AddNote />
			</Modal>
		</>
	);
};

export default Home;
