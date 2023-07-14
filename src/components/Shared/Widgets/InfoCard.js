import React from "react";
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
const InfoCard = ({ title, value }) => {
  const cardColors = [
    "teal.400",
    "blue.400",
    "purple.400",
    "yellow.400",
    "pink.400",
  ];
  const randomColor = cardColors[Math.floor(Math.random() * cardColors.length)];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        bg={useColorModeValue("white", "gray.800")}
        borderRadius="md"
        boxShadow="md"
        p={4} borderLeft={"8px"} borderLeftColor={randomColor}
        textAlign="center"
        transition="all 0.3s ease"
        _hover={{ transform: "scale(1.05)" }}
      >
        <Text
          fontSize="lg"
          fontWeight="bold"
          mb={2}
          color={useColorModeValue("gray.800", "white")}
        >
          {title}
        </Text>
        <Text fontSize="3xl" fontWeight="bold" color={randomColor} >
          {value}
        </Text>
      </Box>
    </motion.div>
  );
};

export default InfoCard;
