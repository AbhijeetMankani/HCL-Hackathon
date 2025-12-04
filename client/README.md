## Key Features

-   Registration / Login (patient & provider)
-   Patient dashboard — view & edit profile, create and track a personal wellness goal
-   Healthcare provider dashboard — view assigned patients and their goal progress

## Tech Stack

-   Frontend: React (Create React App), React Router, Axios
-   State: Context API (or Redux)
-   Styling: Bootstrap (or any UI Framework)
-   Backend: Node.js, Express
-   Database: MongoDB + Mongoose or Firebase Firecloud
-   Authentication: JWT, bcrypt
-   Deployment: Vercel

## Project Structure

Top-level folders and important files:

```
client/
	package.json
	public/
		index.html
	src/
		index.js
		App.js
		routes.js
		App.css
		components/        # shared UI components
		pages/             # Login, Register, ProfileView, PatientDashboard, ProviderDashboard, Public Health Information Page
```

## Core Data Models (high level)

-   `User` — common fields: userId, name, email, passwordHash, role (`patient` | `provider`), providerId
-   `PatientProfile` — demographic and contact info, linked to `User`
-   `Goal` — patientId, providerId, goalType ( `steps` | `activeTime` | `sleep` ), progress, target

## Environment Variables

-   `JWT_SECRET` — secret for signing tokens
-   `SERVER_URL` — backend server url
-   `PORT` — backend port (optional)
-   `CLIENT_URL` — frontend origin (for CORS, optional)

## Run Locally (Windows - cmd)

```
cd client
npm install
npm start
```
