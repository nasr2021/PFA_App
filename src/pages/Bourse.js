import SplitWithImage from "../components/Shared/Widgets/CardBours";
import { db } from "../firebase/firebase-config";
import { Box ,Flex} from "@chakra-ui/react";
import ButtonWidget from "../components/Shared/Widgets/Button";
import { useEffect, useState } from "react";
function Bourse(){
    const [bourse, setBourse] = useState([]);

    useEffect(() => {
      const fetchBourse = async () => {
        try {
          const bourseSnapshot = await db.collection('bourse').get();
          const bourseData = bourseSnapshot.docs.map((doc) => doc.data());
          setBourse(bourseData);
        } catch (error) {
          console.log('Erreur lors de la récupération des bourses :', error);
        }
      };
  
      fetchBourse();
    }, []);
    return( <Box p={1} mx={12}> <Flex  mr={12} mt={3} justifyContent={"flex-end"}> <ButtonWidget label="Bourse" type="modal4" /></Flex>
        {bourse.map((bourse, index) => (
          <SplitWithImage key={index} bourse={bourse} />
        ))}
      </Box>)
}
export default Bourse;