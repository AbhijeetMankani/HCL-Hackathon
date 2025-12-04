import { useState } from "react";
import SideNav from "../../components/SideNav/SideNav";
import "./ProviderDashboard.css";

export default function ProviderDashboard() {
	const [selectedPatient, setSelectedPatient] = useState(null);

	// Mock data for assigned patients
	const assignedPatients = [
		{
			id: 1,
			name: "Rajesh Kumar",
			email: "rajesh.kumar@email.com",
			phone: "+91 98765 43210",
			age: 45,
			bloodGroup: "O+",
			assignedDate: "2024-01-15",
			wellnessGoals: [
				{ type: "steps", progress: 3000, target: 10000 },
				{ type: "activeTime", progress: 45, target: 60 },
				{ type: "sleep", progress: 6, target: 8 },
				{ type: "hydration", progress: 6, target: 8 },
			],
			medicalHistory: [
				{
					date: "2024-11-20",
					condition: "Hypertension",
					notes: "Blood pressure controlled with medication",
				},
				{
					date: "2024-10-15",
					condition: "Type 2 Diabetes",
					notes: "Glucose levels stable",
				},
			],
			allergies: ["Aspirin", "Shellfish"],
			currentMedications: [
				"Metformin 500mg (twice daily)",
				"Atorvastatin 10mg (at night)",
			],
		},
		{
			id: 2,
			name: "Priya Singh",
			email: "priya.singh@email.com",
			phone: "+91 87654 32109",
			age: 32,
			bloodGroup: "A+",
			assignedDate: "2024-02-20",
			wellnessGoals: [
				{ type: "steps", progress: 8000, target: 10000 },
				{ type: "activeTime", progress: 55, target: 60 },
				{ type: "sleep", progress: 7, target: 8 },
				{ type: "hydration", progress: 7, target: 8 },
			],
			medicalHistory: [
				{
					date: "2024-11-10",
					condition: "Regular Checkup",
					notes: "All vitals normal",
				},
			],
			allergies: ["Sulfonamides"],
			currentMedications: ["Vitamin D 1000 IU (daily)"],
		},
		{
			id: 3,
			name: "Amit Patel",
			email: "amit.patel@email.com",
			phone: "+91 76543 21098",
			age: 50,
			bloodGroup: "B+",
			assignedDate: "2024-03-10",
			wellnessGoals: [
				{ type: "steps", progress: 5000, target: 10000 },
				{ type: "activeTime", progress: 30, target: 60 },
				{ type: "sleep", progress: 5, target: 8 },
				{ type: "hydration", progress: 4, target: 8 },
			],
			medicalHistory: [
				{
					date: "2024-11-25",
					condition: "High Cholesterol",
					notes: "Lipid levels need monitoring",
				},
				{
					date: "2024-11-05",
					condition: "Lower Back Pain",
					notes: "Referred to physiotherapy",
				},
			],
			allergies: [],
			currentMedications: [
				"Atorvastatin 20mg (daily)",
				"Ibuprofen 400mg (as needed)",
			],
		},
	];

	const goalTitles = {
		steps: "Daily Steps",
		activeTime: "Active Time (min)",
		sleep: "Sleep (hours)",
		hydration: "Water (glasses)",
	};

	const getGoalPercentage = (goal) => {
		return Math.min((goal.progress / goal.target) * 100, 100);
	};

	return (
		<>
			<div
				className="providerDashboard"
				style={{ display: "flex", minHeight: "100vh" }}
			>
				<SideNav />

				<div className="dashboardContent">
					<div className="dashboardHeader">
						<h1>Provider Dashboard</h1>
						<p className="patientCount">
							{assignedPatients.length} Assigned Patients
						</p>
					</div>

					<div className="dashboardContainer">
						<div className="patientsList">
							<h2>Your Patients</h2>
							<div className="patientsGrid">
								{assignedPatients.map((patient) => (
									<div
										key={patient.id}
										className={`patientCard ${
											selectedPatient?.id === patient.id
												? "active"
												: ""
										}`}
										onClick={() =>
											setSelectedPatient(patient)
										}
									>
										<div className="patientHeader">
											<h3>{patient.name}</h3>
											<span className="age">
												{patient.age}y
											</span>
										</div>
										<p className="email">{patient.email}</p>
										<p className="phone">{patient.phone}</p>

										<div className="compactGoals">
											{patient.wellnessGoals.map(
												(goal, idx) => (
													<div
														key={idx}
														className="compactGoal"
													>
														<span className="goalName">
															{
																goalTitles[
																	goal.type
																]
															}
														</span>
														<div className="compactProgressBar">
															<div
																className="compactProgressFill"
																style={{
																	width: `${getGoalPercentage(
																		goal
																	)}%`,
																}}
															></div>
														</div>
														<span className="goalValue">
															{goal.progress}/
															{goal.target}
														</span>
													</div>
												)
											)}
										</div>
									</div>
								))}
							</div>
						</div>

						{selectedPatient && (
							<div className="patientDetail">
								<button
									className="closeButton"
									onClick={() => setSelectedPatient(null)}
								>
									×
								</button>

								<div className="detailHeader">
									<h2>{selectedPatient.name}</h2>
									<div className="patientInfo">
										<span>{selectedPatient.age} years</span>
										<span className="separator">•</span>
										<span>
											Blood Group:{" "}
											{selectedPatient.bloodGroup}
										</span>
									</div>
								</div>

								<div className="detailSection">
									<h3>Contact Information</h3>
									<p>
										<strong>Email:</strong>{" "}
										{selectedPatient.email}
									</p>
									<p>
										<strong>Phone:</strong>{" "}
										{selectedPatient.phone}
									</p>
									<p>
										<strong>Assigned Date:</strong>{" "}
										{new Date(
											selectedPatient.assignedDate
										).toLocaleDateString()}
									</p>
								</div>

								<div className="detailSection">
									<h3>Wellness Goals Progress</h3>
									<div className="goalsDetail">
										{selectedPatient.wellnessGoals.map(
											(goal, idx) => (
												<div
													key={idx}
													className="goalDetail"
												>
													<div className="goalHeader">
														<span className="goalTitle">
															{
																goalTitles[
																	goal.type
																]
															}
														</span>
														<span className="goalStat">
															{goal.progress} /{" "}
															{goal.target}
														</span>
													</div>
													<div className="progressBar">
														<div
															className="progressFill"
															style={{
																width: `${getGoalPercentage(
																	goal
																)}%`,
															}}
														></div>
													</div>
													<span className="percentage">
														{Math.round(
															getGoalPercentage(
																goal
															)
														)}
														%
													</span>
												</div>
											)
										)}
									</div>
								</div>

								<div className="detailSection">
									<h3>Medical History</h3>
									<div className="medicalHistoryList">
										{selectedPatient.medicalHistory.length >
										0 ? (
											selectedPatient.medicalHistory.map(
												(record, idx) => (
													<div
														key={idx}
														className="historyRecord"
													>
														<div className="recordDate">
															{new Date(
																record.date
															).toLocaleDateString()}
														</div>
														<div className="recordContent">
															<p className="condition">
																<strong>
																	{
																		record.condition
																	}
																</strong>
															</p>
															<p className="notes">
																{record.notes}
															</p>
														</div>
													</div>
												)
											)
										) : (
											<p>No medical history recorded</p>
										)}
									</div>
								</div>

								<div className="detailSection">
									<h3>Allergies</h3>
									{selectedPatient.allergies.length > 0 ? (
										<ul className="allergiesList">
											{selectedPatient.allergies.map(
												(allergy, idx) => (
													<li key={idx}>{allergy}</li>
												)
											)}
										</ul>
									) : (
										<p>No allergies reported</p>
									)}
								</div>

								<div className="detailSection">
									<h3>Current Medications</h3>
									{selectedPatient.currentMedications.length >
									0 ? (
										<ul className="medicationsList">
											{selectedPatient.currentMedications.map(
												(med, idx) => (
													<li key={idx}>{med}</li>
												)
											)}
										</ul>
									) : (
										<p>No medications reported</p>
									)}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
