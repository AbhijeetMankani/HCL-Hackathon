import { useState } from "react";
import GoalCard from "../GoalCard/GoalCard.jsx";
import "./WellnessGoals.css";

export default function WellnessGoals() {
	const [goals, setGoals] = useState([
		{ type: "steps", progress: 3000, target: 10000 },
		{ type: "activeTime", progress: 45, target: 60 },
		{ type: "sleep", progress: 6, target: 8 },
	]);

	return (
		<>
			<div className="wellnessGoals">
				<h2>Wellness Goals</h2>
				<div className="goalCards">
					<GoalCard type="steps" />
					<GoalCard type="activeTime" />
					<GoalCard type="sleep" />
				</div>
			</div>
		</>
	);
}
