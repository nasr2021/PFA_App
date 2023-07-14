import { Box, Flex,Grid } from "@chakra-ui/react";
import FilterPage from "../components/Shared/Widgets/choix";
import CardCour from "../components/Shared/Widgets/Formation";
import {db} from '../firebase/firebase-config';
import ButtonWidget from "../components/Shared/Widgets/Button";
import React, { useState, useEffect } from 'react';

function Course(){
  const gridTemplateColumns = {
    base: "1fr", // 1 carte par ligne sur les écrans sm
    md: "repeat(2, 1fr)", // 2 cartes par ligne sur les écrans md
    lg: "repeat(4, 1fr)", // 3 cartes par ligne sur les écrans plus larges
  };
    const [cours, setCours] = useState([]); 
    const [selectedFilters, setSelectedFilters] = useState([]);
    const filters = ['Informatique', 'Droit', 'Finance', 'comptabilité']; 
    useEffect(() => {
      const fetchCours = async () => {
        try {
          const coursSnapshot = await db.collection('cours').get();
          const coursData = coursSnapshot.docs.map((doc) => doc.data());
          setCours(coursData);
        } catch (error) {
          console.error('Error fetching cours:', error);
        }
      }; 
      fetchCours();
    }, []);
    const handleFilterChange = (updatedFilters) => {
      setSelectedFilters(updatedFilters);
      // Effectuer tout filtrage ou mise à jour en fonction des filtres sélectionnés
    };
return(
  <>
  <Box mt={5}>
    <Flex justifyContent="flex-end" mx={3}>
      <ButtonWidget label="cours" type="modal1" />
    </Flex>
    <Grid templateColumns={gridTemplateColumns} gap={4}>
      {cours.map((cour) => (
        <CardCour key={cour.id} cour={cour} />
      ))}
    </Grid>
  </Box>
</>
);
}
export default  Course;