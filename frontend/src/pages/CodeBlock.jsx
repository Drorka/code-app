import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Editor from "@monaco-editor/react";
import { setupSocketListeners, emitCodeChange } from "../sockets/index"; // Update the import path
import CongratulationsModal from "../components/CongratulationsModal";

function CodeBlock() {
	const { id } = useParams();
	const codeBlocks = useSelector((state) => state.codeBlocks);
	const currentCodeBlock = codeBlocks.find((block) => block._id === id);
	const [codeBlock, setCodeBlock] = useState(currentCodeBlock);
	const [isReadOnly, setIsReadOnly] = useState();
	const [isCorrect, setIsCorrect] = useState(false);

	useEffect(() => {
		function onUpdatedCode(updatedCode) {
			console.log("Setting up code-updated listener");
			setCodeBlock((prevCodeBlock) => ({
				...prevCodeBlock,
				code: updatedCode,
			}));
		}

		function onSetReadOnly(readOnly) {
			console.log("Setting read-only mode to", readOnly);
			setIsReadOnly(readOnly);
		}

		const cleanupSocketListeners = setupSocketListeners(
			id,
			onUpdatedCode,
			onSetReadOnly
		);

		return cleanupSocketListeners;
	}, [id]);

	function handleEditorChange(value) {
		setCodeBlock((prevCodeBlock) => ({
			...prevCodeBlock,
			code: value,
		}));
		emitCodeChange(id, value);
	}

	function submitCode() {
		let formattedAns = codeBlock.code.replace(/\s+/g, "").toLowerCase();
		let formattedSol = codeBlock.solution.replace(/\s+/g, "").toLowerCase();
		if (formattedAns === formattedSol) {
			setIsCorrect(true);
		}
	}

	return (
		<div className="h-screen flex flex-col">
			<nav className="bg-white shadow-md py-2 px-4">
				<div className="flex justify-between items-center text-center">
					<Link to="/" className="text-lg hover:font-bold">
						Home
					</Link>
					<span className="text-gray-600">
						{isReadOnly ? "Read Only" : "Edit Mode"}
					</span>
				</div>
			</nav>
			<section className="h-screen bg-gray-100 p-4 flex flex-col md:flex-row">
				<div className="bg-white rounded shadow-md md:w-1/3 p-4 mb-4 md:mr-4 md:h-[50%]">
					<h1 className="text-2xl font-bold mb-4">{codeBlock.title}</h1>
					<p>{codeBlock.instructions}</p>
				</div>
				<div className="bg-white rounded shadow-md flex-grow p-4 w-full md:w-2/3 overflow-hidden  relative">
					<h1 className="text-2xl font-bold mb-4">Code Editor</h1>
					<div className="overflow-y-auto h-[80%]">
						<Editor
							theme="vs-dark"
							defaultLanguage="javascript"
							language="javascript"
							value={codeBlock.code}
							onChange={handleEditorChange}
							options={{ readOnly: isReadOnly }}
						/>
					</div>
					<button
						onClick={submitCode}
						className="bg-blue-500 text-white px-4 py-2 mt-4 rounded absolute bottom-4 left-4"
					>
						Submit
					</button>
					{isCorrect && <CongratulationsModal setIsCorrect={setIsCorrect} />}
				</div>
			</section>
		</div>
	);
}

export default CodeBlock;
