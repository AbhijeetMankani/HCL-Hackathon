# Quick Testing Guide - JWT Authentication

## 🧪 Postman Testing Collection

### 1. Register New User (No Auth Required)

**Request:**
```
POST http://localhost:5000/patients/register
Content-Type: application/json

{
  "user": {
    "name": "Test User",
    "email": "test@example.com",
    "password": "test123456",
    "phoneNumber": "+1-555-TEST-001",
    "address": "123 Test Street"
  },
  "patient": {
    "bloodType": "A+",
    "height": 175,
    "weight": 70
  }
}
```

**Expected Response (201):**
```json
{
  "message": "Registration successful",
  "user": {
    "_id": "675...",
    "name": "Test User",
    "email": "test@example.com",
    "phoneNumber": "+1-555-TEST-001",
    "address": "123 Test Street",
    "createdAt": "2025-12-04T...",
    "updatedAt": "2025-12-04T..."
  },
  "patient": {
    "_id": "675...",
    "userId": "675...",
    "bloodType": "A+",
    "height": 175,
    "weight": 70,
    "createdAt": "2025-12-04T...",
    "updatedAt": "2025-12-04T..."
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzU..."
}
```

**✅ Copy the `token` and `user._id` and `patient._id` for next requests!**

---

### 2. Login User (No Auth Required)

**Request:**
```
POST http://localhost:5000/patients/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "test123456"
}
```

**Expected Response (200):**
```json
{
  "message": "Login successful",
  "user": { ...userObject },
  "patient": { ...patientObject },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 3. Test Protected Route WITHOUT Token (Should Fail)

**Request:**
```
GET http://localhost:5000/patients/userdata/675...
```

**Expected Response (401):**
```json
{
  "error": "Access token required"
}
```

---

### 4. Test Protected Route WITH Token (Should Succeed)

**Request:**
```
GET http://localhost:5000/patients/userdata/675...
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Postman Setup:**
1. Go to **Authorization** tab
2. Select **Type: Bearer Token**
3. Paste your token in the **Token** field

**Expected Response (200):**
```json
{
  "_id": "675...",
  "userId": "675...",
  "bloodType": "A+",
  "height": 175,
  "weight": 70,
  "allergies": [],
  "chronicConditions": [],
  ...
}
```

---

### 5. Update Patient Data (Protected)

**Request:**
```
POST http://localhost:5000/patients/userdata/675...
Authorization: Bearer <your-token>
Content-Type: application/json

{
  "height": 180,
  "weight": 75,
  "allergies": [
    {
      "allergen": "Peanuts",
      "severity": "Severe",
      "notes": "Anaphylactic shock risk"
    }
  ]
}
```

**Expected Response (200):**
```json
{
  "_id": "675...",
  "userId": "675...",
  "bloodType": "A+",
  "height": 180,
  "weight": 75,
  "allergies": [
    {
      "allergen": "Peanuts",
      "severity": "Severe",
      "notes": "Anaphylactic shock risk"
    }
  ],
  ...
}
```

---

### 6. Create Wellness Goal (Protected)

**Request:**
```
POST http://localhost:5000/patients/goals/675...
Authorization: Bearer <your-token>
Content-Type: application/json

{
  "goalType": "steps",
  "goalTitle": "Daily 10K Steps",
  "goalDescription": "Walk 10,000 steps every day for better health",
  "targetValue": 10000,
  "targetUnit": "steps",
  "currentValue": 0,
  "startDate": "2025-12-04",
  "targetDate": "2025-12-31",
  "status": "in_progress"
}
```

**Expected Response (201):**
```json
{
  "_id": "675...",
  "patientId": "675...",
  "goalType": "steps",
  "goalTitle": "Daily 10K Steps",
  "goalDescription": "Walk 10,000 steps every day for better health",
  "targetValue": 10000,
  "targetUnit": "steps",
  "currentValue": 0,
  "progress": 0,
  "status": "in_progress",
  "startDate": "2025-12-04T...",
  "targetDate": "2025-12-31T...",
  ...
}
```

**✅ Copy the goal `_id` for next requests!**

---

### 7. Get All Goals (Protected)

**Request:**
```
GET http://localhost:5000/patients/goals/675...
Authorization: Bearer <your-token>
```

**Expected Response (200):**
```json
[
  {
    "_id": "675...",
    "patientId": "675...",
    "goalType": "steps",
    "goalTitle": "Daily 10K Steps",
    "targetValue": 10000,
    "currentValue": 0,
    "progress": 0,
    ...
  }
]
```

