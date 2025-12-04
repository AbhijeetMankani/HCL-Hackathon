import { useState } from "react";
import GoalCard from "../GoalCard/GoalCard.jsx";
import "./WellnessGoals.css";

export default function WellnessGoals() {
	const [stepsGoal, setStepsGoal] = useState({
		progress: 3000,
		target: 10000,
	});
	const [activeTimeGoal, setActiveTimeGoal] = useState({
		progress: 45,
		target: 60,
	});
	const [sleepGoal, setSleepGoal] = useState({ progress: 6, target: 8 });

	return (
		<>
			<div className="wellnessGoals">
				<h2>Wellness Goals</h2>
				<div className="goalCards">
					<GoalCard
						type="steps"
						progress={stepsGoal.progress}
						target={stepsGoal.target}
						updateGoal={setStepsGoal}
					/>
					<GoalCard
						type="activeTime"
						progress={activeTimeGoal.progress}
						target={activeTimeGoal.target}
						updateGoal={setActiveTimeGoal}
					/>
					<GoalCard
						type="sleep"
						progress={sleepGoal.progress}
						target={sleepGoal.target}
						updateGoal={setSleepGoal}
					/>
				</div>
			</div>
		</>
	);
}
