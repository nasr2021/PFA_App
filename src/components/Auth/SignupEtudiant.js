import React, { useState ,useEffect} from 'react';
import { Box, Flex,useBreakpointValue, Select, Button, FormControl, FormLabel, Input, Stack, Image,Text ,Container} from '@chakra-ui/react';
import { auth, db } from '../../firebase/firebase-config';

export default function SignupEtudiant() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
 
  const updateNbrCompte = async (userId) => {
    try {
      const userDoc = await db.collection("user").doc(userId).get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        const pack = userData.pack;
        let nbrCompte = userData.nbrCompte;
  
        if (pack && nbrCompte && nbrCompte < pack) {
          nbrCompte = nbrCompte + 1;
          await db.collection("user").doc(userId).update({ nbrCompte });
          console.log("Mise à jour de nbrCompte effectuée avec succès !");
        } else if (pack && nbrCompte && nbrCompte === pack) {
          console.log("Les valeurs de pack et nbrCompte sont égales");
        } else {
          console.log("Les valeurs de pack et nbrCompte sont supérieures");
        }
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du document de l'utilisateur :", error);
    }
  };
  
  useEffect(() => {
    const userId = auth.currentUser ? auth.currentUser.uid : null;
    if (userId) {
      updateNbrCompte(userId);
    }
  }, []);
  
  const handleButtonClick = async () => {
    const userId = auth.currentUser ? auth.currentUser.uid : null;
    if (userId) {
      await updateNbrCompte(userId);
    }
  };
  
  const handleCreateActualite = async (e) => {
    e.preventDefault();
  
    try {
      const userId = auth.currentUser ? auth.currentUser.uid : null;
      if (userId) {
        const userDoc = await db.collection("user").doc(userId).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          const pack = userData.pack;
          const nbrCompte = userData.nbrCompte;
  
          if (pack && nbrCompte && nbrCompte < pack) {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            const actualiteData = {
              email: email,
              password: password,
              stat: false,
              firstName: firstName,
              lastName: lastName,
              uid: user.uid,
              nbrCompte:0,
              nbrPt:0,
              coursnbr:0,
              nbrFormation:0,
              pack:0,
              // Ajoutez d'autres champs que vous souhaitez enregistrer pour l'actualité
            };
  
            await db.collection('user').doc(user.uid).set(actualiteData);
  
            console.log("Enregistrement de l'actualité réussi !");
          } else {
            alert("Le nombre de comptes est insuffisant. Vous ne pouvez pas ajouter d'actualité.");
          }
        }
      }
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de l'actualité :", error);
      // Gérer l'erreur (par exemple, afficher un message d'erreur)
    }
  };
  const boxSize = useBreakpointValue({ base: '100%', sm: '100%', md: '100%', lg: '50vw' });
  const textAlign = useBreakpointValue({ base: 'center', sm: 'center', md: 'start', lg: 'start' });
  const fontSize = useBreakpointValue({ base: 'xl', sm: 'xl', md: '2xl', lg: '6xl' });
  const display = useBreakpointValue({ base: 'flex', sm: 'flex', md: 'flex', lg: 'flex' });

  
  return (
    <Flex
    height="100%"
    direction={['column', 'row']}
    align="center"
    justify="center"
    p={10}
    flex={1}
  > <Box display={display}>
  <Box flex="1" mb={[5, 0]} textAlign={textAlign}>
    <Text as="h1" fontSize={fontSize} fontWeight="bold" letterSpacing="tight" my={5}>
      SmartEduHub.com <br />
    </Text>
    <Text color="hsl(217, 10%, 50.8%)" mb={5}  >
      SmartEduHub.com est un site web d'éducation en ligne qui offre une plateforme conviviale et attrayante pour les étudiants et les professionnels souhaitant approfondir leurs connaissances
    </Text>
  </Box>
  </Box>

  <Box flex="1" ml={[0, 10]} w={boxSize} mt={5}>
        <Box bg="white" borderRadius="md" boxShadow="md" py={5} px={[4, 10]} h={["60vh","50vh"]}>
           
    <form onSubmit={handleCreateActualite}>

      
<Stack spacing={4}>
                  <Stack direction={["column", "row"]} spacing={4}>
                    
        <FormControl>
          <FormLabel htmlFor="firstName">Nom</FormLabel>
            <Input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
           </FormControl>
          <FormControl>
          <FormLabel htmlFor="lastName">Prenom</FormLabel>
          <Input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          </FormControl></Stack>

          <FormControl>
            <FormLabel htmlFor="email">E-mail</FormLabel>
            <Input type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Mot de passe</FormLabel>
            <Input
              type="password" id='password' value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormControl>
       
          <Button type="submit" colorScheme="blue" onClick={handleButtonClick}>
            Inscription
          </Button>
          </Stack>
      
     
    </form>
    </Box>
          </Box>
        </Flex>
   
 
  );
  
  
}
