export default function ProfileField({
	label,
	value,
	isEditing,
	onChange,
	type = "text",
	readOnly = false,
	rows = 1,
}) {
	return (
		<div className={`profileField ${readOnly ? "readOnly" : ""}`}>
			<label>{label}</label>
			{isEditing && !readOnly ? (
				type === "textarea" ? (
					<textarea
						value={value}
						onChange={(e) => onChange(e.target.value)}
						rows={rows}
					/>
				) : (
					<input
						type={type}
						value={value}
						onChange={(e) => onChange(e.target.value)}
					/>
				)
			) : (
				<p>{value || "None reported"}</p>
			)}
			{readOnly && <span className="readOnlyBadge">Read Only</span>}
		</div>
	);
}
