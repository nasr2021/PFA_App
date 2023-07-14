import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  VStack,
  ChakraProvider,
} from "@chakra-ui/react";

export default function FiliereForm () {
  const [filiere, setFiliere] = useState("");
  const [filiereList, setFiliereList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (filiere) {
      setFiliereList((prevList) => [...prevList, filiere]);
      setFiliere("");
    }
  };

  return (
    <VStack spacing={4}>
      <form onSubmit={handleSubmit}>
        <FormControl id="filiere">
          <FormLabel>Ajouter une filière</FormLabel>
          <Stack direction="row">
            <Input
              type="text"
              value={filiere}
              onChange={(e) => setFiliere(e.target.value)}
            />
            <Button type="submit">Ajouter</Button>
          </Stack>
        </FormControl>
      </form>

      {filiereList.length > 0 && (
        <VStack align="start">
          <FormLabel>Liste des filières ajoutées :</FormLabel>
          <ul>
            {filiereList.map((filiere, index) => (
              <li key={index}>{filiere}</li>
            ))}
          </ul>
        </VStack>
      )}
    </VStack>
  );
};

 
