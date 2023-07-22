import React, { useState ,useEffect} from 'react';
import { Box, useBreakpointValue, Flex, Select, Button, FormControl, FormLabel, Input, Stack, Image,Text ,Container} from '@chakra-ui/react';
import { auth, db } from '../../firebase/firebase-config';

export default function SignupApp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role,setRole]=useState('');
  const handleSignup = async (e) => {
    e.preventDefault();
  
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
  
      // Enregistre les données dans la collection "user"
      const userData = {
        email: email,
        password: password,
        stat: false,
        firstName: firstName,
        lastName: lastName,
        role: role,
        nbrPt:0,
        coursnbr:0,
        nbrFormation:0,
        nbrCompte:0,
        // Ajoutez d'autres champs que vous souhaitez enregistrer
      };
  
      if (role === "admin") {
        userData.pack = 3;
      }
  
      await db.collection('user').doc(user.uid).set(userData);
  
      // Inscription réussie, vous pouvez naviguer vers une autre page ou afficher un message de succès
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error);
      // Gérer l'erreur (par exemple, afficher un message d'erreur)
    }
  };
  
  
  useEffect(() => {
    // Vérifie si l'utilisateur est authentifié
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Enregistre l'ID de l'utilisateur dans la collection "user"
        db.collection('user')
          .doc(user.uid)
          .set(
            {
              uid: user.uid,
            },
            { merge: true } // Utilisez merge: true pour ajouter uniquement le champ uid sans écraser les autres champs existants
          )
          .catch((error) => {
            console.error('Erreur lors de l\'enregistrement de l\'ID de l\'utilisateur :', error);
          });
      }
    });
  
    return () => unsubscribe();
  }, []);
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
  >
      <Box display={display}>
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
     
      <form onSubmit={handleSignup}>

      <Stack spacing={4}>
                  <Stack direction={["column", "row"]} spacing={4}>
                    
        <FormControl>
          <FormLabel htmlFor="firstName">Nom </FormLabel>
            <Input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
           </FormControl>
          <FormControl>
          <FormLabel htmlFor="lastName">Prenom</FormLabel>
          <Input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          </FormControl></Stack>

          <FormControl>
            <FormLabel>E-mail</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </FormControl>
          <FormControl>
            <FormLabel>Mot de passe</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormControl>
          <FormControl>
                        <FormLabel htmlFor="role">Role</FormLabel>
                        <Select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="super admin">Super Admin</option>
                          <option value="admin">Admin</option>
                    
                        </Select>
                      </FormControl>
          <Button type="submit" colorScheme="blue">
            Inscription
          </Button>
          </Stack>
      </form>
      </Box>
      </Box>
    </Flex>
  );
}
