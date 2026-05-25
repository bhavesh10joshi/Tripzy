import { Dashbaord } from "./Pages/Dashboard";
import "../src/index.css"
import { LogIn } from "./Pages/LogIn";
import { SignUp } from "./Pages/SignUp";
import { PlanNewTrip } from "./Pages/PlanNewTrip";
import { DonePlanning } from "./Pages/PlanningDone";
import { MyTrips } from "./Pages/MyTrips";
import { BrowserRouter , Route , Routes} from "react-router-dom";
import { Notifictions } from "./Pages/Notfifications";
import { LandingPage } from "./Pages/LandingPage";
import { Analytics } from "./Pages/Analytics";
import { MyTripShare } from "./Pages/StartSharing";
import { SharedPlan } from "./Pages/SharedPlan";

function RootRoute()
{
  const token = localStorage.getItem("token");
  if(token)
  {
    return <Dashbaord/>;
  }
  return <LandingPage/>;
}

function App() {
  return<>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<RootRoute/>}/>    
      <Route path="/LandingPage" element={<LandingPage/>}/>    
      <Route path="/Tripzy/Login" element={<LogIn/>}/>
      <Route path="/Tripzy/User/Dashboard" element={<Dashbaord/>}/>
      <Route path="/Tripzy/User/SignUp" element={<SignUp/>}/>
      <Route path="/Tripzy/User/MyTrips/View/All" element={<MyTrips/>}/>
      <Route path="/Tripzy/User/Plan/NewTrip" element={<PlanNewTrip/>}/>
      <Route path="/Tripzy/User/Login" element={<LogIn/>}/>
      <Route path="/Tripzy/User/View/Plan" element={<DonePlanning/>}/>
      <Route path="/Tripzy/User/Notifictions" element={<Notifictions/>}/>
      <Route path="/Tripzy/User/Planning/Analytics" element={<Analytics/>}/>
      <Route path="/Tripzy/User/Start/Sharing/Plan" element={<MyTripShare/>}/>
      <Route path="/Tripzy/Shared/Plan/:UniqueId" element={<SharedPlan/>}/>
    </Routes>
  </BrowserRouter>
  </>
}
export default App;