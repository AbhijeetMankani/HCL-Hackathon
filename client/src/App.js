import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";

import PatientDashboard from "./pages/PatientDashboard/PatientDashboard";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<PatientDashboard />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
