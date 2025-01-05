import './App.css'
import MySidebar from './Component/MySidebar/MySidebar'
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home"
import Library from "../pages/Library"
import Planner from "../pages/Planner"
import Track from "../pages/Track"
import { MainProvider } from './Context/mainContext';
import { AuthProvider } from './Context/AuthContext';
import ProtectedRoute from './Context/ProtectedRoute';
import Signup from "../pages/Signup"
import Login from "../pages/Login"


function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Route for Signup */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<AppContent />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}


const AppContent = () => {
  return (
    <MainProvider>
      <section className='d-flex ultra-container'>
        <MySidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/track" element={<Track />} />
          <Route path="/library" element={<Library />} />
          <Route path="/planner" element={<Planner />} />
        </Routes>
      </section>
    </MainProvider>
  );
};

// function App() {
//   return (
//     <AuthProvider>
//       <Route element={<ProtectedRoute />}>
//         <Route path="/signup" element={<Signup />} />
//         <MainProvider>
//           <AppContent />
//         </MainProvider>
//       </Route>
//     </AuthProvider>
//   )
// }

// const AppContent = () => {
//   return (
//     <section className='d-flex ultra-container'>
//       <MySidebar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/track" element={<Track />} />
//         <Route path="/library" element={<Library />} />
//         <Route path="/planner" element={<Planner />} />
//       </Routes>
//     </section>
//   );
// };


export default App

