import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Step,
  Steps,Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useForm, FormProvider, useFormContext, Controller } from "react-hook-form";
import { Progress, Heading, VStack, HStack } from "@chakra-ui/react";
import { db,auth,storageRef } from "../firebase/firebase-config";
const BasicForm = () => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <>
     <FormControl isInvalid={errors.image}>
        <FormLabel htmlFor="image">Image</FormLabel>
        <Controller
          control={control}
          name="image"
          render={({ field }) => <Input bg={"white"} {...field} id="image" type="file" />}
        />
        <FormErrorMessage>{errors.image && errors.image.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.firstName}>
        <FormLabel htmlFor="firstName">First Name</FormLabel>
        <Controller
          control={control}
          name="firstName"
          render={({ field }) => <Input bg={"white"} {...field} id="firstName" placeholder="Enter Your First Name" />}
        />
        <FormErrorMessage>{errors.firstName && errors.firstName.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.lastName}>
        <FormLabel htmlFor="lastName">Last Name</FormLabel>
        <Controller
          control={control}
          name="lastName"
          render={({ field }) => <Input bg={"white"} {...field} id="lastName" placeholder="Enter Your Last Name" />}
        />
        <FormErrorMessage>{errors.lastName && errors.lastName.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.adresse}>
        <FormLabel htmlFor="adresse">Adresse</FormLabel>
        <Controller
          control={control}
          name="adresse"
          render={({ field }) => <Input bg={"white"} {...field} id="adresse" placeholder="Enter Your Adresse" />}
        />
        <FormErrorMessage>{errors.adresse && errors.adresse.message}</FormErrorMessage>
      </FormControl>
     
    
    </>
  );
};

const ContactForm = () => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <>
       <FormControl isInvalid={errors.dateNaissance}>
        <FormLabel htmlFor="dateNaissance">Date de Naissance</FormLabel>
        <Controller
          control={control}
          name="dateNaissance"
          render={({ field }) => <Input bg={"white"} {...field} id="dateNaissance" type="date" />}
        />
        <FormErrorMessage>{errors.dateNaissance && errors.dateNaissance.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.lieuNaissance}>
        <FormLabel htmlFor="lieuNaissance">Lieu de Naissance</FormLabel>
        <Controller
          control={control}
          name="lieuNaissance"
          render={({ field }) => <Input bg={"white"} {...field} id="lieuNaissance" placeholder="Enter Your Lieu de Naissance" />}
        />
        <FormErrorMessage>{errors.lieuNaissance && errors.lieuNaissance.message}</FormErrorMessage>
      </FormControl>
     <FormControl isInvalid={errors.cin}>
        <FormLabel htmlFor="cin">CIN</FormLabel>
        <Controller
          control={control}
          name="cin"
          render={({ field }) => <Input type="number" bg={"white"} {...field} id="cin" placeholder="Enter Your CIN" />}
        />
        <FormErrorMessage>{errors.cin && errors.cin.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.emailAddress}>
        <FormLabel htmlFor="emailAddress">E-mail</FormLabel>
        <Controller
          control={control}
          name="emailAddress"
          render={({ field }) => <Input type="email" bg={"white"} {...field} id="emailAddress" placeholder="Enter Your E-mail Address" />}
        />
        <FormErrorMessage>{errors.emailAddress && errors.emailAddress.message}</FormErrorMessage>
      </FormControl>
    
    
    </>
  );
};

const PersonalForm = () => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <>
       <FormControl isInvalid={errors.ecole}>
        <FormLabel htmlFor="ecole">Ecole</FormLabel>
        <Controller
          control={control}
          name="ecole"
          render={({ field }) => <Input type="text" bg={"white"} {...field} id="ecole" placeholder="Enter Your Ecole" />}
        />
        <FormErrorMessage>{errors.ecole && errors.ecole.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.cycle}>
        <FormLabel htmlFor="cycle">Cycle</FormLabel>
        <Controller
          control={control}
          name="cycle"
          render={({ field }) => <Input bg={"white"} {...field} id="cycle" placeholder="Enter Your Cycle" />}
        />
        <FormErrorMessage>{errors.cycle && errors.cycle.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.niveaux}>
        <FormLabel htmlFor="niveaux">Niveaux</FormLabel>
        <Controller
          control={control}
          name="niveaux"
          render={({ field }) => <Input bg={"white"} {...field} id="niveaux" placeholder="Enter Your Niveaux" />}
        />
        <FormErrorMessage>{errors.niveaux && errors.niveaux.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.specialite}>
        <FormLabel htmlFor="specialite">Spécialité</FormLabel>
        <Controller
          control={control}
          name="specialite"
          render={({ field }) => <Input bg={"white"} {...field} id="specialite" placeholder="Enter Your Spécialité" />}
        />
        <FormErrorMessage>{errors.specialite && errors.specialite.message}</FormErrorMessage>
      </FormControl>
    </>
  );
};

