import { MdRateReview } from "react-icons/md";
import { FaHome ,FaBook} from "react-icons/fa";
import {FiMenu}  from "react-icons/fi";
import { Divider } from "@chakra-ui/react";
import { MdMiscellaneousServices } from "react-icons/md";
import { IoInformationCircleSharp } from "react-icons/io5";
import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import { BiWorld } from "react-icons/bi";
import { AiFillSchedule ,AiFillLayout,AiFillMail, AiFillHdd} from "react-icons/ai";
import { Box, Flex, Link, Input, IconButton, Badge, Avatar, Text,Heading ,Menu,MenuButton,Icon} from "@chakra-ui/react";
import { MdOutlineNoteAlt } from "react-icons/md";
import { MdFindInPage } from "react-icons/md";
import { BiSolidLogOut } from "react-icons/bi";
import { BiSolidNotepad } from "react-icons/bi";
import { auth, db } from "../../firebase/firebase-config";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
const Sidebar = ({active,setIsAuth,isAuth}) => {
  const [ navSize, changeNavSize]=useState("large")
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();
  
  const [userDocument, setUserDocument] = useState(null); 
  useEffect(() => {
    // Fonction pour récupérer le document de l'utilisateur connecté
    const fetchUserDocument = async (userId) => {
     try {
       const userDoc = await db.collection("user").doc(userId).get();
       if (userDoc.exists) {
         setUserDocument(userDoc.data());
       }
     } catch (error) {
       console.error("Error fetching user document:", error);
     }
   };
     // Obtenir l'ID de l'utilisateur actuel en dehors de useEffect
     const userId = auth.currentUser ? auth.currentUser.uid : null;

     // Vérifier si userId existe avant d'appeler fetchUserDocument
     if (userId) {
       fetchUserDocument(userId);
     } }, []);
     const handleLogout = () => {
       // Sign out the user
       auth.signOut()
         .then(() => {
           // Clear authentication state and navigate to the desired page
           localStorage.removeItem("isAuth");
           setIsAuth(false);
           navigate("/login");
          
         })
        
     };
    return (
     <Flex 
     pos={"sticky"}
    // left={5}
     h={"100vh"}
     //mt="2.5vh"
     boxShadow="0 4px 12px 0 rgba(0,0,0,0.05)"
    
     flexDir={"column"}
     justifyContent={"space-between"}
     w={navSize=="small"?"75px":"200px"}
     >
 <Flex
 p="3%"
 flexDir={"column"}
 alignItems={"flex-start"}
 as={"nav"}
 >
 <IconButton bg={"none"} mt={2} fontSize={"xl"}
 _hover={{bg:'none'}}   p={2}
 icon={<FiMenu/>} color={active? "white":"black"}
 onClick={()=>{
   if(navSize=="small"){
     changeNavSize("large")
   }
   else{ changeNavSize("small")}


 } }
 /> 
      
        
        {/* <Flex spacing={2} align="center" justifyContent={"space-between"}> */}
        <Flex  flexDir={"column"} w={"100%"} alignItems={navSize=="small"?"center":"flex-start"}>
       <Menu>
        <Link bg={active && "gray.100"}
              p={2}
               borderRadius={8}
               _hover={{textDecor:'none', backgroundColor:"gray.100"}}
                w={navSize=="large" && "100%"}  href='/Dashboard'> 
    
         <MenuButton fontSize={"xl"} w={"100%"}>
         <Flex>    <AiFillLayout  color={active? "white":"black"} />
          <Text ml={6} display={navSize=="small"? "none":"flex"}>Dashboard</Text>
          </Flex>    </MenuButton> 
        </Link>
       


        <Link bg={active && "gray.100"}
              p={2}
               borderRadius={8}
               _hover={{textDecor:'none', backgroundColor:"gray.100"}}
                w={navSize=="large" && "100%"}  href='/cour'
  
    > 
  

         <MenuButton fontSize={"xl"}  w={"100%"}>
         <Flex>   <FaBook  color={active? "white":"black"} />
          <Text ml={6} display={navSize=="small"? "none":"flex"}>Cours</Text>
          </Flex>    </MenuButton> 
        </Link>
        <Link bg={active && "gray.100"}
              p={2}
               borderRadius={8}
               _hover={{textDecor:'none', backgroundColor:"gray.100"}}
                w={navSize=="large" && "100%"}  href='/Formation'
  
    > 
  
   
         <MenuButton fontSize={"xl"}  w={"100%"}>
         <Flex>      <IoInformationCircleSharp  color={active? "white":"black"} />
          <Text ml={6}  display={navSize=="small"? "none":"flex"}>Formation</Text>
          </Flex> </MenuButton> 
        </Link>
        <Link bg={active && "gray.100"}
              p={2}
               borderRadius={8}
               _hover={{textDecor:'none', backgroundColor:"gray.100"}}
                w={navSize=="large" && "100%"}  href='/examen'
  
    > 
  
  
         <MenuButton fontSize={"xl"}  w={"100%"}>
     <Flex>    <MdRateReview  color={active? "white":"black"} />
          <Text ml={6} display={navSize=="small"? "none":"flex"}>Examen</Text>
          </Flex>     </MenuButton> 
      </Link>
        <Link bg={active && "gray.100"}
              p={2}
               borderRadius={8}
               _hover={{textDecor:'none', backgroundColor:"gray.100"}}
                w={navSize=="large" && "100%"}  href='/Bourse'
  
    > 
  
   
         <MenuButton fontSize={"xl"}  w={"100%"}>
     <Flex>    <BiWorld  color={active? "white":"black"} />
          <Text ml={6} display={navSize=="small"? "none":"flex"}>Bourse</Text>
          </Flex>      </MenuButton> 
    </Link>
        <Link bg={active && "gray.100"}
              p={2}
               borderRadius={8}
               _hover={{textDecor:'none', backgroundColor:"gray.100"}}
                w={navSize=="large" && "100%"}  href='/Stage'
  
    > 
  
   
         <MenuButton fontSize={"xl"}  w={"100%"}>
     <Flex>    <BsFillFileEarmarkPostFill  color={active? "white":"black"} />
          <Text ml={6} display={navSize=="small"? "none":"flex"}>Stage</Text>
          </Flex>  </MenuButton> 
      </Link>
        <Link bg={active && "gray.100"}
              p={2}
               borderRadius={8}
               _hover={{textDecor:'none', backgroundColor:"gray.100"}}
                w={navSize=="large" && "100%"}  href='/Renseinne'
  
    > 
  
  
         <MenuButton fontSize={"xl"}  w={"100%"}>
       <Flex>  <MdFindInPage  color={active? "white":"black"} />
          <Text ml={6} display={navSize=="small"? "none":"flex"}>Fiche</Text>
          </Flex>    </MenuButton> 
      </Link>
        <Link bg={active && "gray.100"}
              p={2}
               borderRadius={8}
               _hover={{textDecor:'none', backgroundColor:"gray.100"}}
                w={navSize=="large" && "100%"}  href='/Archive'
  
    > 
  
   <Flex >
         <MenuButton fontSize={"xl"}  w={"100%"}>
      <Flex>   <AiFillHdd  color={active? "white":"black"} />
          <Text ml={6} display={navSize=="small"? "none":"flex"}>Archive</Text>
          </Flex>   </MenuButton> 
        </Flex></Link>
        <Link bg={active && "gray.100"}
              p={2}
               borderRadius={8}
               _hover={{textDecor:'none', backgroundColor:"gray.100"}}
                w={navSize=="large" && "100%"}  href='/Note'
  
    > 
  

         <MenuButton fontSize={"xl"}  w={"100%"}>
      <Flex>   <BiSolidNotepad  color={active? "white":"black"} />
          <Text ml={6} display={navSize=="small"? "none":"flex"}>Note</Text>
          </Flex>    </MenuButton> 
      </Link>
        <Link bg={active && "gray.100"}
              p={2}
               borderRadius={8}
               _hover={{textDecor:'none', backgroundColor:"gray.100"}}
                w={navSize=="large" && "100%"}  href='/EmploiDeTemp'
  
    > 
  
  
         <MenuButton fontSize={"xl"}  w={"100%"}>
        <Flex> <AiFillSchedule  color={active? "white":"black"} />
          <Text ml={6} display={navSize=="small"? "none":"flex"}>Emploi</Text>
          </Flex> </MenuButton> 
      </Link>
        <Link bg={active && "gray.100"}
              p={2}
               borderRadius={8}
               _hover={{textDecor:'none', backgroundColor:"gray.100"}}
                w={navSize=="large" && "100%"}  href='/SignupEtudiant'
  
    > 
  
   
         <MenuButton fontSize={"xl"}  w={"100%"}>
        <Flex> <AiFillMail color={active? "white":"black"} />
          <Text ml={6} display={navSize=="small"? "none":"flex"}>Signup Etudiant</Text>
          </Flex> </MenuButton> 
      </Link>
        
        <Link bg={active && "gray.100"}
             p={2}
               borderRadius={8}
               _hover={{textDecor:'none', backgroundColor:"gray.100"}}
                w={navSize=="large" && "100%"}     
                onClick={handleLogout}
    > 
  
  
         <MenuButton fontSize={"xl"}  w={"100%"}>
      <Flex>  <BiSolidLogOut  color={active? "white":"black"} />
          <Text ml={6} display={navSize=="small"? "none":"flex"}>logout</Text>
          </Flex>  </MenuButton> 
        </Link>

          
            </Menu>
        </Flex>
 </Flex>
 <Flex
 p={"3%"}
 flexDir={"column"}
 w={"100%"}
 alignItems={navSize=="small"?"none":"flex"}
 mb={4}



 >
   <Divider display={navSize=="small"?"none":"flex"}/>
 <Flex  align={"center"}   p={2}>
 <Avatar size={"sm"} src={userDocument?.image}/>
 <Flex flexDir={"column"} ml={4} display={navSize=="small"?"none":"flex"}>
   <Heading as="h3" size={"sm"}>{userDocument?.firstName}{userDocument?.lastName}</Heading>
   <Text>{userDocument?.role}</Text>


   </Flex>
 </Flex> 
 </Flex>
     </Flex>

    );
  };
  export default Sidebar;