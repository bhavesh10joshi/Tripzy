import { Dashbaord } from "./Pages/Dashboard";
import "../src/index.css"
import { LogIn } from "./Pages/LogIn";
import { SignUp } from "./Pages/SignUp";
import { PlanNewTrip } from "./Pages/PlanNewTrip";
import { DonePlanning } from "./Pages/PlanningDone";
import { MyTrips } from "./Pages/MyTrips";
import { BrowserRouter , Route , Routes} from "react-router-dom";
import { Notifictions } from "./Pages/Notfifications";

function App() {
  return<>
  {/* <BrowserRouter>
    <Routes>
      <Route path="/" element={<LogIn/>}/>
      <Route path="/Tripzy/User/Dashboard" element={<Dashbaord/>}/>
      <Route path="/Tripzy/User/Login" element={<LogIn/>}/>
      <Route path="/Tripzy/User/SignUp" element={<SignUp/>}/>
      <Route path="/Tripzy/User/MyTrips/View/All" element={<MyTrips/>}/>
      <Route path="/Tripzy/User/Plan/NewTrip" element={<PlanNewTrip/>}/>
      <Route path="/Tripzy/User/Login" element={<LogIn/>}/>
      <Route path="/Tripzy/User/View/Plan" element={<DonePlanning/>}/>
    </Routes>
  </BrowserRouter> */}
  <Notifictions/>
  </>
}

export default App;