const PaymentForm = () => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <>
            <FormControl isInvalid={errors.situation}>
        <FormLabel htmlFor="situation">Situation</FormLabel>
        <Controller
          control={control}
          name="situation"
          render={({ field }) => (
            <Select
              {...field}
              id="situation"
              placeholder="Select Your Situation"
              bg="white"
            >
              <option value="célibataire">célibataire</option>
              <option value="marier ">marier</option>
              <option value="divorce">divorce</option>
            
            </Select>
          )}
        />
        <FormErrorMessage>{errors.situation && errors.situation.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.sexe}>
        <FormLabel htmlFor="sexe">Sexe</FormLabel>
        <Controller
          control={control}
          name="sexe"
          render={({ field }) => (
            <Select
              {...field}
              id="sexe"
              placeholder="Select Your Sexe"
              bg="white"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Select>
          )}
        />
        <FormErrorMessage>{errors.sexe && errors.sexe.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.nationalite}>
        <FormLabel htmlFor="nationalite">Nationalité</FormLabel>
        <Controller
          control={control}
          name="nationalite"
          render={({ field }) => <Input {...field} id="nationalite" bg={"white"} placeholder="Enter Your Nationalité" />}
        />
        <FormErrorMessage>{errors.nationalite && errors.nationalite.message}</FormErrorMessage>
      </FormControl>
    </>
  );
};

const steps = ["Basic information",  "Personal Information",  "Personal Information","Contact Information"];

const SchoolForm = () => {
  const methods = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      adresse: "",
      dateNaissance: "",
      lieuNaissance: "",
      cin: "",
      cycle: "",
      niveaux: "",
      specialite: "",
      situation: "",
      sexe: "",
      nationalite: "",
    },
  });
  const [activeStep, setActiveStep] = useState(0);
  const toast = useToast();

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <BasicForm />;
      case 1:
        return <ContactForm />;
        
      case 2:
        return <PaymentForm />;
       
      case 3:
        return <PersonalForm />;
        
      default:
        return null;
    }
  };



  const handleNext = (data) => {
    if (activeStep === steps.length - 1) {
      const imageFile = data.image[0]; // Récupérer le fichier d'image à partir des données du formulaire
  
      // Créer une référence au chemin de stockage de l'image
      const imageRef = storageRef.child(`images/${imageFile.name}`);
  
      // Envoyer le fichier d'image à Firebase Storage
      imageRef
        .put(imageFile)
        .then((snapshot) => {
          console.log("Image uploaded:", snapshot);
  
          // Obtenir l'URL de téléchargement de l'image
          return snapshot.ref.getDownloadURL();
        })
        .then((imageUrl) => {
          console.log("Image URL:", imageUrl);
  
          // Mettre à jour les données du formulaire avec l'URL de l'image
          data.image = imageUrl;
  
          // Envoyer les données du formulaire au serveur
          fetch("https://jsonplaceholder.typicode.com/comments", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          })
            .then((response) => response.json())
            .then((json) => {
              console.log(json);
              const userId = auth.currentUser.uid; // Récupérer l'ID de l'utilisateur actuel
              const userRef = db.collection("user").doc(userId); // Référence du document de l'utilisateur
  
              // Mettre à jour le document de l'utilisateur avec les données du formulaire
              userRef
                .set(data, { merge: true })
                .then(() => {
                  setActiveStep((prevStep) => prevStep + 1);
                  toast({
                    title: "Form Submitted",
                    description: "Thank you for your submission!",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                  });
                })
                .catch((error) => {
                  console.error("Error:", error);
                  toast({
                    title: "Form Submission Failed",
                    description: "An error occurred while submitting the form.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                  });
                });
            });
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };
  
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleReset = () => {
    methods.reset();
    setActiveStep(0);
  };

  return (
    <Box m={[2, 4, 6, 8]} p={[2, 4, 6, 8]} border={"8px"} borderColor={"white"}>
    <Heading mb={4}>School Registration Form</Heading>
    <Progress value={((activeStep + 1) / steps.length) * 100} mb={4} />
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleNext)}>
        <Stack spacing={4}>
          <VStack spacing={4} align="start">
            <Text fontSize={["md", "lg"]} textAlign="center">{steps[activeStep]}</Text>
            {getStepContent(activeStep)}
          </VStack>
          <HStack spacing={4} justify={activeStep === 0 ? "flex-end" : "space-between"}>
            {activeStep !== 0 && (
              <Button colorScheme="gray" onClick={handleBack}>
                Back
              </Button>
            )}
            <Button colorScheme="blue" type="submit">
              {activeStep === steps.length - 1 ? "Submit" : "Next"}
            </Button>
          </HStack>
        </Stack>
      </form>
    </FormProvider>
  </Box>
  );
};

export default SchoolForm;
