# TripzyAI - The Intelligent Concierge

## About This App
TripzyAI is a cutting-edge MERN stack application designed to serve as your personal, intelligent travel concierge. Powered by the Gemini 1.5 Flash model, it effortlessly generates comprehensive, multi-day travel itineraries. Just provide your destination, budget, and group size, and TripzyAI will craft an optimal, engaging plan tailored specifically to you.

## Real-Life Use Case
Planning a vacation often involves juggling multiple tabs, mapping out locations, and painstakingly managing time and budgets. TripzyAI solves this by providing a one-click itinerary complete with optimal daily events, Google Maps integration, and budget estimations. Whether you're planning a quick weekend getaway or a two-week international tour, TripzyAI minimizes planning fatigue and maximizes the joy of travel.

## Tech Stack
- **Frontend:** React, TypeScript, Tailwind CSS, Vite
- **Backend:** Node.js, Express, TypeScript
- **Database:** MongoDB
- **AI Integration:** Google Generative AI (Gemini 1.5 Flash)
- **Deployment:** Vercel (Frontend), Render (Backend)

## Project Structure
```text
TripzyAI/
├── Backend/                 # Express backend server
│   ├── src/
│   │   ├── Helper/          # Utility functions
│   │   ├── Routes/          # API Route Definitions
│   │   │   ├── Services/    # AI / External services
│   │   │   ├── TravelPlan/  # Plan management endpoints
│   │   │   └── User/        # User authentication endpoints
│   │   └── Validations/     # Zod schema validations
│   └── package.json
├── frontend/                # Vite React application
│   ├── public/
│   ├── src/
│   │   ├── Components/      # Reusable UI elements
│   │   ├── Pages/           # Application views
│   │   └── index.css        # Global styles (Tailwind)
│   └── package.json
└── README.md
```

## How to Run Locally

### Prerequisites
- Node.js installed (v18+ recommended)
- MongoDB Cluster (Local or Atlas URI)
- Google Gemini API Key

### Backend Setup
1. Navigate to the `Backend` directory: 
   ```bash
   cd Backend
   ```
2. Install dependencies: 
   ```bash
   npm install
   ```
3. Create a `.env` file in the root of the `Backend` directory and populate it with the following keys:
   ```env
   PORT=3000
   MongoDB_URL=your_mongodb_connection_string_here
   GEMINI_API_KEY=your_gemini_api_key_here
   JWT_PASS=your_custom_jwt_secret_here
   ```
4. Start the development server: 
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the `frontend` directory: 
   ```bash
   cd frontend
   ```
2. Install dependencies: 
   ```bash
   npm install
   ```
3. Ensure the backend URL is pointing to your local environment. In `frontend/src/BackendUrl/BackendUrl.ts` (or equivalent config), verify:
   ```typescript
   export const Backend_Url = "http://localhost:3000";
   ```
4. Start the frontend development server: 
   ```bash
   npm run dev
   ```

## System Diagram & Data Flow
1. **User Input:** The user submits preferences (destination, days, budget, people) via the React frontend.
2. **API Request:** Frontend calls the Express Backend (`/Tripzy/Api/TravelPlan/Generate`).
3. **AI Generation:** Backend constructs a prompt and hits the Google Gemini API.
4. **Validation:** The AI response is parsed, formatted into days/events, and validated using Zod.
5. **Database Storage:** The valid itinerary is saved to MongoDB.
6. **Response:** The generated plan is returned to the frontend and rendered elegantly.

## Database Schema / E-R Diagram Structure
- **User Collection:** `_id`, `name`, `email`, `password`, `trips` (References to TravelPlan).
- **TravelPlan Collection:** `_id`, `planName`, `planDate`, `PlaceName`, `PlanDescription`, `numberOfPeople`, `EstimatedTotalCostINR`, `BudgetCategory`.
  - Nested `hotelList` Array: Details for recommended hotels.
  - Nested `events` Array: Specific activities sorted by day and time.

## Deployment Details
- **Frontend:** Hosted on **Vercel** for optimal global edge delivery. The `vercel.json` ensures smooth SPA routing.
- **Backend:** Hosted on **Render**. 
- **BetterStack Integration:** A `/api/health` endpoint is configured in the backend and integrated with BetterStack. This creates periodic health checks, ensuring the Render instance does not spin down due to inactivity.

## Screenshots


- **Landing Page:** 
  <!-- ![Landing Page](frontend/public/landing.png) -->
- **User Dashboard:**
  <!-- ![Dashboard](frontend/public/dashboard.png) -->
- **Trip Generation Interface:**
  <!-- ![Trip Generator](frontend/public/generator.png) -->
- **Curated Itinerary / Results:**
  <!-- ![Generated Itinerary](frontend/public/itinerary.png) -->
