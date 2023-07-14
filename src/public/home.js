// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Container, Flex, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
// import { auth, provider } from "../firebase/firebase-config";
// import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

// function Home({ setIsAuth }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     if (e.target.name === "email") {
//       setEmail(e.target.value);
//     } else if (e.target.name === "password") {
//       setPassword(e.target.value);
//     }
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();

//     signInWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         // Login successful
//         const user = userCredential.user;
//         console.log("User logged in:", user);

//         // Set authentication state and navigate to the desired page
//         localStorage.setItem("isAuth", true);
//         setIsAuth(true);
//         navigate("/profile");
//       })
//       .catch((error) => {
//         // Handle any errors that occurred during login
//         console.error("Error logging in:", error);
//       });
//   };

//   const signInWithGoogle = () => {
//     signInWithPopup(auth, provider)
//       .then((result) => {
//         // Google sign-in successful
//         localStorage.setItem("isAuth", true);
//         setIsAuth(true);
//         navigate("/profile");
//       })
//       .catch((error) => {
//         // Handle any errors that occurred during Google sign-in
//         console.error("Error signing in with Google:", error);
//       });
//   };

//   return (
//     <Container>
//       <Flex>Login</Flex>
//       <form onSubmit={handleLogin}>
//         <FormControl isRequired>
//           <FormLabel>Email</FormLabel>
//           <Input
//             type="email"
//             name="email"
//             value={email}
//             onChange={handleInputChange}
//           />
//         </FormControl>
//         <FormControl isRequired>
//           <FormLabel>Password</FormLabel>
//           <Input
//             type="password"
//             name="password"
//             value={password}
//             onChange={handleInputChange}
//           />
//         </FormControl>
//         <Button colorScheme="blue" type="submit">
//           Sign In
//         </Button>
//       </form>
//       {/* <Button colorScheme="blue" onClick={signInWithGoogle}>
//         Sign In with Google
//       </Button> */}
//     </Container>
//   );
// }

// export default Home;
