import { Box, Center, Container, Flex } from "@chakra-ui/react";
import { Scrollbar } from "react-scrollbars-custom";
import './App.css';
import SignupEtudiant from "./components/Auth/SignupEtudiant";
import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Routes,Switch , Route } from 'react-router-dom';
import Login from './public/login';
import SignupApp from "./components/Auth/Signup";
import { useState } from 'react';
import ComponentPurchase from './pages/parametre';
import Home from './public/home';
import Sidebar from './components/Layout/Sidebar';
import PDFViewer from './pages/emploiDTemp';
import Bourse from './pages/Bourse';
import Stage from './pages/Stage';
import Logout from './public/profile';
import DoubleNavbar from './components/Layout/Navebar';
import Footer from './components/Layout/Footer';
import Card from './components/Shared/Widgets/Card';
import "leaflet/dist/leaflet.css";
import GradeTable from './pages/Note';
import SchoolForm from './pages/FicheDeRensseniement';
import Examen from './pages/examen';
import Course from './pages/cours';
import Dashboard from './pages/Dashbord';
import HomeS from './pages/Home';
import ReportTable from './pages/Archive';
import Formation from './pages/Formation';
import ReclamationPage from './pages/Reclamation';
import LoginApp from "./components/Auth/Login";
import Simple from "./components/Course/CourseDetail";
import { db,auth } from "./firebase/firebase-config";
import { useEffect } from "react";
import DetailsFormation from "./components/Shared/details";
function App() {
  const [isAuth, setIsAuth] = useState(false);
  console.log(isAuth);
  useEffect(() => {
    if (isAuth==false) {
      const handleLogout = async () => {
        try {
          // Effectuer les étapes de déconnexion ici, par exemple :
          const user = auth.currentUser;
          const userId = user.uid;
          
          await db.collection('user').doc(userId).update({
            stat: false
          });
          console.log(isAuth);
          //console.log(stat);
        } catch (error) {
          console.error('Erreur lors de la déconnexion :', error);
        }
      };
  
      handleLogout(); // Appeler la fonction de déconnexion lorsque isAuth devient false
    }
  }, [isAuth]);
  
  return (
    <Router>
     {isAuth ? (
      <Flex direction="row" >
        {/* DoubleNavbar */}
       
        <Sidebar />
        <Flex direction="column" maxHeight="100vh" flex={1}>
          {/* Sidebar */}
          
          <DoubleNavbar />
          {/* Content */}
         
          <Box flex="1" overflowY="auto" bg={"gray.100"}   >
            
            <Routes>
            {/* <Route
          path="/"
          element={isAuth ? <Navigate to="/Dashboard" /> : <SignupApp setIsAuth={setIsAuth} />}
        /> */}
          {/* <Route
          path="/login"
          element={isAuth ? <Navigate to="/Dashboard" /> : <LoginApp setIsAuth={setIsAuth}/>}
        /> */}
              <Route path="/logout" element={<Logout setIsAuth={setIsAuth} />} />
              <Route path="/SignupEtudiant" element={<SignupEtudiant setIsAuth={setIsAuth} />} />
              <Route path="/card" element={<Card setIsAuth={setIsAuth} />} />
             <Route path="/Dashboard" element={<Dashboard setIsAuth={setIsAuth} />} /> 
              <Route path="/cour" element={<Course setIsAuth={setIsAuth} />} />
              <Route path="/examen" element={<Examen setIsAuth={setIsAuth} />} />
              <Route path="/Bourse" element={<Bourse setIsAuth={setIsAuth} />} />
              <Route path="/Formation" element={<Formation />} />
              <Route path="/Stage" element={<Stage setIsAuth={setIsAuth} />} />
              <Route path="/Renseinne" element={<SchoolForm />} />
              <Route path="/Archive" element={<ReportTable setIsAuth={setIsAuth} />} />
              <Route path="/Note" element={<GradeTable setIsAuth={setIsAuth} />} />
              <Route path="/EmploiDeTemp" element={<PDFViewer setIsAuth={setIsAuth} />} />
              <Route path="/Reclamation" element={<ReclamationPage setIsAuth={setIsAuth} />} />
              <Route path="/Simple" element={<Simple setIsAuth={setIsAuth} />} />
              <Route path="/DetailsFormation" element={<DetailsFormation setIsAuth={setIsAuth} />} />
            
              {/* <Route path="/Parametre" element={<ComponentPurchase setIsAuth={setIsAuth} />} /> */}
            </Routes>
          </Box>
        </Flex>
        
      
      </Flex>
        
      ) : (<Box height={'100vh'} overflowY="auto" bg={"gray.100"}   >
        <Routes>
          <Route path="/" element={<LoginApp setIsAuth={setIsAuth} />} />
          <Route path="/signup" element={<SignupApp setIsAuth={setIsAuth} />} />
      
        </Routes></Box>
      )}
    </Router>
  );
}


export default App;
