import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Button,
  Text,
} from '@chakra-ui/react';

const ComponentPurchase = () => {
  const [email, setEmail] = useState('john.doe@example.com'); // Email déjà enregistré
  const [password, setPassword] = useState('MotDePasse123'); // Mot de passe déjà enregistré
  const [selectedOffers, setSelectedOffers] = useState([]);
  const [numberOfAccounts, setNumberOfAccounts] = useState('');

  const offers = [
    { name: 'Offre 1', price: 10 },
    { name: 'Offre 2', price: 20 },
    { name: 'Offre 3', price: 30 },
  ];

  const purchasedOffers = ['Offre 1','Offre 2','Offre 3']; // Packs déjà achetés

  const handleOfferChange = (offerName) => {
    if (selectedOffers.includes(offerName)) {
      setSelectedOffers(selectedOffers.filter((name) => name !== offerName));
    } else {
      setSelectedOffers([...selectedOffers, offerName]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Effectuez ici la logique pour l'achat des composants

    // Réinitialisez les champs après l'achat
    setEmail('');
    setPassword('');
    setSelectedOffers([]);
    setNumberOfAccounts('');
  };

  return (<Box p={4} mx={12} width={"170vh"}>
    <Box p={4} borderRadius={"md"} mx={28} width={"120vh"} bg={"white"} justifyContent={"center"} >
      <Heading as="h2" size="lg" textAlign="center" mb={6}>
        Achat de Composants
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel>E-mail</FormLabel>
          <Input
            type="email"
            placeholder="Votre email"
            value={email} bg={"white"}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Mot de passe</FormLabel>
          <Input
            type="password"
            placeholder="Votre mot de passe"
            value={password} bg={"white"}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Text fontWeight="bold" mb={2}>
          Packs déjà achetés :
        </Text>
        <Flex mb={4}>
          {purchasedOffers.map((offer) => (
            <Box key={offer} mr={2}>
              {offer}
            </Box>
          ))}
        </Flex>
        <FormControl mb={4}>
          <FormLabel>Offres à Acheter</FormLabel>
          {offers.map((offer, index) => (
            <Flex direction={"column"}>
            <Checkbox
              key={index} 
              value={offer.name}
              isChecked={selectedOffers.includes(offer.name)}
              onChange={() => handleOfferChange(offer.name)}
            >
              {offer.name} - {offer.price} €
            </Checkbox></Flex>
          ))}
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Nombre de Comptes</FormLabel>
          <Input
            type="number" bg={"white"}
            placeholder="Combien de comptes ?"
            value={numberOfAccounts}
            onChange={(e) => setNumberOfAccounts(e.target.value)}
          />
        </FormControl>
        <Button colorScheme="blue" type="submit" width="full">
          Acheter
        </Button>
      </form>
    </Box></Box>
  );
};

export default ComponentPurchase;


