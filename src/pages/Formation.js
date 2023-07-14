import FormationPage from "../components/Shared/Widgets/FormationCard";
import CardList from "../components/Course/CourseList";
import { Box, Flex } from "@chakra-ui/react";
import ButtonWidget from "../components/Shared/Widgets/Button";
export default function Formation(){
    return(<Box ><Flex justifyContent={"flex-end"} mt={5} mr={12}><ButtonWidget label="formation"   type="modal2" /></Flex>
        <CardList/></Box>
    )
}