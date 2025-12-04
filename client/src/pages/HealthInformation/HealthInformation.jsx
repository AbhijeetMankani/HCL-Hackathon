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
