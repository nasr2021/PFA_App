import {
    Box,
    chakra,
    Container,
    Stack,
    Text,
    Image,
    Flex,
    VStack,
    Button,
    Heading,
    SimpleGrid,
    StackDivider,
    useColorModeValue,
    VisuallyHidden,
    List,
    ListItem,
    Link,
  } from '@chakra-ui/react';


  import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
  import { MdLocalShipping } from 'react-icons/md';
  import { useState, useEffect } from 'react';
  import { useLocation } from 'react-router-dom';
import ButtonWidget from '../Shared/Widgets/Button';
import { db, auth } from '../../firebase/firebase-config';
  export default function Simple() {


    const [userDocument, setUserDocument] = useState(null); 
   
      // Fonction pour récupérer le document de l'utilisateur connecté
      const fetchUserDocument = async (userId) => {
       try {
         const userDoc = await db.collection("user").doc(userId).get();
     
          let nbrFormation = userDoc.data().nbrFormation || 0;
          nbrFormation++;
          await db.collection("user").doc(userId).update({
            nbrFormation: nbrFormation,
          });
          setIsSubmitted(true);
         
       } catch (error) {
         console.error("Error fetching user document:", error);
       }
     };
    
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [formationData, setFormationData] = useState(null);
    const formationId = searchParams.get('id');
    const [isSubmitted, setIsSubmitted] = useState(false);
    useEffect(() => {
      const fetchFormationData = async (formationId) => {
        try {
          const formationDoc = await db.collection('formation').doc(formationId).get();
          if (formationDoc.exists) {
            setFormationData(formationDoc.data());
          }
        } catch (error) {
          console.error('Error fetching formation data:', error);
        }
      };
  
      if (formationId) {
        fetchFormationData(formationId);
      }
    }, [formationId]);
  
    if (!formationData) {
      return <div>Loading...</div>;
    }
    const handleTerminerClick = () => {
      
      const userId = auth.currentUser ? auth.currentUser.uid : null;
      if (userId) {
        fetchUserDocument(userId);
      }
    };
    return (
      <Container maxW={'7xl'}>
         <ButtonWidget label="participer" type="modal11"  />
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}>
          <Flex>
          <VStack>   <Image
              rounded={'md'}
              alt={'product image'}
              src={
                formationData.avatar
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
  {formationData.comments && Array.isArray(formationData.comments) ? (
    formationData.comments.map((comment, index) => (
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
</List> </VStack>
          </Flex>
          
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={'header'}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
              {formationData.title}
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
                  {formationData.description}
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
                    <ListItem>profname</ListItem>
                  </List>
                  <List spacing={2}>
                    <ListItem>{formationData.date}</ListItem>
                    <ListItem>{formationData.prix}</ListItem>
                    <ListItem>{formationData.profession}</ListItem>
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
  {Array.isArray(formationData.links) &&
    formationData.links.map((link, index) => (
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
  {Array.isArray(formationData.pdf) &&
    formationData.pdf.map((pdf, index) => (
      <Box key={index}>
        <Button as="a" href={pdf} target="_blank" rel="noopener noreferrer">
          Télécharger le PDF
        </Button>
      </Box>
    ))}
</ListItem>
<ListItem>
  <Text as={'span'} fontWeight={'bold'}>
    Video:
  </Text>{' '}
  {Array.isArray(formationData.videoURL) &&
    formationData.videoURL.map((videoURL, index) => (
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
              }}   onClick={handleTerminerClick} disabled={isSubmitted} >
             Terminer
            </Button>
  
            
          </Stack>
        </SimpleGrid>
      </Container>
    );
  }