// import { Flex } from "@chakra-ui/react";
// import React, { useState }  from "react";
// import { useNavigate } from "react-router-dom";
// import { FormControl,FormLabel, Container,Input, Button} from '@chakra-ui/react';
// import { auth, provider } from "../firebase/firebase-config";
// import { signInWithPopup } from "firebase/auth";
// //import firebase from 'firebase/app';

// import { createUserWithEmailAndPassword , signInWithEmailAndPassword} from 'firebase/auth';
// function Login({setIsAuth }){
   
//         const [email, setEmail] = useState('');
//         const [password, setPassword] = useState('');
      
//         const handleInputChange = (e) => {
//           if (e.target.name === 'email') {
//             setEmail(e.target.value);
//           } else if (e.target.name === 'password') {
//             setPassword(e.target.value);
//           }
//         };
      
//         const handleCreateUser = (e) => {
//           e.preventDefault();
      
//           createUserWithEmailAndPassword(auth, email, password)
//             .then((userCredential) => {
//               // User creation successful
//               const user = userCredential.user;
//               console.log('User created:', user);
//             })
//             .catch((error) => {
//               // Handle any errors that occurred during user creation
//               console.error('Error creating user:', error);
//             });
//         };

    


//     let navigate=useNavigate();
//      const signInWithGoogle = () => {
//          signInWithPopup(auth, provider).then((result) => {
//            localStorage.setItem("isAuth", true);
//            setIsAuth(true);
//            navigate("/");
//          });
//        };
    
//     return (<Container><Flex>Login</Flex>
    
//     <form onSubmit={handleCreateUser}>
//   <FormControl isRequired>
//   <FormLabel>mail</FormLabel>
//   <Input placeholder='mail'  type="email"    name="email"
//           value={email}
//           onChange={handleInputChange}/>
// </FormControl>
// <FormControl isRequired>
//   <FormLabel>password</FormLabel>
//   <Input   type="password"  placeholder=' password'   name="password"
//         value={password}
//         onChange={handleInputChange} />
// </FormControl>

//     <Button colorScheme='blue' type="submit" >signIn</Button>
//     </form>


//     <Button colorScheme='blue' onClick={signInWithGoogle}>signInWithGoogle</Button>
//      </Container>);
// }
// export default Login;