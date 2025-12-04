export default function ProfileCard({ title, children }) {
	return (
		<div className="profileCard">
			<h2>{title}</h2>
			{children}
		</div>
	);
}
