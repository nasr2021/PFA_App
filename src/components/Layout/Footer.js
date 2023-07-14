import { Box, Flex, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box bg="gray.200" py={4} mt={20} position="fixed" bottom={0} left={0} right={0}>
      <Flex justify="center">
        <Text fontSize="sm" color="gray.500">
          © 2023 Mon Application. Tous droits réservés.
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;
