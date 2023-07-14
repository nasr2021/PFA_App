import { Box, chakra, Container, Stack, Text, Image, Flex, VStack, Button, Heading, SimpleGrid, StackDivider, useColorModeValue, VisuallyHidden, List,  ListItem, Link,} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';
import React ,{ useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { db, auth } from '../../firebase/firebase-config';
export default function DetailsFormation() {
  const [userDocument, setUserDocument] = useState(null); 
  const [submittedCourses, setSubmittedCourses] = useState([]);
  // Fonction pour récupérer le document de l'utilisateur connecté
    const fetchUserDocument = async (userId) => {
      try {
        const userDoc = await db.collection('user').doc(userId).get();
  
        let coursnbr = userDoc.data().coursnbr || 0;
        coursnbr++;
        await db.collection('user').doc(userId).update({
          coursnbr: coursnbr,
        });
        setSubmittedCourses((prevSubmittedCourses) => [...prevSubmittedCourses, coursId]);
      } catch (error) {
        console.error('Error fetching user document:', error);
      }
    };
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [coursData, setCoursData] = useState(null);
  const coursId = searchParams.get('id');
  const [isSubmitted, setIsSubmitted] = useState(false);
  useEffect(() => {
    const fetchCoursData = async (coursId) => {
      try {
        const coursDoc = await db.collection('cours').doc(coursId).get();
        if (coursDoc.exists) {
          setCoursData(coursDoc.data());
        }
      } catch (error) {
        console.error('Error fetching cours data:', error);
      }
    };

    if (coursId) {
      fetchCoursData(coursId);
    }
  }, [coursId]);

  if (!coursData) {
    return <div>Loading...</div>;
  }
  const handleTerminerClick = async () => {
    const userId = auth.currentUser ? auth.currentUser.uid : null;
    if (userId && !submittedCourses.includes(coursId)) {
      try {
        const userDoc = await db.collection('user').doc(userId).get();
        const userData = userDoc.data();
        
        let coursnbr = userData.coursnbr || 0;
        coursnbr++;
        const point = userData.point || 0;
        const tarif = coursData.tarife || 0; // Assurez-vous que formData contient la valeur tarifaire du cours
  
        await db.collection('user').doc(userId).update({
          coursnbr: coursnbr,
          point: point + tarif, // Ajoutez la valeur tarifaire au champ "point"
        });
  
        setSubmittedCourses((prevSubmittedCourses) => [...prevSubmittedCourses, coursId]);
      } catch (error) {
        console.error('Error fetching user document:', error);
      }
    }
  };
  

  const isCourseSubmitted = submittedCourses.includes(coursId);

  return (
    <Container maxW={'7xl'}>
      
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}>
        <Flex>
          <VStack ><Image
            rounded={'md'}
            alt={'product image'}
            src={
              coursData.image
            }
            fit={'cover'}
            align={'center'}
            w={'100%'}
            h={{ base: '100%', sm: '400px', lg: '500px' }}
          />
          
          <List >
          <ListItem alignItems={"flex-start"}>
  <Text as={'span'} fontWeight={'bold'}>
    Comment:
  </Text>{' '}
  {coursData.comments && Array.isArray(coursData.comments) ? (
    coursData.comments.map((comment, index) => (
      <Box key={index} bg={"white"} p={5} mt={5} borderRadius={"md"}>
        <Link href={comment} target="_blank" rel="noopener noreferrer">
          {comment}
        </Link>
      </Box>
    ))
  ) : (
    <span>No comments available</span>
  )}
</ListItem>
</List>

          </VStack>
        </Flex>
        
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={'header'}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
            {coursData.titre}
            </Heading>
          
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={'column'}
            divider={
              <StackDivider
                borderColor={"gray.200"}
              />
            }>
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                color={"gray.500"}
                fontSize={'2xl'}
                fontWeight={'300'}>
                {coursData.description}
              </Text>
             
            </VStack>
            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={"yellow.500"}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}>
                Features
              </Text>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <List spacing={2}>
                  <ListItem>date a publier</ListItem>
                  <ListItem>tarife</ListItem>{' '}
                  
                </List>
                <List spacing={2}>
                  <ListItem>{coursData.date}</ListItem>
                  <ListItem>{coursData.tarife}</ListItem>
                  
                </List>
              </SimpleGrid>
            </Box>
            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={"yellow.500"}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}>
                Cours
              </Text>

              <List spacing={2}>
              <ListItem>
  <Text as={'span'} fontWeight={'bold'}>
    Links:
  </Text>{' '}
  {coursData.links.map((link, index) => (
    <Box key={index}>
      <Link href={link} target="_blank" rel="noopener noreferrer">
        {link}
      </Link>
    </Box>
  ))}
</ListItem>


<ListItem>
  <Text as={'span'} fontWeight={'bold'}>
    PDF:
  </Text>{' '}
  {coursData.pdf.map((pdf, index) => (
    <Box key={index}>
      <Button as="a" href={pdf} target="_blank" rel="noopener noreferrer">
        Télécharger le PDF
      </Button>
    </Box>
  ))}
</ListItem>

<ListItem >
  <Text as={'span'} fontWeight={'bold'}>
    Video:
  </Text>{' '}
  {coursData.videoURL.map((videoURL, index) => (
    <Box key={index} mt={5}>
      <video controls>
        <source src={videoURL} type="video/mp4" />
      </video>
    </Box>
  ))}
</ListItem>

               
              </List>
            </Box>
          </Stack>

          <Button
            rounded={'none'}
            w={'full'}
            mt={8}
            size={'lg'}
            py={'7'}
            bg={"gray.900"}
            color={"white"}
            textTransform={'uppercase'}
            _hover={{
              transform: 'translateY(2px)',
              boxShadow: 'lg', 
            }}  onClick={() => handleTerminerClick(coursId)}   disabled={isCourseSubmitted}>
            {isCourseSubmitted ? 'Terminé' : 'Terminer'}
          </Button>

          
        </Stack>
      </SimpleGrid>
    </Container>
  );
}