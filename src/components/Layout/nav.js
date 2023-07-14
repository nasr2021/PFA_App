// import { Box, Flex, Icon, Link, Menu, MenuButton, Text } from "@chakra-ui/react";

// function NavItems({navSize,title, icon,active}){
//   return (
//    <Flex
//    mt={30}
//    flexDir={"column"}
//    w={"100%"}
//    alignItems={navSize=="small"?"center":"flex-start"}
//    >
// <Menu>
//   <Link bg={active && "gray.100"}
//   p={3}
//   borderRadius={8}
//   _hover={{textDecor:'none', backgroundColor:"black"}}
//   w={navSize=="large" && "100%"}
  
//   >
//   <MenuButton w={"100%"}>
//     <Flex>
//       <Icon as={icon} fontSize={"xl"} color={active? "black":"blue"}/>
//       <Text ml={5} display={navSize=="small"? "none":"flex"}>{title}</Text>
//     </Flex>
//   </MenuButton>
//   </Link>
// </Menu>
//    </Flex>
//   );
// };

// export default NavItems;



// import { MdRateReview } from "react-icons/md";
// import { FaHome, FaBook } from "react-icons/fa";
// import {FiMenu} from "react-icons/fi";
// import { MdMiscellaneousServices } from "react-icons/md";
// import { IoInformationCircleSharp } from "react-icons/io5";
// import { BsFillFileEarmarkPostFill } from "react-icons/bs";
// import { BiWorld } from "react-icons/bi";
// import { AiFillSchedule, AiFillLayout, AiFillMail, AiFillHdd } from "react-icons/ai";
// import { Box, Flex, Link, Input, IconButton, Badge, Avatar, Text, Divider, Heading } from "@chakra-ui/react";
// import { MdOutlineNoteAlt } from "react-icons/md";
// import { MdFindInPage } from "react-icons/md";
// import { BiSolidLogOut } from "react-icons/bi";
// import { BiSolidNotepad } from "react-icons/bi";
// import { auth, db } from "../../firebase/firebase-config";
// import { useState, useEffect } from "react";
// import NavItems from "./Footer";
// const Sidebar = () => {
//   const [imageUrl, setImageUrl] = useState("");
// const [ navSize, changeNavSize]=useState("large")
//   useEffect(() => {
//     // Récupérer l'utilisateur connecté
//     const currentUser = auth.currentUser;

//     if (currentUser) {
//       // Récupérer l'ID de l'utilisateur connecté
//       const userId = currentUser.uid;

//       // Récupérer les informations de l'utilisateur à partir de la collection "users" dans Firestore
//       const userRef = db.collection("user").doc(userId);

//       userRef
//         .get()
//         .then((doc) => {
//           if (doc.exists) {
//             // Récupérer l'URL de l'image de l'utilisateur
//             const userData = doc.data();
//             const userImage = userData.image;

//             setImageUrl(userImage);
//           }
//         })
//         .catch((error) => {
//           console.log("Erreur lors de la récupération des informations de l'utilisateur :", error);
//         });
//     }
//   }, []);

//   return (
//     <Flex 
//     pos={"sticky"}
//    // left={5}
//     h={"100vh"}
//     //mt="2.5vh"
//     boxShadow="0 4px 12px 0 rgba(0,0,0,0.05)"
    
//     flexDir={"column"}
//     justifyContent={"space-between"}
//     w={navSize=="small"?"75px":"200px"}
//     >
// <Flex
// p="5%"
// flexDir={"column"}
// alignItems={"flex-start"}
// as={"nav"}
// >
// <IconButton bg={"none"} mt={5}
// _hover={{bg:'none'}}
// icon={<FiMenu/>}
// onClick={()=>{
//   if(navSize=="small"){
//     changeNavSize("large")
//   }
//   else{ changeNavSize("small")}


// } }
// /> 
// {/* <NavItems navSize={navSize} icon={<AiFillLayout />} title={"Dashboard"} active />
// <NavItems navSize={navSize} icon={<FaBook />} title={" Cours"}/>
// <NavItems navSize={navSize} icon={<IoInformationCircleSharp />} title={" Examen"}/>
// <NavItems navSize={navSize} icon={ <BiWorld />} title={"Bourse"}/>
// <NavItems navSize={navSize} icon={<BsFillFileEarmarkPostFill />} title={"Stage"}/>
// <NavItems navSize={navSize} icon={<MdFindInPage />} title={"Fiche"}/>
// <NavItems navSize={navSize} icon={<AiFillHdd />} title={"  Archive PFE"}/>
// <NavItems navSize={navSize} icon={<BiSolidNotepad />} title={"Note"}/>
// <NavItems navSize={navSize} icon={<AiFillSchedule />} title={"Emploi du temps"}/>
// <NavItems navSize={navSize} icon={<AiFillMail />} title={"Réclamation"}/>

// <NavItems navSize={navSize} icon={<MdMiscellaneousServices />} title={"Paramètre"}/>
// <NavItems navSize={navSize} icon={<BiSolidLogOut />} title={"Logout"}/> */}

// </Flex>
// <Flex
// p={"5%"}
// flexDir={"column"}
// w={"100%"}
// alignItems={navSize=="small"?"none":"flex"}
// mb={4}



// >
//   <Divider display={navSize=="small"?"none":"flex"}/>
// <Flex mt={4} align={"center"}>
// <Avatar size={"sm"} src={imageUrl}/>
// <Flex flexDir={"column"} ml={4} display={navSize=="small"?"none":"flex"}>
//   <Heading as="h3" size={"sm"}>sylwia weller</Heading>
//   <Text>Admin</Text>


//   </Flex>
// </Flex>
// </Flex>
//     </Flex>


