import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";

import Login from "./pages/LoginPage/Login";
import PatientDashboard from "./pages/PatientDashboard/PatientDashboard";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<PatientDashboard />} />
					<Route path="/login" element={<Login/>}/>
					<Route path="/dashboard" element={<PatientDashboard />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
