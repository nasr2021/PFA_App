import { Box, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";


function AnimatedSection() {
    return (
      <Box>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img src="/path/to/image" alt="Image" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Text fontSize="xl" fontWeight="bold">
            Texte avec animation
          </Text>
        </motion.div>
      </Box>
    );
  }
  export default AnimatedSection;
  