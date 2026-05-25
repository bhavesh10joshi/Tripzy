# TripzyAI - The Intelligent Concierge

## About This App
TripzyAI is a cutting-edge MERN stack application designed to serve as your personal, intelligent travel concierge. Powered by the Gemini 1.5 Flash model, it effortlessly generates comprehensive, multi-day travel itineraries. Just provide your destination, budget, and group size, and TripzyAI will craft an optimal, engaging plan tailored specifically to you.

## Real-Life Use Case
Planning a vacation often involves juggling multiple tabs, mapping out locations, and painstakingly managing time and budgets. TripzyAI solves this by providing a one-click itinerary complete with optimal daily events, Google Maps integration, and budget estimations. Whether you're planning a quick weekend getaway or a two-week international tour, TripzyAI minimizes planning fatigue and maximizes the joy of travel.

## Tech Stack
- **Frontend:** React, TypeScript, Tailwind CSS, Vite
- **Backend:** Node.js, Express, TypeScript
- **Database:** MongoDB
- **Caching:** Redis (with in-memory fallback)
- **AI Integration:** Google Generative AI (Gemini 1.5 Flash)
- **PDF Generation:** Puppeteer / PDFKit
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

## System Diagram

<img width="1512" height="2708" alt="diagram (1)" src="https://github.com/user-attachments/assets/841c7082-1225-471a-93d3-5390b2896953" />


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
3. **Cache Check:** Backend checks Redis for an existing generated plan to return a fast response.
4. **AI Generation:** If no cache is found, the backend constructs a prompt and hits the Google Gemini API.
5. **Validation:** The AI response is parsed, formatted into days/events, and validated using Zod.
6. **Database Storage & Caching:** The valid itinerary is saved to MongoDB and cached in Redis.
7. **Response:** The generated plan is returned to the frontend and rendered elegantly.

## Key Features
- **AI-Powered Itineraries:** Generates multi-day plans with day-by-day events, optimized routes, and budget estimates.
- **Refine Itinerary:** Users can further refine and modify AI-generated plans using additional prompts.
- **Shared Plans:** Easily share itineraries via a public link. Viewers can also refine the plan if editing is enabled.
- **Travel Analytics:** A dedicated dashboard visualizing your travel trends, most visited places, and geographic distribution.
- **PDF Export:** Download your generated itinerary as a beautifully formatted PDF.

## Performance & Caching (Redis)
To ensure the website feels incredibly fast when accessing shared or recent plans, TripzyAI implements a robust caching strategy using **Redis**.
- **Plan Retrieval:** Shared plans and itineraries are cached in Redis using a `tripzy:itinerary:[UniqueId]` key namespace.
- **Cache Invalidation:** Any updates to a plan (editing details or refining AI itineraries) automatically invalidate the existing cache to ensure data consistency.
- **Fallback Mechanism:** For environments without a running Redis instance, the backend gracefully falls back to an in-memory caching service, ensuring seamless development.

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

<img width="1918" height="929" alt="Screenshot 2026-05-07 222846" src="https://github.com/user-attachments/assets/d6f51c3a-4dd0-41a7-84f5-44e97610398a" />

<img width="1919" height="928" alt="Screenshot 2026-05-07 222925" src="https://github.com/user-attachments/assets/75aa944e-d4d3-4b20-ab67-14d8be0a2f1b" />


- **User Dashboard:**

<img width="1919" height="929" alt="Screenshot 2026-05-07 221404" src="https://github.com/user-attachments/assets/d8b1c5e4-e821-469d-87a1-0e33f0fc7fd2" />


<img width="1919" height="929" alt="Screenshot 2026-05-07 221404" src="https://github.com/user-attachments/assets/0a74cdf9-af57-4138-aed8-b468185a67be" />

- **Trip Generation Interface:**

<img width="1916" height="922" alt="Screenshot 2026-05-07 221851" src="https://github.com/user-attachments/assets/4af0b2c7-13ed-4c0b-8159-5e59bace25b2" />

<img width="1919" height="923" alt="Screenshot 2026-05-07 221906" src="https://github.com/user-attachments/assets/476cd14e-f1b3-4ce4-9272-79f596745c44" />

<img width="1919" height="928" alt="Screenshot 2026-05-07 222121" src="https://github.com/user-attachments/assets/49745420-0336-497a-a715-30f526ec35cf" />


- **Curated Itinerary / Results:**
<img width="1915" height="924" alt="Screenshot 2026-05-07 221533" src="https://github.com/user-attachments/assets/91059b59-f7dd-4ca2-8d52-9ab7d412c6f9" />


<img width="1915" height="924" alt="Screenshot 2026-05-07 221533" src="https://github.com/user-attachments/assets/6ebe12e6-c07a-47ce-97aa-50135b9486b7" />


<img width="1915" height="924" alt="Screenshot 2026-05-07 221533" src="https://github.com/user-attachments/assets/c80d9393-a603-461d-ac70-1e22e5eeca46" />
