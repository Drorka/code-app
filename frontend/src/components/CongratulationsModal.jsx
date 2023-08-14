import React from "react";

function CongratulationsModal({ setIsCorrect }) {
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
			<div className="bg-white p-8 rounded-lg">
				<p className="text-3xl text-center">🙂</p>
				<p className="mt-4 text-lg text-center">
					Congratulations! You got it right!
				</p>
				<button
					className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
					onClick={() => setIsCorrect(false)}
				>
					Hurray!
				</button>
			</div>
		</div>
	);
}

export default CongratulationsModal;
