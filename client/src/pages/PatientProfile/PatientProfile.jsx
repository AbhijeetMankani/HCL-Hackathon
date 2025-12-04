import { useState } from "react";
import SideNav from "../../components/SideNav/SideNav";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import ProfileField from "../../components/ProfileField/ProfileField";
import ProfileListField from "../../components/ProfileListField/ProfileListField";
import "./PatientProfile.css";

export default function PatientProfile() {
	const [isEditing, setIsEditing] = useState(false);
	const [profileData, setProfileData] = useState({
		name: "Rajesh Kumar",
		email: "rajesh.kumar@email.com",
		phone: "+91 98765 43210",
		address: "12/A, MG Road, Koramangala, Bangalore, Karnataka 560034",
		assignedDoctor: "Dr. Priya Sharma",
		allergies: ["Aspirin", "Shellfish"],
		currentMedications: [
			"Metformin 500mg (twice daily)",
			"Atorvastatin 10mg (at night)",
		],
	});

	const [editData, setEditData] = useState({ ...profileData });

	const handleEdit = () => {
		setEditData({ ...profileData });
		setIsEditing(true);
	};

	const handleCancel = () => {
		setEditData({ ...profileData });
		setIsEditing(false);
	};

	const handleSave = () => {
		setProfileData({ ...editData });
		setIsEditing(false);
	};

	const handleChange = (field, value) => {
		setEditData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	return (
		<>
			<div
				className="patientProfile"
				style={{ display: "flex", minHeight: "100vh" }}
			>
				<SideNav />

				<div className="profileContent">
					<ProfileHeader
						title="My Profile"
						isEditing={isEditing}
						onEdit={handleEdit}
						onSave={handleSave}
						onCancel={handleCancel}
					/>

					<ProfileCard title="Personal Information">
						<ProfileField
							label="Name"
							value={isEditing ? editData.name : profileData.name}
							isEditing={isEditing}
							onChange={(value) => handleChange("name", value)}
						/>

						<ProfileField
							label="Email"
							value={
								isEditing ? editData.email : profileData.email
							}
							isEditing={isEditing}
							onChange={(value) => handleChange("email", value)}
							type="email"
						/>

						<ProfileField
							label="Phone Number"
							value={
								isEditing ? editData.phone : profileData.phone
							}
							isEditing={isEditing}
							onChange={(value) => handleChange("phone", value)}
							type="tel"
						/>

						<ProfileField
							label="Address"
							value={
								isEditing
									? editData.address
									: profileData.address
							}
							isEditing={isEditing}
							onChange={(value) => handleChange("address", value)}
							type="textarea"
							rows={2}
						/>

						<ProfileField
							label="Assigned Doctor"
							value={profileData.assignedDoctor}
							isEditing={false}
							readOnly={true}
						/>
					</ProfileCard>

					<ProfileCard title="Basic Health Information">
						<ProfileListField
							label="Allergies"
							items={
								isEditing
									? editData.allergies
									: profileData.allergies
							}
							isEditing={isEditing}
							onChange={(value) =>
								handleChange("allergies", value)
							}
						/>

						<ProfileListField
							label="Current Medications"
							items={
								isEditing
									? editData.currentMedications
									: profileData.currentMedications
							}
							isEditing={isEditing}
							onChange={(value) =>
								handleChange("currentMedications", value)
							}
						/>
					</ProfileCard>
				</div>
			</div>
		</>
	);
}
