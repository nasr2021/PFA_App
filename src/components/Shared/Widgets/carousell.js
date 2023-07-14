import { useState } from 'react';
import { Box, Flex, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const Carousel = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <Box position="relative">
      <Flex alignItems="center" justifyContent="center">
        {items.map((item, index) => (
          <Box
            key={index}
            opacity={index === activeIndex ? 1 : 0}
            position="absolute"
            transition="opacity 0.3s"
          >
            {item}
          </Box>
        ))}
      </Flex>
      <IconButton
        icon={<ChevronLeftIcon />}
        aria-label="Previous"
        position="absolute"
        left={0}
        top="50%"
        transform="translateY(-50%)"
        onClick={handlePrev}
      />
      <IconButton
        icon={<ChevronRightIcon />}
        aria-label="Next"
        position="absolute"
        right={0}
        top="50%"
        transform="translateY(-50%)"
        onClick={handleNext}
      />
    </Box>
  );
};

export default Carousel;
