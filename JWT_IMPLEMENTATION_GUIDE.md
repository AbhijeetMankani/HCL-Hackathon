# Healthcare Portal - Complete Implementation Guide

## 🎯 Project Overview
A comprehensive healthcare portal with patient and provider dashboards, wellness goal tracking, and secure JWT authentication.

---

## 🔐 JWT Authentication Implementation

### Backend (Server)

#### 1. JWT Utilities (`src/utils/jwt.js`)
- **`generateToken(userId, email)`**: Creates JWT token with 7-day expiration
- **`verifyToken(token)`**: Validates and decodes JWT tokens

#### 2. Authentication Middleware (`src/middlewares/auth.js`)
- **`authenticateToken`**: Required authentication middleware for protected routes
- **`optionalAuth`**: Optional authentication for public routes with user context

#### 3. Protected Routes
All the following routes now require JWT authentication:
- `GET /patients/userdata/:userId` - Get patient data
- `POST /patients/userdata/:userId` - Update patient data
- `GET /patients/goals/:patientId` - Get wellness goals
- `POST /patients/goals/:patientId` - Create wellness goal
- `PUT /patients/goals/:patientId/:goalId` - Update wellness goal
- `PATCH /patients/goals/:patientId/:goalId/progress` - Update goal progress
- `DELETE /patients/goals/:patientId/:goalId` - Delete wellness goal

#### 4. Public Routes (No authentication required)
- `POST /patients/register` - Register new user
- `POST /patients/login` - User login

---

## 📦 API Endpoints

### Authentication

#### Register User
```http
POST /patients/register
Content-Type: application/json

{
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securePass123",
    "phoneNumber": "+1-555-123-4567",
    "address": "123 Main St, City"
  },
  "patient": {
    "bloodType": "A+",
    "height": 175,
    "weight": 70
  }
}

Response:
{
  "message": "Registration successful",
  "user": { ...userObject },
  "patient": { ...patientObject },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login User
```http
POST /patients/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePass123"
}

