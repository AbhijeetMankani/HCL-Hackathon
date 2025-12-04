import "./GoalCard.css";
import { useState } from "react";

export default function GoalCard({ type, progress, target, updateGoal }) {
	const [updateGoalInput, setUpdateGoalInput] = useState(1);

	const goalTitles = {
		steps: "Daily Steps",
		activeTime: "Active Time (minutes)",
		sleep: "Sleep (hours)",
		hydration: "Water Intake (glasses)",
	};

	function update() {
		updateGoal((prev) => ({
			...prev,
			progress: prev.progress + updateGoalInput,
		}));
	}

	const percentage = Math.min((progress / target) * 100, 100);

	return (
		<div className="goalCard">
			<h3>{goalTitles[type] || type}</h3>
			<span>
				{progress} / {target}
			</span>
			<div className="progressBar">
				<div
					className="progressFill"
					style={{ width: `${percentage}%` }}
				></div>
			</div>
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
					<input
						type="number"
						value={updateGoalInput}
						onChange={(e) =>
							setUpdateGoalInput(Number(e.target.value))
						}
					/>
					<button onClick={update}>Add Sleep</button>
				</div>
			) : null}
			{type === "hydration" ? (
				<div className="updateButtons">
					<button onClick={update}>Add Glasses</button>
				</div>
			) : null}
		</div>
	);
}
