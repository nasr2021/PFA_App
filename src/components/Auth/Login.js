import React, { useState } from 'react';
import { Box,Flex, Button, FormControl, FormLabel, Input, VStack, Text } from '@chakra-ui/react';
import {db , auth } from '../../firebase/firebase-config';
import { useNavigate } from 'react-router-dom';
export default function LoginApp({ setIsAuth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      // Connexion réussie, naviguer vers une autre page
      const user = auth.currentUser;
      const userId = user.uid;
      console.log(userId)
      await db.collection('user').doc(userId).update({
        stat: true
      });
      setIsAuth(true); 
      navigate('/Dashboard');
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      // Gérer l'erreur (par exemple, afficher un message d'erreur)
    }
  };

  return (
    
    <Flex height={'100%'} direction={["column", "row"]} align="center" justify="center" p={10} flex={1} >
      <Box flex="1" mb={[5, 0]} textAlign={["center", "start"]}>
        <Text as="h1" fontSize="6xl" fontWeight="bold" letterSpacing="tight" my={5}>
        SmartEduHub.com <br />
          
        </Text>
        <Text color="hsl(217, 10%, 50.8%)" mb={5}>
        SmartEduHub.com est un site web d'éducation en ligne qui
         offre une plateforme conviviale et attrayante pour
         les étudiants et les professionnels souhaitant approfondir 
         leurs connaissances
        </Text>
      </Box>

      <Box flex="1" ml={[0, 10]} w={"50vw"} mt={12}>
        <Box bg="white" borderRadius="md" boxShadow="md" py={5} px={[4, 10]} h={"50vh"}>
          
      <form onSubmit={handleLogin} >
        <VStack spacing={4}>
          <FormControl mt={7}>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Mot de passe</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormControl>
          <Button type="submit" colorScheme="blue">
            Connexion
          </Button>
        </VStack>
      </form>
      </Box>
          </Box>
        </Flex>
  );
}
