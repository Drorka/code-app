import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCodeBlocks } from "../store/codeBlocksSlice";
import { codeBlocksService } from "../services/codeBlocks.service";
import Loading from "../components/Loading";

function Lobby() {
	const codeBlocks = useSelector((state) => state.codeBlocks);
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const data = await codeBlocksService.getCodeBlocks();
				dispatch(setCodeBlocks(data));
			} catch (error) {
				console.error("Error fetching code blocks data:", error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchData();
	}, []);

	if (isLoading) return <Loading />;

	return (
		<section className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-4 sm:p-8 rounded shadow-md w-3/4 sm:w-3/4 md:w-3/4 lg:w-3/5">
				<h1 className="text-2xl font-bold mb-4">Choose a code block</h1>
				<ul className="space-y-4 list-none">
					{codeBlocks.map((block) => (
						<li
							key={block._id}
							className="flex items-center justify-between px-2 sm:px-4 py-2 border rounded hover:bg-gray-200 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
						>
							<Link
								to={`/code/${block._id}`}
								id={block._id}
								className="text-sm sm:text-base w-full"
							>
								{block.title}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}

export default Lobby;
