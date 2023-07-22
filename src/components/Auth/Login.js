import React, { useState,useEffect } from 'react';
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,useBreakpointValue,
  Input,
  VStack,
  Text,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { db, auth } from '../../firebase/firebase-config';
import { useNavigate } from 'react-router-dom';
import { ChevronRightIcon } from '@chakra-ui/icons';

export default function LoginApp({ setIsAuth,isAuth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    // Récupérer l'état d'authentification depuis le stockage (LocalStorage, cookies, etc.)
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth) {
      setIsAuth(JSON.parse(storedAuth));
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      const user = auth.currentUser;
      const userId = user.uid;
      await db.collection('user').doc(userId).update({
        stat: true,
      });

      setIsAuth(true);
      localStorage.setItem('isAuthenticated', true); // Store the authentication status in local storage
      navigate('/Dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Incorrect email address or password');
    }
  };
  const handleSignupClick = () => {
    navigate('/signup');
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
          <form onSubmit={handleLogin}>
            <VStack spacing={4}>
              {errorMessage && (
                <Alert status="error" borderRadius="md">
                  <AlertIcon />
                  {errorMessage}
                </Alert>
              )}
              <FormControl >
                <FormLabel>E-mail</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
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
              <Flex justifyContent={'flex-end'} direction={['column','row','row']} ml={[10, 50]} mt={5} mb={12}>
                <Button type="submit"  colorScheme="blue"  size="md" m={2} borderRadius="full"  px={[10, 50]}  boxShadow="md">
                  Connexion
                </Button>
                <Button borderRadius="full" onClick={handleSignupClick} m={2} size="md" colorScheme="teal" p={2} boxShadow="md">
                  <ChevronRightIcon boxSize={6} />
                </Button>
              </Flex>
            </VStack>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}