Response:
{
  "message": "Login successful",
  "user": { ...userObject },
  "patient": { ...patientObject },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Patient Data (Protected)

#### Get Patient Data
```http
GET /patients/userdata/:userId
Authorization: Bearer <token>

Response:
{
  "userId": "...",
  "bloodType": "A+",
  "height": 175,
  "weight": 70,
  "allergies": [...],
  "chronicConditions": [...],
  "currentMedications": [...],
  ...
}
```

#### Update Patient Data
```http
POST /patients/userdata/:userId
Authorization: Bearer <token>
Content-Type: application/json

{
  "height": 180,
  "weight": 75,
  "allergies": [
    {
      "allergen": "Peanuts",
      "severity": "Severe",
      "notes": "Anaphylactic reaction"
    }
  ]
}
```

### Wellness Goals (Protected)

#### Get All Goals
```http
GET /patients/goals/:patientId
Authorization: Bearer <token>

Response: Array of goal objects
```

#### Create Goal
```http
POST /patients/goals/:patientId
Authorization: Bearer <token>
Content-Type: application/json

{
  "goalType": "steps",
  "goalTitle": "Daily Step Goal",
  "goalDescription": "Walk 10,000 steps daily",
  "targetValue": 10000,
  "targetUnit": "steps",
  "currentValue": 0,
  "startDate": "2025-12-04",
  "targetDate": "2025-12-31",
  "status": "in_progress"
}
```

#### Update Goal
```http
PUT /patients/goals/:patientId/:goalId
Authorization: Bearer <token>
Content-Type: application/json

{
  "targetValue": 12000,
  "status": "in_progress"
}
```

#### Update Goal Progress
```http
PATCH /patients/goals/:patientId/:goalId/progress
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentValue": 5000
}
```

#### Delete Goal
```http
DELETE /patients/goals/:patientId/:goalId
Authorization: Bearer <token>

Response:
{
  "message": "Goal deleted successfully"
}
```

---

## 🖥️ Frontend Implementation

### API Service (`src/services/api.js`)

#### Features:
1. **Axios Instance** with base URL configuration
2. **Request Interceptor**: Automatically adds JWT token to headers
3. **Response Interceptor**: Handles 401 errors and auto-logout
4. **Token Management**: Stores and retrieves tokens from localStorage

#### Usage Example:
```javascript
import { authAPI, patientAPI, goalsAPI } from './services/api';

// Login
const response = await authAPI.login({ email, password });
// Token is automatically stored in localStorage

// Get patient data (token auto-included)
const patientData = await patientAPI.getUserData(userId);

// Create goal (token auto-included)
const newGoal = await goalsAPI.createGoal(patientId, goalData);

// Logout
authAPI.logout(); // Clears all local storage
```

### Login Page Updates
- **Auto-login after registration**: Users are redirected to dashboard after successful registration
- **Token storage**: JWT token stored in localStorage on login/register
- **Patient ID storage**: Patient ID stored for easy access throughout the app

---

## 🔒 Security Features

### 1. Password Security
- Passwords hashed using bcrypt with 10 salt rounds
- Passwords never sent in API responses

### 2. JWT Security
- Tokens expire after 7 days
- Token secret stored in environment variable
- Token verification on every protected route

### 3. Protected Routes
- All sensitive operations require authentication
- Invalid tokens return 403 Forbidden
- Missing tokens return 401 Unauthorized

### 4. CORS Protection
- Only allows requests from configured CLIENT_URL
- Credentials support enabled for cookie-based authentication

---

## 🌍 Environment Variables

### Server (.env)
```env
MONGO_URI=mongodb+srv://admin:admin12345@healthcare-cluster.6yzem5w.mongodb.net/?appName=Healthcare-Cluster
PORT=5000
CLIENT_URL=http://localhost:3000
JWT_SECRET=hcl-healthcare-portal-secret-key-2025-change-in-production
```

### Client (.env)
```env
REACT_APP_API_URL=http://localhost:5000
```

---

## 🚀 Running the Application

### Start Backend Server
```powershell
cd d:\HCL\HCL-Hackathon\server
npm start
```
Server runs on: `http://localhost:5000`

### Start Frontend Client
```powershell
cd d:\HCL\HCL-Hackathon\client
npm start
```
React app runs on: `http://localhost:3000`

---

## 🧪 Testing the JWT Flow

### 1. Register New User
```bash
POST http://localhost:5000/patients/register
Body: { user: {...}, patient: {...} }
Save the token from response
```

### 2. Test Protected Route Without Token
```bash
GET http://localhost:5000/patients/userdata/:userId
# Should return 401 Unauthorized
```

### 3. Test Protected Route With Token
```bash
GET http://localhost:5000/patients/userdata/:userId
Authorization: Bearer <your-token>
# Should return patient data
```

### 4. Test Token Expiration
Wait 7 days or manually decode token to see expiration
Expired tokens will return 403 Forbidden

---

## 📊 Database Schema

### Users Collection
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  doctorAppointed: ObjectId (ref: Provider),
  profilePicture: String,
  address: String,
  phoneNumber: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Patients Collection
```javascript
{
  userId: ObjectId (required, unique, ref: User),
  bloodType: Enum [A+, A-, B+, B-, AB+, AB-, O+, O-],
  height: Number,
  weight: Number,
  allergies: [{
    allergen: String,
    severity: Enum [Mild, Moderate, Severe],
    notes: String
  }],
  chronicConditions: [{
    condition: String,
    diagnosedDate: Date,
    status: Enum [Active, Managed, Resolved],
    notes: String
  }],
  currentMedications: [{
    medicationName: String,
    dosage: String,
    frequency: String,
    prescribedBy: ObjectId (ref: Provider),
    startDate: Date,
    endDate: Date,
    notes: String
  }],
  insuranceProvider: String,
  insuranceId: String,
  medicalHistory: [...],
  emergencyContact: {...},
  createdAt: Date,
  updatedAt: Date
}
```

### WellnessGoals Collection
```javascript
{
  patientId: ObjectId (required, ref: Patient),
  goalType: Enum [active_time, sleep, steps, hydration, weight, exercise, nutrition],
  goalTitle: String (required),
  goalDescription: String,
  targetValue: Number (required),
  targetUnit: String (required),
  currentValue: Number (default: 0),
  startDate: Date (default: now),
  targetDate: Date (required),
  status: Enum [not_started, in_progress, completed, paused],
  progress: Number (0-100),
  milestones: [{
    value: Number,
    achievedDate: Date,
    note: String
  }],
  reminders: {
    enabled: Boolean,
    frequency: Enum [daily, weekly, custom],
    time: String
  },
  notes: [{
    content: String,
    date: Date
  }],
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔧 Key Features Implemented

✅ JWT Authentication with token generation and verification  
✅ Protected routes with authentication middleware  
✅ Password hashing with bcrypt  
✅ User registration and login  
✅ Patient data management (CRUD)  
✅ Wellness goals tracking (full CRUD)  
✅ Goal progress tracking with automatic status updates  
✅ Token auto-refresh on client  
✅ Auto-logout on token expiration  
✅ Secure API communication  
✅ CORS protection  
✅ MongoDB integration  
✅ React frontend with routing  
✅ API service layer with interceptors  

---

## 📱 Frontend Components

### Available Pages:
- `LoginPage` - User authentication (✅ Connected to backend)
- `PatientDashboard` - Main dashboard view
- `PatientProfile` - User profile management
- `HealthInformation` - Health information display
- `ProviderDashboard` - Provider view

### Available Components:
- `SideNav` - Navigation sidebar
- `WellnessGoals` - Wellness goals display
- `GoalCard` - Individual goal card
- `ProfileCard` - Profile information card
- `HealthTip` - Health tips display
- `PreventiveCareReminders` - Care reminders

---

## 🎯 Next Steps (Optional Enhancements)

1. **Email Verification**: Add email verification on registration
2. **Password Reset**: Implement forgot password functionality
3. **Refresh Tokens**: Add refresh token mechanism for extended sessions
4. **Role-Based Access**: Add provider role and separate authentication
5. **Two-Factor Authentication**: Add 2FA for enhanced security
6. **Activity Logging**: Log user activities for audit trail
7. **Real-time Notifications**: WebSocket integration for real-time updates
8. **Data Export**: Allow users to export their health data
9. **Appointment Scheduling**: Add appointment booking feature
10. **Provider Messaging**: Add secure messaging between patients and providers

---

## 📞 Support

For issues or questions:
1. Check server logs for backend errors
2. Check browser console for frontend errors
3. Verify MongoDB connection
4. Ensure environment variables are set correctly
5. Check JWT token in localStorage (browser DevTools > Application > Local Storage)

---

**Your Healthcare Portal is now fully implemented with JWT authentication! 🎉**
