import SideNav from "../../components/SideNav/SideNav";
import WellnessGoals from "../../components/WellnessGoals/WellnessGoals";
import PreventiveCareReminders from "../../components/PreventiveCareReminders/PreventiveCareReminders";
import HealthTip from "../../components/HealthTip/HealthTip";

export default function PatientDashboard() {
	return (
		<>
			<div
				className="patientDashboard"
				style={{ display: "flex", minHeight: "100vh" }}
			>
				<SideNav />

				<div
					className="patientContent"
					style={{ flex: 1, padding: 20 }}
				>
					<div>
						<h1>Welcome, David</h1>
					</div>
					<WellnessGoals className="goals" />
					<PreventiveCareReminders />
					<HealthTip />
				</div>
			</div>
		</>
	);
}
