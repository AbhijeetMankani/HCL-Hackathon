import WellnessGoals from "../components/WellnessGoals/wellnessGoals";
import PreventiveCareReminders from "../components/PreventiveCareReminders/PreventiveCareReminders";

export default function PatientDashboard() {
	return (
		<>
			<div className="patientDashboard">
				<div className="navbar-side"></div>
				<div>
					<h1>Welcome, David</h1>
				</div>
				<WellnessGoals />
				<PreventiveCareReminders />
			</div>
		</>
	);
}
