import "./GoalCard.css";
import { useState } from "react";

export default function GoalCard({ type, progress, target, updateGoal }) {
	const [updateGoalInput, setUpdateGoalInput] = useState(1);
	function update() {
		updateGoal((prev) => ({
			...prev,
			progress: prev.progress + updateGoalInput,
		}));
	}
	return (
		<div className="goalCard">
			<h3>{type}</h3>
			<span>
				{progress} / {target}
			</span>
			{type === "steps" ? (
				<div className="updateButtons">
					<input
						type="number"
						value={updateGoalInput}
						onChange={(e) =>
							setUpdateGoalInput(Number(e.target.value))
						}
					/>
					<button onClick={update}>Add Steps</button>
				</div>
			) : (
				<></>
			)}
			{type === "activeTime" ? (
				<div className="updateButtons">
					<button onClick={update}>Add Active Time</button>
				</div>
			) : (
				<></>
			)}
			{type === "sleep" ? (
				<div className="updateButtons">
					<button onClick={update}>Add Sleep</button>
				</div>
			) : (
				<></>
			)}
		</div>
	);
}
