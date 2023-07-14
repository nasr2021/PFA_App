  import {Stack,Flex,Button,Text,VStack,useBreakpointValue,Heading,} from '@chakra-ui/react';
  import LoginApp from '../components/Auth/Login';
  import Info from '../components/Shared/Widgets/info';
  import { motion } from 'framer-motion';
  import Packs from './Packs';
  import BlogPost from '../components/Shared/Widgets/bloc';
  import CardList from '../components/Course/CourseList';
  import CaptionCarousel from '../components/Shared/Widgets/carosselCard';
  import BlogPage from '../components/Shared/Widgets/pagination';
  export default function HomeS() {
  const MotionText = motion(Text);
  const MotionButton = motion(Button);
    return (
        <>
      <Flex
        w={'full'}
        h={'100vh'}
        backgroundImage={
          'url(https://images.unsplash.com/photo-1600267175161-cfaa711b4a81?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)'
        }
        backgroundSize={'cover'}
        backgroundPosition={'center center'}>
        <VStack
          w={'full'}
          justify={'center'}
          px={useBreakpointValue({ base: 4, md: 8 })}
          bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
          <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
          <MotionText
  color={'white'}
  fontWeight={700}
  lineHeight={1.2}
  fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.2 }}
>
  Welcome to .............
</MotionText>
            <Stack direction={'row'}>
            <MotionButton
    bg={'blue.400'}
    rounded={'full'}
    color={'white'}
    _hover={{ bg: 'blue.500' }}
    initial={{ opacity: 0, x: -100 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay: 0.4 }}
  >
    Login
  </MotionButton>
  <MotionButton
    bg={'whiteAlpha.300'}
    rounded={'full'}
    color={'white'}
    _hover={{ bg: 'whiteAlpha.500' }}
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay: 0.4 }}
  >
    Logout
  </MotionButton>
            </Stack>
          </Stack>
        </VStack>
      </Flex>
      <Heading mx={12} mt={12}>Cours</Heading>
      <CardList/>
      <Info/>
      <Heading mx={12} mt={12} mb={6}>Formation</Heading>
      <CaptionCarousel  />
      <BlogPost/>
      <Text borderBottom={'2px'} borderBottomColor={'gray.200'} mx={12}></Text>
      <Packs/>
    <BlogPage/>

     </>
    );
  }
