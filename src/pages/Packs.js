import { ReactNode } from 'react';
import {
  Box,
  Stack,
  HStack,
  Heading,
  Text,
  VStack,
 // useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
} from '@chakra-ui/react';
import { db,auth } from '../firebase/firebase-config';
import { useState, useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import ButtonWidget from '../components/Shared/Widgets/Button';
function PriceWrapper({ children }: { children: ReactNode }) {
  return (
    <Box
    w={370}
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: 'center', lg: 'flex-start' }}
     // borderColor={useColorModeValue('gray.200', 'gray.500')}
      borderRadius={'xl'}>
      {children}
    </Box>
  );
}

export default function Packs() {
  const [subjectsp1, setSubjectsp1] = useState([]);
  const [subjectsp2, setSubjectsp2] = useState([]);
  const [subjectsp3, setSubjectsp3] = useState([]);
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const userId = auth.currentUser ? auth.currentUser.uid : null;

        const notesSnapshotp1 = await db
          .collection('pack').where('type', '==', 'pack1').get();

        const notesDatap1 = notesSnapshotp1.docs.map((doc) => doc.data());

        const subjectsDatap1 = notesDatap1.map((pack) => ({
          nbrCompte: pack.nbrCommpte,
          nbrCours: pack.nbrCours,
          nbrFormation: pack.nbrFormation,
          prix: pack.prix,
        }));

        setSubjectsp1(subjectsDatap1);
        const notesSnapshotp3 = await db
          .collection('pack').where('type', '==', 'pack2').get();

        const notesDatap3 = notesSnapshotp3.docs.map((doc) => doc.data());

        const subjectsDatap3 = notesDatap3.map((pack) => ({
          nbrCompte: pack.nbrCompte,
          nbrCours: pack.nbrCours,
          nbrFormation: pack.nbrFormation,
          nbrStage:pack.nbrStage,
          nbrBourse:pack.nbrBourse,
          prix: pack.prix,
        }));

        setSubjectsp3(subjectsDatap3);

        const notesSnapshotp2 = await db
          .collection('pack').where('type', '==', 'pack3').get();

        const notesDatap2 = notesSnapshotp2.docs.map((doc) => doc.data());

        const subjectsDatap2 = notesDatap2.map((pack) => ({
          nbrCompte: pack.nbrCompte,
          nbrCours: pack.nbrCours,
          nbrFormation: pack.nbrFormation,
          prix: pack.prix,
          nbrStage:pack.nbrStage,
        }));

        setSubjectsp2(subjectsDatap2);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);
  return (
    <Box >
    
      <Stack
        direction={{ base: 'column', md: 'row' }}
        textAlign="center"
        justify="center"
        spacing={{ base: 4, lg: 24 }}
        py={2}>
  
        <PriceWrapper   >
        {subjectsp1.map((subject, index) => (<Box key={index}>
          <Box py={4} px={12}  bg={"white"} >
            <Text fontWeight="500" fontSize="2xl">
             Moins
            </Text>
            <HStack justifyContent="center">
              <Text fontSize="3xl" fontWeight="600">
                dt
              </Text>
              <Text fontSize="5xl" fontWeight="900">
              {subject.prix}
              </Text>
             
            </HStack>
          </Box>
          <VStack
          //  bg={useColorModeValue('gray.50', 'gray.700')}
            py={4}
            borderBottomRadius={'xl'}>
            <List spacing={3} textAlign="start" px={12}>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
               nbre de compte :  {subject.nbrCompte}
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                nbre de cour: {subject.nbrCours}
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                nbre de formation:{subject.nbrFormation}
              </ListItem>
            </List>
            <Box w="80%" pt={7} >
            <ButtonWidget label="achete" type="modal16" />
            </Box>
          </VStack></Box>))}
        </PriceWrapper>

        <PriceWrapper> {subjectsp3.map((subject, index) => (<Box key={index}>
          <Box position="relative"  bg={"white"}>
            <Box
              position="absolute"
              top="-16px"
              left="50%"
              style={{ transform: 'translate(-50%)' }}>
              <Text
                textTransform="uppercase"
              //  bg={useColorModeValue('red.300', 'red.700')}
                px={3}
                py={1}
               // color={useColorModeValue('gray.900', 'gray.300')}
                fontSize="sm"
                fontWeight="600"
                rounded="xl">
                Most Popular
              </Text>
            </Box>
            <Box py={4} px={12}>
              <Text fontWeight="500" fontSize="2xl">
                Max
              </Text>
              <HStack justifyContent="center">
                <Text fontSize="3xl" fontWeight="600">
                  dt
                </Text>
                <Text fontSize="5xl" fontWeight="900">
                {subject.prix}
                </Text>
               
              </HStack>
            </Box>
            <VStack
           //   bg={useColorModeValue('gray.50', 'gray.700')}
              py={4}
              borderBottomRadius={'xl'}>
              <List spacing={3} textAlign="start" px={12}>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  nombre de compte: {subject.nbrCompte}
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  nombte de cours : {subject.nbrCours}
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                 nombre de formation :{subject.nbrFormation}
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  nombre de stage : {subject.nbrStage}
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                 nombre de bourse :{subject.nbrBourse}
                </ListItem>
              </List>
              <Box w="80%" pt={7}>
              <ButtonWidget label="Achete" type="modal16" />
              </Box>
            </VStack>
          </Box></Box>))}
        </PriceWrapper>

        <PriceWrapper>   {subjectsp2.map((subject, index) => (<Box key={index}>
          <Box py={4} px={12}  bg={"white"}>
            <Text fontWeight="500" fontSize="2xl">
              Moyenne
            </Text>
            <HStack justifyContent="center">
              <Text fontSize="3xl" fontWeight="600">
                dt
              </Text>
              <Text fontSize="5xl" fontWeight="900">
              {subject.prix}
              </Text>
              
            </HStack>
          </Box>
          <VStack
          //  bg={useColorModeValue('gray.50', 'gray.700')}
            py={4}
            borderBottomRadius={'xl'}>
            <List spacing={3} textAlign="start" px={12}>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
               nombre de compte : {subject.nbrCompte}
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
               nombre de cours :{subject.nbrCours}
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
              nombre de formation :{subject.nbrFormation}
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
              nombre de stage :{subject.nbrStage}
              </ListItem>
            </List>
            <Box w="80%" pt={7}>
            <ButtonWidget label="achete" type="modal16" />
            </Box>
          </VStack>
          </Box>))}</PriceWrapper>
      </Stack>
    </Box>
  );
}