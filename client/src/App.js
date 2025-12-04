import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";

import PatientDashboard from "./pages/PatientDashboard";
import Login from "./pages/LoginPage/Login";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<PatientDashboard />} />
					<Route path="/login" element={<Login/>}/>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
