import { Box, Flex, Text, Image, Heading, IconButton, Input, Button, useBreakpointValue,useToast } from "@chakra-ui/react";
import { FaLock, FaComment } from "react-icons/fa";
import { db, auth,fieldValue } from "../../../firebase/firebase-config";
import { useState } from "react";
import ButtonWidget from "./Button";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const  CardCour = ({ cour }) => {
  const navigate = useNavigate();
  const userId = auth.currentUser.uid;
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    // Récupérer le rôle de l'utilisateur
    db.collection("user")
      .doc(userId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          setUserRole(userData.role);
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération du rôle de l'utilisateur :", error);
      });
  }, [userId]);
  const handleParticipate = () => {
    navigate(`/DetailsFormation?id=${coursId}`);
      // Mettre à jour le document de l'utilisateur avec l'ID du cours
      db.collection("user")
      .doc(userId)
      .update({
        coursIds: fieldValue.arrayUnion(cour.coursId),
      })
      .then(() => {
        console.log("Cours enregistré avec succès !");
      })
      .catch((error) => {
        console.error("Erreur lors de l'enregistrement du cours :", error);
      });
  };
  useEffect(() => {
    // Vérifier si l'ID du cours est déjà enregistré dans le document de l'utilisateur
    db.collection("user")
      .doc(userId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          const coursIds = userData.coursIds;
          setIsRegistered(coursIds.includes(cour.coursId));
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données de l'utilisateur :", error);
      });
  }, [userId, cour.coursId]);
  const toast = useToast();
  const [courseId, setCoursId] = useState("");
  const checkRegistration = async (coursId) => {
    try {
      const doc = await db.collection("vent").doc(coursId).get();
      if (doc.exists) {
        const isRegistered = doc.data().accepte; // Récupérer la valeur de "accepte" dans la collection "vent"
        setIsRegistered(isRegistered); // Mettre à jour l'état
      }
    } catch (error) {
      console.error("Error checking registration:", error);
    }
  };

  useEffect(() => {
    checkRegistration(cour.coursId);
  }, []);


  const handleAddComment = (coursId) => {
    if (comment.trim() === "") return;

    // Mettre à jour le document de cours avec les données de l'input
    db.collection("cours")
      .doc(coursId)
      .update({
        comments: fieldValue.arrayUnion(comment),
      })
      .then(() => {
        // Reste du code pour envoyer les données du formulaire au serveur
        fetch("https://exemple.com/api/cours/" + coursId + "/comment", {
          method: "POST",
          body: JSON.stringify({ comment }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((response) => response.json())
          .then((json) => {
            console.log(json);
            toast({
              title: "Comment Submitted",
              description: "Your comment has been submitted!",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          })
          .catch((error) => {
            console.error("Error:", error);

          });

        // Réinitialiser la valeur de l'input après l'envoi du commentaire
        setComment("");
        console.log("ajouter");
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
        console.log(courseId);
      });
  };

  const { comments,id, image, titre, date, description, tarife,coursId, } = cour;
  const [isRegistered, setIsRegistered] = useState(false);
  const cardWidth = useBreakpointValue({ base: "calc(60% - 50px)", sm: "calc(100% - 25px)", md: "calc(50% - 25px)", lg: "calc(50% - 50px)" });
  const [comment, setComment] = useState("");


  return (
    <Box bg="white" mx={4} mt={6}  maxWidth={{ base: "auto", md: "sm" }} borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md" flex={1}>
      <Box p={4} >
        <Image src={image}  align="center" justifyContent={"space-around"} width={"100%"}  />
        <Heading as="h2" size="lg" mt={5}>
          {titre}
        </Heading>
        <Flex justifyContent="space-between" direction={{base : "row",md:" row", sm:" row",lg:"column"}}>
          <Text mt={2}>Date à publié</Text>
          <Flex>
            <Text mt={2} color="gray.500">
              {date}
            </Text>
            <IconButton aria-label="Toggle Payment" icon={<FaLock />} variant="ghost" size="sm" />
          </Flex>
        </Flex>
        <Text mt={4} fontSize="sm">
          {description}
        </Text>
        <Flex align="center" mt={4} mb={3}>
          <Text>Tarife :</Text>
          <Text ml={2} fontSize="sm">
            {tarife}pt
          </Text>
        </Flex>
    <Flex  justifyContent={"flex-end"} direction={{base : "column",md:" row", sm:" row"}} mb={4}>
    {/* <Button bg={"blue.400"} mt={6} mb={3} color={"white"} justifyContent={{ base: "center", md: "flex-end" }}  onClick={handleParticipate}>
            Participer
          </Button> */}
          <>
    
          {isRegistered ? (
      <Button size="md" mr={2}  p={4} height={"100%"} colorScheme="blue" ml={2} onClick={() => navigate(`/DetailsFormation?id=${coursId}`)}>
        Voir
      </Button>
    ) : (
      <Button  size="md" mr={2}  p={4} height={"100%"} colorScheme="blue" ml={2}justifyContent={{ base: "center", md: "flex-end" }} onClick={handleParticipate}>
        Participer
      </Button>
    )}
   
  </>
  <>      {userRole === "admin" && (
            <ButtonWidget label="modifier"  type="modal7"  courseId={cour.coursId}  />
          )}

          {/* Condition pour afficher le bouton "supprimer" si l'utilisateur a le rôle "admin" */}
          {userRole === "admin" && (
             <ButtonWidget label="supprimer"  type="modal8" courseId={cour.coursId} />
          )}</>
        
       
        </Flex>
        <Flex align="center" mt={4}>
        {cour.comments ? cour.comments.length : 0}
          <IconButton aria-label="Add Comment" icon={<FaComment />} variant="outline" size="sm" mr={2} value={cour.comments ? cour.comments.length : 0} />
          <Input
  type="text"
  placeholder="Ajouter un commentaire"
  bg="white"
  color="black"
  value={comment}
  onChange={(e) => setComment(e.target.value)}
  _placeholder={{ color: "gray.400" }}
/>

<Button size="sm" colorScheme="blue" ml={2} onClick={() => handleAddComment(coursId)}>
  Ajouter
</Button>

        </Flex>
      </Box>
    </Box>
  );
};

export default CardCour;

