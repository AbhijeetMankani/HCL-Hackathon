import { useState } from "react";

export default function ProfileListField({
	label,
	items = [],
	isEditing,
	onChange,
}) {
	const handleItemChange = (index, value) => {
		const newItems = [...items];
		newItems[index] = value;
		onChange(newItems);
	};

	const handleAddItem = () => {
		onChange([...items, ""]);
	};

	const handleRemoveItem = (index) => {
		const newItems = items.filter((_, i) => i !== index);
		onChange(newItems);
	};

	return (
		<div className="profileField profileListField">
			<label>{label}</label>
			{isEditing ? (
				<div className="listEditContainer">
					{items.map((item, index) => (
						<div key={index} className="listItem">
							<input
								type="text"
								value={item}
								onChange={(e) =>
									handleItemChange(index, e.target.value)
								}
								placeholder={`Enter ${label.toLowerCase()}`}
							/>
							<button
								type="button"
								className="removeButton"
								onClick={() => handleRemoveItem(index)}
								aria-label="Remove item"
							>
								×
							</button>
						</div>
					))}
					<button
						type="button"
						className="addButton"
						onClick={handleAddItem}
					>
						+ Add Another
					</button>
				</div>
			) : (
				<div className="listViewContainer">
					{items.length > 0 ? (
						<ul>
							{items.map((item, index) => (
								<li key={index}>{item}</li>
							))}
						</ul>
					) : (
						<p>None reported</p>
					)}
				</div>
			)}
		</div>
	);
}
