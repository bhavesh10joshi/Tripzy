# 🌍 Tripzy – AI Travel Planner (In Development)

Tripzy is an AI-powered travel planning web application that generates personalized trip itineraries based on user preferences such as destination, budget, number of people, and trip duration. It leverages modern full-stack technologies along with AI to provide a seamless and intelligent travel planning experience.

---

## 🚀 Features

### 🔐 Authentication System

* User Signup & Login
* Secure password hashing using bcrypt
* JWT-based authentication

### 🧠 AI-Powered Trip Generation

* Uses Gemini API to generate personalized itineraries
* Based on:

  * Destination
  * Number of people
  * Budget (Cheap / Moderate / Luxury)
  * Number of days

### 🏨 Hotel Recommendations

* Hotel name
* Images
* Address
* Google Maps link
* Price per night
* Ratings (stars)

### 📍 Places to Visit (Day-wise Planning)

* Day-wise itinerary (Day 1, Day 2, etc.)
* Time slots (e.g., 10:00 AM – 12:00 PM)
* Place descriptions (synopsis)
* Estimated visit duration
* Cost per person (including free places)

### 💾 Save Trips

* All generated itineraries are saved in MongoDB
* Users can access them in **"My Planned Trips"**

### 📧 Email Integration

* Users can send itinerary to their email
* Useful for offline access

### 🏠 Home Dashboard

* Create new trip option
* View previous trips
* Clean and modern UI

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Zustand (state management)

### Backend

* Node.js
* Express.js
* TypeScript

### Database

* MongoDB
* Mongoose

### Authentication & Validation

* JWT (JSON Web Tokens)
* bcrypt (password hashing)
* Zod (schema validation)

### AI Integration

* Gemini API (Google AI)

### Other Services

* Email Service (Nodemailer or similar)

---

## Application Images :-

<img width="1919" height="923" alt="image" src="https://github.com/user-attachments/assets/aa9275ca-e575-4d7d-bb51-9d4172612be8" />
<img width="1919" height="926" alt="Screenshot 2026-04-14 111230" src="https://github.com/user-attachments/assets/ca441969-6d30-4bbf-b7fb-29685e1222fa" />



## 🏗️ System Architecture

User → Frontend (React) → Backend (Node/Express) → Gemini API
↓
MongoDB Database

---

## 📂 Project Structure

```
/client
  /components
  /pages
  /store (zustand)
  /services (API calls)

/server
  /controllers
  /routes
  /models
  /middlewares
  /utils (AI + email logic)

.env
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```
git clone https://github.com/your-username/tripzy.git
cd tripzy
```

### 2. Install dependencies

Frontend:

```
cd client
npm install
```

Backend:

```
cd server
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in server:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_api_key
EMAIL_USER=your_email
EMAIL_PASS=your_password
```

---

### 4. Run the project

Backend:

```
npm run dev
```

Frontend:

```
npm run dev
```

---

## 📸 Screens (You can add later)

* Login Page
* Home Dashboard
* Trip Form
* Generated Itinerary
* My Trips Section

---

## 🎯 Use Cases

* Students planning trips
* Budget travelers
* Family trip planning
* Quick itinerary generation

---

## 📈 Future Enhancements

* Booking integration (hotels/flights)
* Map visualization (live routes)
* Voice-based input
* Mobile app version
* AI chatbot for trip customization

---

## 💼 Resume Description

Developed an AI-powered travel planner using MERN stack and Gemini API that generates personalized itineraries including hotel recommendations, day-wise schedules, and cost estimation. Implemented secure authentication, state management, and scalable backend architecture.

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request.

---

## 📄 License

This project is for educational purposes.

---

## ⭐ Acknowledgements

* Google Gemini API
* MongoDB
* React & Node.js ecosystem

---

## 👨‍💻 Author

Bhavesh Joshi

---

⭐ If you like this project, consider giving it a star!
