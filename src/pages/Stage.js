import StagePage from "../components/Shared/Widgets/StagerCard";
import ButtonWidget from "../components/Shared/Widgets/Button";
import { Box, Flex } from "@chakra-ui/react";
function Stage(){
    return(<Box><Flex justifyContent={"flex-end"} mr={12} mt={5}> <ButtonWidget label="stage"  type="modal3" /></Flex>
    <StagePage/></Box>)
}
export default Stage;