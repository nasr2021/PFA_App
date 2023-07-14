import React from 'react';
import { Box, Flex, Text, Image } from '@chakra-ui/react';

const WeatherCard = ({ city, temperature, description, icon }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} bg={"white"} ml={5} mt={5} mb={5} width={"auto"}>
      <Flex alignItems="center" mb={4}>
        <Image src={icon} alt="Weather Icon" boxSize={8} mr={2} />
        <Text fontSize="xl" fontWeight="bold">
          {city}
        </Text>
      </Flex>
      <Box textAlign="center">
        <Text fontSize="4xl" fontWeight="bold">
          {temperature}°C
        </Text>
        <Text fontSize="md" color="gray.500">
          {description}
        </Text>
      </Box>
    </Box>
  );
};
export default WeatherCard;