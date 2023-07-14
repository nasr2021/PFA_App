import { Box, Center, Text } from "@chakra-ui/react";
import { auth ,db } from "../../../firebase/firebase-config";
import { useEffect ,useState} from "react";
const CongratulationCard = () => {
  const [userDocument, setUserDocument] = useState(null); 
  useEffect(() => {
    // Fonction pour récupérer le document de l'utilisateur connecté
    const fetchUserDocument = async (userId) => {
     try {
       const userDoc = await db.collection("user").doc(userId).get();
       if (userDoc.exists) {
         setUserDocument(userDoc.data());
       }
     } catch (error) {
       console.error("Error fetching user document:", error);
     }
   };
     // Obtenir l'ID de l'utilisateur actuel en dehors de useEffect
     const userId = auth.currentUser ? auth.currentUser.uid : null;

     // Vérifier si userId existe avant d'appeler fetchUserDocument
     if (userId) {
       fetchUserDocument(userId);
     } }, []);
  return (
    <Box
      width={"auto"}
      borderWidth="1px"
      borderRadius="md"
      p={4} mt={5} mb={5} ml={5}
      bgImage="url('https://img.freepik.com/free-vector/realistic-golden-confetti-background_52683-26885.jpg?size=626&ext=jpg&ga=GA1.1.15564180.1673732749&semt=sph')"
      bgSize="cover"
      bgPosition="center"
     // boxShadow="md"
    >
      <Text fontSize="xl" fontWeight="bold" mb={4} align={"center"}>
        Félicitations, vous êtes connecté !
      </Text>
      <Text fontSize="lg" align={"center"} >
        Bienvenue, <b>{userDocument?.firstName} {userDocument?.lastName}</b> !
      </Text>
    </Box>
  );
};

export default CongratulationCard;
