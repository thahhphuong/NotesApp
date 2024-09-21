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
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const Home = () => {
	let subtitle;
	const navigite = useNavigate();

	const [modalIsOpen, setIsOpenModal] = useState({
		isOpen: false,
		type: "add",
		data: null,
	});
	const [user, setUser] = useState(null);
	const [notes, allNotes] = useState([]);
	const [modalData, setModaldata] = useState(null);
	// const [deleteNote, setDeleteNote] = useState(false);

	const notify = () => toast.warn("Token invalid");

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
			// console.log({ data });
		} catch (error) {}
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
			if (error.error && error.message) {
				// notify();
				navigite("/login");
			}
		}
	};
	// delete note
	const handleDeleteNote = async (noteId) => {
		try {
			const response = await axisoInstance.delete(`${BASE_URL}/note/` + noteId);
			// if (!response.data?.error) {
			// 	console.log("vo dat ?");
			// 	setDeleteNote("true");
			// }
			setDeleteNote("true");
		} catch (error) {
			console.log("deleltError: ", error);
		}
	};

	const handleDeleteNoteSwal = (title) => {
		withReactContent(Swal)
			.fire({
				title: "<h5 style='color:red'>" + title + "</h5>",
				text: "Do you want to delete this note? ",
				showCancelButton: true,
				confirmButtonText: "Delete note",
				confirmButtonColor: "#d33",
				cancelButtonColor: "#6e7d88",
			})
			.then((result) => {
				/* Read more about isConfirmed, isDenied below */
				if (result.isConfirmed) {
					handleDeleteNote(id);
					Swal.fire({
						title: "delete successfully",
						icon: "success",
					}).then((button) => {
						if (button.isConfirmed) {
							location.reload();
						}
					});
				}
			});
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
							onDelete={() => {
								handleDeleteNoteSwal(e.title);
							}}
							onEdit={() => {
								setIsOpenModal({
									isOpen: true,
									type: "edit",
									data: null,
								}),
									setModaldata(e);
							}}
							onCreate={() => {}}
						/>
					))}
				</div>
			</div>
			<button
				className="w-16 h-16 flex items-center justify-center rounded bg-purple-400 absolute right-10 bottom-2"
				onClick={() => {
					setIsOpenModal({
						isOpen: true,
						type: "add",
						data: null,
					}),
						setModaldata("");
				}}
			>
				<MdAdd className="text-[32px] text-white" />
			</button>
			<Modal
				isOpen={modalIsOpen.isOpen}
				ariaHideApp={false}
				onAfterOpen={afterOpenModal}
				onRequestClose={() =>
					setIsOpenModal({
						data: null,
						type: "close",
						isOpen: false,
					})
				}
				style={customStyles}
				contentLabel="Example Modal"
			>
				<AddNote
					noteData={modalData}
					onClose={() => {
						setIsOpenModal({ data: null, type: "close", isOpen: false }), setModaldata("");
					}}
					type={modalIsOpen.type}
				/>
			</Modal>
		</>
	);
};

export default Home;
