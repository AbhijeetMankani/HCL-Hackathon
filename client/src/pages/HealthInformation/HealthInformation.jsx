import SideNav from "../../components/SideNav/SideNav";
import "./HealthInformation.css";

export default function HealthInformation() {
	const healthTopics = [
		{
			title: "COVID-19 Updates",
			description:
				"Stay informed about the latest COVID-19 guidelines and vaccination information.",
		},
		{
			title: "Seasonal Flu Prevention",
			description:
				"Learn about steps you can take to prevent the seasonal flu and when to get vaccinated.",
		},
		{
			title: "Mental Health Awareness",
			description:
				"Explore resources and support options for maintaining good mental health.",
		},
		{
			title: "Heart Health & Cardiovascular Wellness",
			description:
				"Understand the importance of heart health, risk factors, and preventive measures for cardiovascular diseases.",
		},
		{
			title: "Diabetes Management",
			description:
				"Learn about Type 1 and Type 2 diabetes, management strategies, nutrition tips, and blood sugar monitoring.",
		},
		{
			title: "Physical Activity & Exercise",
			description:
				"Discover the benefits of regular exercise, workout routines suitable for different fitness levels, and staying active.",
		},
		{
			title: "Nutrition & Healthy Eating",
			description:
				"Get expert advice on balanced diet, meal planning, food groups, and nutritional guidelines for optimal health.",
		},
	];

	return (
		<>
			<div
				className="healthInformation"
				style={{ display: "flex", minHeight: "100vh" }}
			>
				<SideNav />

				<div className="healthContent">
					<div className="healthHeader">
						<h1>Latest Health Information</h1>
					</div>

					<div className="healthTopicsContainer">
						{healthTopics.map((topic, index) => (
							<div key={index} className="healthCard">
								<h2>{topic.title}</h2>
								<p>{topic.description}</p>
								<button className="readMoreButton">
									Read More
								</button>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
