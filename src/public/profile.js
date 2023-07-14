import { useNavigate } from "react-router-dom";
import { Button, Container, Box, Text, Image } from "@chakra-ui/react";
import  {auth }  from "../firebase/firebase-config";
import gsap from "gsap";
import ScrollMagic from "scrollmagic";
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
import React, { useEffect, useRef } from "react";
import CalendarComponent from "../components/Shared/Calendrie";
import ChartWidget from "../components/Shared/Widgets/Statistique";
import SimpleMap from "../components/Shared/Widgets/imagecard";
import Simple from "../components/Course/CourseDetail";
import ThreeTierPricing from "../pages/Packs";
import TunisiaMap from "../components/Shared/Widgets/localisation";
import {
  Flex,
  Avatar,
  Heading,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiLike, BiChat, BiShare } from "react-icons/bi";
import { motion } from "framer-motion";
import Statistique from "../components/Shared/Widgets/Statistique";
import Map from "../components/Shared/Widgets/InfoCard";
// ScrollMagicPluginGsap(ScrollMagic, gsap);
function Logout({ setIsAuth }) {
  // const textRef = useRef(null);
  // const imageRef = useRef(null);

  // useEffect(() => {
  //   const textElement = textRef.current;
  //   const imageElement = imageRef.current;

  //   const controller = new ScrollMagic.Controller();

  //   const textAnimation = gsap.fromTo(
  //     textElement,
  //     { x: "-100%", opacity: 0 },
  //     { x: "0%", opacity: 1, duration: 1 }
  //   );

  //   const imageAnimation = gsap.fromTo(
  //     imageElement,
  //     { x: "100%", opacity: 0 },
  //     { x: "0%", opacity: 1, duration: 1 }
  //   );

    // new ScrollMagic.Scene({
    //   triggerElement: textElement,
    //   triggerHook: 0.8,
    //   reverse: false,
    // })
    //   .setTween(textAnimation)
    //   .addTo(controller);

    // new ScrollMagic.Scene({
    //   triggerElement: imageElement,
  //     triggerHook: 0.8,
  //     reverse: false,
  //   })
  //     .setTween(imageAnimation)
  //     .addTo(controller);
  // }, []);

  //   const navigate = useNavigate();
  
    // const handleLogout = () => {
    //   // Sign out the user
    //   auth.signOut()
    //     .then(() => {
    //       // Clear authentication state and navigate to the desired page
    //       localStorage.removeItem("isAuth");
    //       setIsAuth(false);
    //       navigate("/login");
    //     })
    //     .catch((error) => {
    //       // Handle any errors that occurred during logout
    //       console.error("Error logging out:", error);
    //     });
    // };
  
    // const { isOpen, onToggle } = useDisclosure();
    // const chartData = [
    //   { name: "Jan", sales: 100 },
    //   { name: "Feb", sales: 200 },
    //   { name: "Mar", sales: 150 },
    //   { name: "Apr", sales: 300 },
    //   { name: "May", sales: 250 },
    //   { name: "Jun", sales: 400 },
    // ];
    return (
      < >
      {/* <Button colorScheme="blue" onClick={handleLogout}>
        Logout
      </Button>
          <Box>
          <Text ref={textRef} color={"blue.800"} fontSize="xl" fontWeight="bold">
          Welcome to  ....
          </Text>
          <Box display="flex" alignItems="center">
            <Image
              ref={imageRef}
              src="https://via.placeholder.com/300"
              alt="Animated Image"
              boxSize="200px"
            />
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla aliquet, justo eu
              tristique suscipit, nulla risus sagittis lorem, a lacinia tortor nisl vel metus.
            </Text>
          </Box>
        </Box>
        <Heading color={"black"} mb={12} borderBottom={"2px"} borderBottomColor={"gray.200"} mx={4}>Cours gratuit</Heading>
        <Flex>
        <Box
      maxW="md"
      mx={4}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      transition="all 0.3s ease"
      _hover={{ boxShadow: "lg", transform: "scale(1.05)" }}
    >
      <Flex p="4" justifyContent="space-between" alignItems="center">
        <Flex spacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar
              name="Segun Adebayo"
              src="https://bit.ly/sage-adebayo"
              transition="all 0.3s ease"
              _hover={{ transform: "scale(1.1)" }}
            />

            <Box>
              <Heading size="sm" transition="all 0.3s ease">
                Segun Adebayo
              </Heading>
              <Text transition="all 0.3s ease">Creator, Chakra UI</Text>
            </Box>
          </Flex>
          <IconButton
            variant="ghost"
            colorScheme="gray"
            aria-label="See menu"
            icon={<BsThreeDotsVertical />}
            onClick={onToggle}
            transition="all 0.3s ease"
            _hover={{ transform: "rotate(90deg)" }}
          />
        </Flex>
      </Flex>

      <Text p="4" transition="all 0.3s ease">
        With Chakra UI, I wanted to sync the speed of development with the speed
        of design. I wanted the developer to be just as excited as the designer
        to create a screen.
      </Text>

      <Image
        objectFit="cover"
        src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        alt="Chakra UI"
        transition="all 0.3s ease"
        _hover={{ transform: "scale(1.05)" }}
      />

      <Flex
        p="4"
        justifyContent="space-between"
        flexWrap="wrap"
        sx={{
          "& > button": {
            minW: "136px",
            transition: "all 0.3s ease",
            _hover: {
              bg: "gray.200",
            },
          },
        }}
      >
        <Button flex="1" variant="ghost" leftIcon={<BiLike />} transition="all 0.3s ease">
          Like
        </Button>
        <Button flex="1" variant="ghost" leftIcon={<BiChat />} transition="all 0.3s ease">
          Comment
        </Button>
        <Button flex="1" variant="ghost" leftIcon={<BiShare />} transition="all 0.3s ease">
          Share
        </Button>
      </Flex>
    </Box>
    <Box mx={3}
      maxW="md"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      transition="all 0.3s ease"
      _hover={{ boxShadow: "lg", transform: "scale(1.05)" }}
    >
      <Flex p="4" justifyContent="space-between" alignItems="center">
        <Flex spacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar
              name="Segun Adebayo"
              src="https://bit.ly/sage-adebayo"
              transition="all 0.3s ease"
              _hover={{ transform: "scale(1.1)" }}
            />

            <Box>
              <Heading size="sm" transition="all 0.3s ease">
                Segun Adebayo
              </Heading>
              <Text transition="all 0.3s ease">Creator, Chakra UI</Text>
            </Box>
          </Flex>
          <IconButton
            variant="ghost"
            colorScheme="gray"
            aria-label="See menu"
            icon={<BsThreeDotsVertical />}
            onClick={onToggle}
            transition="all 0.3s ease"
            _hover={{ transform: "rotate(90deg)" }}
          />
        </Flex>
      </Flex>

      <Text p="4" transition="all 0.3s ease">
        With Chakra UI, I wanted to sync the speed of development with the speed
        of design. I wanted the developer to be just as excited as the designer
        to create a screen.
      </Text>

      <Image
        objectFit="cover"
        src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        alt="Chakra UI"
        transition="all 0.3s ease"
        _hover={{ transform: "scale(1.05)" }}
      />

      <Flex
        p="4"
        justifyContent="space-between"
        flexWrap="wrap"
        sx={{
          "& > button": {
            minW: "136px",
            transition: "all 0.3s ease",
            _hover: {
              bg: "gray.200",
            },
          },
        }}
      >
        <Button flex="1" variant="ghost" leftIcon={<BiLike />} transition="all 0.3s ease">
          Like
        </Button>
        <Button flex="1" variant="ghost" leftIcon={<BiChat />} transition="all 0.3s ease">
          Comment
        </Button>
        <Button flex="1" variant="ghost" leftIcon={<BiShare />} transition="all 0.3s ease">
          Share
        </Button>
      </Flex>
    </Box>
        <Box mx={3}
      maxW="md"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      transition="all 0.3s ease"
      _hover={{ boxShadow: "lg", transform: "scale(1.05)" }}
    >
      <Flex p="4" justifyContent="space-between" alignItems="center">
        <Flex spacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar
              name="Segun Adebayo"
              src="https://bit.ly/sage-adebayo"
              transition="all 0.3s ease"
              _hover={{ transform: "scale(1.1)" }}
            />

            <Box>
              <Heading size="sm" transition="all 0.3s ease">
                Segun Adebayo
              </Heading>
              <Text transition="all 0.3s ease">Creator, Chakra UI</Text>
            </Box>
          </Flex>
          <IconButton
            variant="ghost"
            colorScheme="gray"
            aria-label="See menu"
            icon={<BsThreeDotsVertical />}
            onClick={onToggle}
            transition="all 0.3s ease"
            _hover={{ transform: "rotate(90deg)" }}
          />
        </Flex>
      </Flex>

      <Text p="4" transition="all 0.3s ease">
        With Chakra UI, I wanted to sync the speed of development with the speed
        of design. I wanted the developer to be just as excited as the designer
        to create a screen.
      </Text>

      <Image
        objectFit="cover"
        src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        alt="Chakra UI"
        transition="all 0.3s ease"
        _hover={{ transform: "scale(1.05)" }}
      />

      <Flex
        p="4"
        justifyContent="space-between"
        flexWrap="wrap"
        sx={{
          "& > button": {
            minW: "136px",
            transition: "all 0.3s ease",
            _hover: {
              bg: "gray.200",
            },
          },
        }}
      >
        <Button flex="1" variant="ghost" leftIcon={<BiLike />} transition="all 0.3s ease">
          Like
        </Button>
        <Button flex="1" variant="ghost" leftIcon={<BiChat />} transition="all 0.3s ease">
          Comment
        </Button>
        <Button flex="1" variant="ghost" leftIcon={<BiShare />} transition="all 0.3s ease">
          Share
        </Button>
      </Flex>
    </Box></Flex>
<TunisiaMap/>
    <CalendarComponent />
    <ChartWidget data={chartData} />
<ThreeTierPricing/>
    <SimpleMap/>
    <Simple/> */}
        </>
      );
    };
   
  
 
export default Logout
