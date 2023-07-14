import { Box, Flex, Image, Text, VStack } from '@chakra-ui/react';
import { db } from '../../../firebase/firebase-config';
import React, { useState, useEffect } from 'react';
const FormationCard = ({ title, description, image }) => {
  return (
    <Box borderWidth="1px" borderRadius="md" p={4} maxHeight={"50%"} maxWidth="100%" mx={5} mt={6} >
      <Flex direction="row" align="center">
        <Image src={image} alt={title} width="100px" height="100px" borderRadius="md" />
        <VStack ml={4} align="start" spacing={2}>
          <Text fontWeight="bold" fontSize="lg">{title}</Text>
          <Text>{description}</Text>
        </VStack>
      </Flex>
    </Box>
  );
};

export default function FormationPage() {
  const [formations, setFormations] = useState([]);

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const formationsSnapshot = await db.collection('formation').get();
        const formationsData = formationsSnapshot.docs.map((doc) => doc.data());
        setFormations(formationsData);
      } catch (error) {
        console.error('Error fetching formations:', error);
      }
    };

    fetchFormations();
  }, []);
  return (
    <Flex justify="center" p={4} flexWrap="wrap">
     
        {formations.map((formation, index) => (
          <FormationCard key={index} title={formation.title} description={formation.description} image={formation.image} />
        ))}
     
    </Flex>
  );
}
