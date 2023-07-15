import { Box, Flex, Grid , Text,Tab,Tabs,TabPanel, TabList, TabPanels} from "@chakra-ui/react";
import InfoCard from "../components/Shared/Widgets/InfoCard";
import ChartWidget from "../components/Shared/Widgets/Statistique";
import Calendar from "../components/Shared/Calendrie";
import { db, auth } from '../firebase/firebase-config';
import ButtonWidget from "../components/Shared/Widgets/Button";
import ExamTable from "./examen";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Packs from "./Packs";
import Card from "../components/Shared/Widgets/Card";
import CardCour from "../components/Shared/Widgets/Formation";
import React, { useState, useEffect } from 'react';
import CongratulationCard from "../components/Shared/Widgets/congrat";
import { useBreakpointValue } from "@chakra-ui/react";
function Dashboard(){
  const [cours, setCours] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [formations, setFormation] = useState([]);
  const [userDocument, setUserDocument] = useState(null); 
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const examsSnapshot = await db.collection('examen').orderBy('date', 'desc').get();
        const examsData = examsSnapshot.docs.map((doc) => doc.data());
        const recentExams = examsData.slice(0, 1); // Récupère les trois premiers examens (les plus récents)
        setExams(recentExams);
      } catch (error) {
        console.error('Error fetching exams:', error);
      }
    };
  
    fetchExams();
  }, []);
  
  
  useEffect(() => {
     // Fonction pour récupérer le document de l'utilisateur connecté
     const fetchUserDocument = async (userId) => {
      try {
        const userDoc = await db.collection("user").doc(userId).get();
        if (userDoc.exists) {
          setUserDocument(userDoc.data());
        }
      } catch (error) {
        console.error("Error fetching user document:", error);
      }
    };
    const fetchCours = async () => {
      try {
        const coursSnapshot = await db.collection('cours').get();
        const coursData = coursSnapshot.docs.map((doc) => doc.data());
    
        // Trier les cours par tarif de manière décroissante
        const sortedCours = coursData.sort((coursA, coursB) => coursB.tarif - coursA.tarif);
    
        // Sélectionner les deux premiers cours avec les tarifs les plus élevés
        const topCours = sortedCours.slice(0, 2);
    
        setCours(topCours); // Mettre les deux cours avec les tarifs les plus élevés dans le state
      } catch (error) {
        console.error('Error fetching cours:', error);
      }
    };
    
    const fetchFormations = async () => {
      try {
        const formationsSnapshot = await db.collection('formation').get();
        const formationsData = formationsSnapshot.docs.map((doc) => doc.data());
    
        // Trier les formations par rating de manière décroissante
        const sortedFormations = formationsData.sort((formationA, formationB) => {
          const ratingA = formationA.rating || 0;
          const ratingB = formationB.rating || 0;
          return ratingB - ratingA;
        });
    
        // Sélectionner les trois premières formations avec les ratings les plus élevés
        const topFormations = sortedFormations.slice(0, 3);
    
        setFormation(topFormations); // Mettre les trois formations avec les ratings les plus élevés dans le state
      } catch (error) {
        console.error('Error fetching formations:', error);
      }
    };
    

    const fetchComplaints = async () => {
      try {
        const complaintsSnapshot = await db.collection('reclamation').get();
        const complaintsData = complaintsSnapshot.docs.map((doc) => doc.data());
        setComplaints(complaintsData);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };
    // Obtenir l'ID de l'utilisateur actuel en dehors de useEffect
    const userId = auth.currentUser ? auth.currentUser.uid : null;

    // Vérifier si userId existe avant d'appeler fetchUserDocument
    if (userId) {
      fetchUserDocument(userId);
    }
    fetchFormations();
    fetchCours();
    fetchComplaints();
  }, []);
  const weatherData = {
    city: 'Paris',
    temperature: 25,
    description: 'Ensoleillé',
    icon: 'https://example.com/weather-icon.png',
  };

    const chartData = [
        { name: "Jan", sales: 100 },
        { name: "Feb", sales: 200 },
        { name: "Mar", sales: 150 },
        { name: "Apr", sales: 300 },
        { name: "May", sales: 250 },
        { name: "Jun", sales: 400 },
      ];
      const [clickCount, setClickCount] = useState(0); 
      const inputWidth = useBreakpointValue({ base: "calc(60% - 50px)", sm: "calc(35% - 25px)", md: "calc(35% - 25px)", lg: "calc(50% - 50px)" });
return(
  <>
  <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} templateRows="repeat(1, 1fr)" gap={4}>
    <CongratulationCard />
    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} m={5} templateRows="repeat(2, 1fr)" gap={4}>
      < InfoCard title="Chiffre d'affaires" value={userDocument?.stat ? userDocument?.nbrPt : 0}/>
      <InfoCard title="Nombre de compte" value={userDocument?.stat ? userDocument?.pack : 0} />
      <InfoCard title="Nombre de cours " value={userDocument?.stat ? userDocument?.coursnbr : 0} />
      <InfoCard title="Nombre de formation" value={userDocument?.stat ? userDocument?.nbrFormation : 0} />
    </Grid>
  </Grid>
  <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }}  templateRows="repeat(1, 1fr)"  gap={4} mx={5} mb={4}>
    <ButtonWidget label="Filier" type="modal10" />
    <ButtonWidget label="pack" type="modal10" />

    <ButtonWidget label="Archive" type="modal5" />
    <ButtonWidget label="Emploi du temps " type="modal9" />
  </Grid>
  <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} templateRows="repeat(1, 1fr)" gap={4}>
    <ChartWidget data={chartData} />
    <Calendar />
  </Grid>
  <Grid templateColumns="repeat(1, 1fr)" templateRows="repeat(1, 1fr)" gap={2}>
   
  <Box mx={4} bg="white" borderRadius="md" overflowY={"auto"} boxShadow="md" p={1} transition="all 0.2s ease" height="100vh">
  <Tabs isManual variant="enclosed">
    <TabList>
      <Tab>Course</Tab>
      <Tab>Formation</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>
        
        <Flex flexWrap="wrap" gap={2} >
          {cours.map((cour) => (
            <CardCour key={cour.id} cour={cour} />
          ))}
        </Flex>
      </TabPanel>
      <TabPanel>
        <Flex flexWrap="wrap" gap={3}>
          {formations.map((formation) => (
            <Card key={formation.id} formation={formation} />
          ))}
        </Flex>
      </TabPanel>
    </TabPanels>
  </Tabs>
</Box>
   
   
  </Grid>
  <Box overflowy={{ base: 'unset', md: 'auto' }} maxh={{ base: 'unset', md: '30%' }}>
  <ExamTable exams={exams} />
</Box>

  <Packs />
</>


);
}
export default Dashboard;