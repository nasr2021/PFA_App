import { Box, Text, Flex, Badge } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { db } from '../../../firebase/firebase-config'; 
import ButtonWidget from './Button';
const StageCard = ({ stage }) => {
  const { stageName, responsable, profile, environement, nbreStager, description } = stage;
  return (
    <Box borderWidth="1px" borderRadius="md" p={4} bg="white" mb={4}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        {stageName}
      </Text>
      <Flex direction={{ base: 'column', md: 'row' }}>
        <Box bg="gray.200" p={4} mr={{ base: 0, md: 4 }} mb={{ base: 4, md: 0 }} flexBasis={{ base: '100%', md: '60vh' }}>
          <Flex fontSize="xl" mb={2}>
          <Text fontWeight="bold">    Nombre de stagiaires : </Text> <Text mx={2}>{nbreStager}
          </Text></Flex>
          <Flex fontSize="xl"  mb={2}>
          <Text fontWeight="bold">  Responsable de stage :  </Text> <Text mx={2}>{responsable}
          </Text></Flex>
          <Flex fontSize="xl"  mb={2}>
          <Text fontWeight="bold">  Environnement technique : </Text> <Text mx={2}>{environement}</Text>
          </Flex>
          <Flex fontSize="xl"  mb={2}>
          <Text fontWeight="bold">Profil requis : </Text>   <Text mx={2}>{profile}</Text>
          </Flex>
        </Box>
        <Box flex={1}>
          <Text fontSize="lg">{description}</Text>
        </Box>
      </Flex>
    </Box>
  );
};

const StagePage = () => {
  const [stages, setStages] = useState([]);

  useEffect(() => {
    const fetchStages = async () => {
      try {
        const stageSnapshot = await db.collection('stage').get();
        const stageData = stageSnapshot.docs.map((doc) => doc.data());
        setStages(stageData);
      } catch (error) {
        console.log('Erreur lors de la récupération des stages :', error);
      }
    };

    fetchStages();
  }, []);

  return (
    <Box p={4} mx={12}>   
      {stages.map((stage, index) => (
        <StageCard key={index} stage={stage} />
      ))}
    </Box>
     
  );
};

export default StagePage;

