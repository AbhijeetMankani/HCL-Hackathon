import "./GoalCard.css";

export default function GoalCard({ type }) {
	return (
		<div className="goalCard">
			<h3>{type}</h3>
			<span>Progress / Target</span>
		</div>
	);
}
