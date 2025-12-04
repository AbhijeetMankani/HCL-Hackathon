export default function ProfileHeader({
	title,
	isEditing,
	onEdit,
	onSave,
	onCancel,
}) {
	return (
		<div className="profileHeader">
			<h1>{title}</h1>
			{!isEditing ? (
				<button className="editButton" onClick={onEdit}>
					Edit Profile
				</button>
			) : (
				<div className="editActions">
					<button className="saveButton" onClick={onSave}>
						Save Changes
					</button>
					<button className="cancelButton" onClick={onCancel}>
						Cancel
					</button>
				</div>
			)}
		</div>
	);
}