---

### 8. Update Goal Progress (Protected)

**Request:**
```
PATCH http://localhost:5000/patients/goals/675.../675.../progress
Authorization: Bearer <your-token>
Content-Type: application/json

{
  "currentValue": 5000
}
```

**Expected Response (200):**
```json
{
  "_id": "675...",
  "patientId": "675...",
  "goalType": "steps",
  "goalTitle": "Daily 10K Steps",
  "targetValue": 10000,
  "currentValue": 5000,
  "progress": 50,
  "status": "in_progress",
  ...
}
```

**Note:** Progress is automatically calculated as (currentValue / targetValue) * 100

---

### 9. Update Goal Details (Protected)

**Request:**
```
PUT http://localhost:5000/patients/goals/675.../675...
Authorization: Bearer <your-token>
Content-Type: application/json

{
  "targetValue": 12000,
  "goalDescription": "Increased to 12K steps for better results"
}
```

**Expected Response (200):**
```json
{
  "_id": "675...",
  "patientId": "675...",
  "targetValue": 12000,
  "goalDescription": "Increased to 12K steps for better results",
  ...
}
```

---

### 10. Delete Goal (Protected)

**Request:**
```
DELETE http://localhost:5000/patients/goals/675.../675...
Authorization: Bearer <your-token>
```

**Expected Response (200):**
```json
{
  "message": "Goal deleted successfully"
}
```

---

## 🌐 Browser Testing (React App)

### 1. Start Both Servers
```powershell
# Terminal 1 - Backend
cd d:\HCL\HCL-Hackathon\server
npm start

# Terminal 2 - Frontend
cd d:\HCL\HCL-Hackathon\client
npm start
```

### 2. Register New User
1. Go to `http://localhost:3000/login`
2. Click **Sign Up** or switch to register tab
3. Fill in:
   - Name: Test User
   - Email: test@example.com
   - Password: test123456
   - Confirm Password: test123456
4. Click **Register**
5. ✅ Should see success message and auto-redirect to dashboard
6. ✅ Check browser DevTools > Application > Local Storage:
   - `authToken` should be present
   - `userId` should be present
   - `patientId` should be present
   - `userName` should be present
   - `userEmail` should be present

### 3. Login
1. Go to `http://localhost:3000/login`
2. Enter:
   - Email: test@example.com
   - Password: test123456
3. Click **Login**
4. ✅ Should redirect to dashboard
5. ✅ Token should be stored in localStorage

### 4. Test Auto-Logout on Token Expiration
1. In browser DevTools console:
```javascript
// Clear token
localStorage.removeItem('authToken');

// Try to make API call (should auto-redirect to login)
```

### 5. Test Token in Network Tab
1. Open DevTools > Network tab
2. Make any API call from the app
3. Check the request headers
4. ✅ Should see: `Authorization: Bearer eyJhbGci...`

---

## 🔍 Debugging Tips

### Server Not Starting?
```powershell
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Kill the process if needed
taskkill /PID <PID> /F
```

### MongoDB Connection Issues?
- Check `.env` file has correct MONGO_URI
- Verify MongoDB cluster is running
- Check network connectivity

### Token Not Working?
- Verify JWT_SECRET is set in server `.env`
- Check token format: `Bearer <token>`
- Verify token hasn't expired (7 days)
- Check server logs for verification errors

### CORS Errors?
- Verify CLIENT_URL in server `.env` matches frontend URL
- Check CORS middleware in `index.js`
- Ensure both servers are running

### 401 Unauthorized?
- Check if token is being sent in request headers
- Verify token is valid (not expired)
- Check if route requires authentication

### 403 Forbidden?
- Token is expired or invalid
- Try logging in again to get new token

---

## ✅ Success Checklist

- [ ] Server starts without errors on port 5000
- [ ] Client starts without errors on port 3000
- [ ] MongoDB connection successful
- [ ] Can register new user
- [ ] Receives JWT token on registration
- [ ] Can login with credentials
- [ ] Receives JWT token on login
- [ ] Token stored in localStorage
- [ ] Protected routes reject requests without token (401)
- [ ] Protected routes accept requests with valid token (200)
- [ ] Can create wellness goals
- [ ] Can update goal progress
- [ ] Can retrieve all goals
- [ ] Can update goal details
- [ ] Can delete goals
- [ ] Auto-logout on token expiration works
- [ ] CORS allows frontend to communicate with backend

---

**All tests passing? Your JWT authentication is working perfectly! 🎉**
