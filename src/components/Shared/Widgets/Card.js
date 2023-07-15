import { Box,Button, useToast, Flex, Text, Heading, IconButton, Avatar,Input } from "@chakra-ui/react";
import { FaLock, FaUnlock, FaStar, FaComment } from "react-icons/fa";
import { fieldValue, db,auth } from "../../../firebase/firebase-config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonWidget from "./Button";
const Card = ({formation}) => {
  const navigate = useNavigate();
  const userId = auth.currentUser.uid;
  const [userRole, setUserRole] = useState("");

 
  const [formationsId, setformationId] = useState("");
  const [comment, setComment] = useState("");
  const toast = useToast();
  const [rating, setRating] = useState(0);
  useEffect(() => {
    // Vérifier si l'ID de formation est déjà enregistré dans le document de l'utilisateur
    db.collection("user")
      .doc(userId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          const formationIds = userData.formationIds;
          if (formationIds.includes(formation.formationId)) {
            setformationId(formation.formationId);
          }
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données de l'utilisateur :", error);
      });
  }, [userId, formation.formationId]);

  const handleParticipate = () => {
    if (type !== "gratuit") {
      navigate(`/Simple?id=${formationsId}`);
    }
  };
  
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
  const { type,profession, avatar, title, date, description, prix ,formationId } = formation;
  const handleAddRating = (formationId, ratingValue) => {
    db.collection("formation")
      .doc(formationId)
      .update({
        ratings: fieldValue.arrayUnion(ratingValue),
      })
      .then(() => {
        // Reste du code pour envoyer les données du formulaire au serveur
        fetch("https://exemple.com/api/formation/" + formationId + "/rating", {
          method: "POST",
          body: JSON.stringify({ rating: ratingValue }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((response) => response.json())
          .then((json) => {
            console.log(json);
            toast({
              title: "Rating Submitted",
              description: "Your rating has been submitted!",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          })
          .catch((error) => {
            console.error("Error adding rating:", error);
          });
      })
      .catch((error) => {
        console.error("Error adding rating:", error);
      });
  };
  const handleAddComment = (formationId) => {
    if (comment.trim() === "") return;
   
    
    // Mettre à jour le document de cours avec les données de l'input
    db.collection("formation")
      .doc(formationId)
      .update({
        comments: fieldValue.arrayUnion(comment),
      })
      .then(() => {
        // Reste du code pour envoyer les données du formulaire au serveur
        fetch("https://exemple.com/api/formation/" + formationId + "/comment", {
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
        console.log(formationsId);
      });
  };
  return (
    <Flex
      position="relative"
      direction={{ base: "column", md: "row" }}
      p={6}
      width={{ base: "100%", md: "calc(33.33% - 20px)" }}
      margin={2}
    >
      <Flex position={"absolute"} mb={12} mt={3} pb={12} direction={{ base: "column", md: "row" }}>
        <Avatar size={"md"} src={avatar} mx={4} alt="Person" />
        <Box as="badge" p={3} bg={"gray.100"} border={"2px"} borderColor={"white"} borderRadius={"2xl"}>
          {profession}
        </Box>
      </Flex>
      <Box 
        bg={"white"} 
        mt={{ base: 12, md: 0 }}
        width="100%"
        maxWidth={{ base: "auto", md: "sm" }}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="md"
      >
        <Box p={4}>
          <Heading as="h2" size="lg" mt={12}>
            {title}
          </Heading>
          <Flex justifyContent={"space-between"} mt={2}>
            <Text>{date}</Text>
            <Flex>
  {type !== "gratuit" ? (
    <>
      <Text color="gray.500">{prix}dt</Text>
      <IconButton
        aria-label="Toggle Payment"
        icon={formationsId === formationId ? <FaUnlock /> : < FaLock/>}
        variant="ghost"
        size="sm"
      />
    </>
  ) : (
    <>
      <Text color="gray.500">{type}</Text>
      <IconButton
        aria-label="Toggle Payment"
        icon={formationsId === formationId ? <  FaUnlock  /> : <FaUnlock />}
        variant="ghost"
        size="sm"
      />
    </>
  )}
</Flex>

          </Flex>
          <Text mt={4} mb={3} fontSize="sm">
            {description}
          </Text>
          <>
    {userRole !== "admin" &&formationsId !== formationId ? (
      <ButtonWidget label="participer" type="modal6" formationId={formation.formationId} />
    ) : (
      <Button p={4} height={"100%"}
      mr={3}
      size="md" onClick={handleParticipate}>
        voir
      </Button>
    )}
    
  </>
  <>      {userRole === "admin" && (
            <ButtonWidget label="modifier"  type="modal14"  formationId={formation.formationId}  />
          )}

          {/* Condition pour afficher le bouton "supprimer" si l'utilisateur a le rôle "admin" */}
          {userRole === "admin" && (
             <ButtonWidget label="supprimer"  type="modal13" formationId={formation.formationId} />
          )}</>
          <Flex align="center" mt={4}>
            <Flex align="center" mt={4}>
            {[1, 2, 3, 4, 5].map((index) => (
      <FaStar
        key={index}
        color={index <= rating ? "yellow.400" : "gray.300"}
        onClick={() => handleAddRating(formationId, index)}
        cursor="pointer"
      />
    ))}
            </Flex>
            
            <Text ml={2} fontSize="sm">
              ({formation.ratings ? formation.ratings.length : 0} avis)
            </Text>
          </Flex>
  
          <Flex align="center" mt={4}>
            {formation.comments ? formation.comments.length : 0}
            <IconButton aria-label="Add Comment" icon={<FaComment />} variant="outline" size="sm" mr={2} value={formation.comments ? formation.comments.length : 0} />
            <Input
              type="text"
              placeholder="Ajouter un commentaire"
              bg="white"
              color="black"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              _placeholder={{ color: "gray.400" }}
            />
  
            <Button size="sm" colorScheme="blue" ml={2} onClick={() => handleAddComment(formationId)}>
              Ajouter
            </Button>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
  
};



export default Card;

