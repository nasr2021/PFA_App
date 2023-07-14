import { Container, SimpleGrid, Image, Flex,Box, Heading, Text, Stack, StackDivider, Icon, useColorModeValue } from '@chakra-ui/react';
import { IoAnalyticsSharp, IoCalendar, IoLogoBitcoin, IoSearchSharp } from 'react-icons/io5';
import { ReactElement } from 'react';
import { motion } from 'framer-motion';
import { db } from '../../../firebase/firebase-config';
import ButtonWidget from './Button';
interface FeatureProps {
  text: string;
  iconBg: string;
  icon?: ReactElement;
}

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
  return (
    <Stack direction={'row'} align={'center'}>
      <Flex
        w={8}
        h={8}
        align={'center'}
        justify={'center'}
        rounded={'full'}
        bg={iconBg}
        as={motion.div}
        whileHover={{ scale: 1.1 }}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

export default function SplitWithImage({bourse}) {
  const { date, image, nomBourse, state, prix,  description } = bourse;
  return (
  
      
    <Box py={12} mb={3} width={{ base: '100%', md: '170vh' }} borderBottomColor="wheat" borderBottom="2px">
     
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Text
              textTransform="uppercase"
              color="blue.400"
              fontWeight={600}
              fontSize="sm"
              bg={useColorModeValue('blue.50', 'blue.900')}
              p={2}
              alignSelf="flex-start"
              rounded="md"
            >
              Decrocher une bourse
            </Text>
            <Heading mb={3}>{nomBourse}</Heading>
            <Text color="gray.500" fontSize="lg">
              {description}
            </Text>
            <Stack
              mt={2}
              spacing={4}
              divider={<StackDivider borderColor={useColorModeValue('gray.100', 'gray.700')} />}
            >
              <Feature
                icon={<Icon as={IoCalendar} color="yellow.500" w={5} h={5} />}
                iconBg={useColorModeValue('yellow.100', 'yellow.900')}
                text={date}
              />
              <Feature
                icon={<Icon as={IoLogoBitcoin} color="green.500" w={5} h={5} />}
                iconBg={useColorModeValue('green.100', 'green.900')}
                text={prix}
              />
              <Feature
                icon={<Icon as={IoSearchSharp} color="purple.500" w={5} h={5} />}
                iconBg={useColorModeValue('purple.100', 'purple.900')}
                text={state}
              />
            </Stack>
          </motion.div>
        </Stack>
        <Flex>
          <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
            <Image rounded="md" alt="feature image" src={image} objectFit="cover" width="100%" height="100%" />
          </motion.div>
        </Flex>
      </SimpleGrid>
    </Box>
  );
}
