const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  "c:/Users/joshb/OneDrive/Desktop/mern/TripzyAI/frontend/src/Pages/PlanningDone.tsx",
  "c:/Users/joshb/OneDrive/Desktop/mern/TripzyAI/frontend/src/Pages/SignUp.tsx",
  "c:/Users/joshb/OneDrive/Desktop/mern/TripzyAI/frontend/src/Pages/PlanNewTrip.tsx",
  "c:/Users/joshb/OneDrive/Desktop/mern/TripzyAI/frontend/src/Pages/MyTrips.tsx",
  "c:/Users/joshb/OneDrive/Desktop/mern/TripzyAI/frontend/src/Pages/LogIn.tsx",
  "c:/Users/joshb/OneDrive/Desktop/mern/TripzyAI/frontend/src/Components/RecentTrips.tsx",
  "c:/Users/joshb/OneDrive/Desktop/mern/TripzyAI/frontend/src/Components/PlannedTrip.tsx"
];

for (const file of filesToUpdate) {
  let content = fs.readFileSync(file, 'utf-8');
  content = content.replace(/Backend_Url/g, "VITE_BACKEND_URL");
  fs.writeFileSync(file, content);
}

const backendUrlFile = "c:/Users/joshb/OneDrive/Desktop/mern/TripzyAI/frontend/src/BackendUrl/BackendUrl.tsx";
fs.writeFileSync(backendUrlFile, 'export const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;\n');

const exampleBackendUrlFile = "c:/Users/joshb/OneDrive/Desktop/mern/TripzyAI/frontend/src/BackendUrl/ExampleBackendUrl.tsx";
if (fs.existsSync(exampleBackendUrlFile)) {
  fs.writeFileSync(exampleBackendUrlFile, 'export const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;\n');
}

console.log("Done");
