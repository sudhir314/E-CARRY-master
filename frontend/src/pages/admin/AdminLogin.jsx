import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); 
  const [isRegistering, setIsRegistering] = useState(false); 
  let navigate = useNavigate();
  const toast = useToast();

  // UPDATED: Live Backend URL
  const BASE_URL = "https://shopease-backend-8m20.onrender.com";

  const handleSubmit = () => {
    const endpoint = isRegistering ? "register" : "login";
    
    const payload = isRegistering 
      ? { name, email, password } 
      : { email, password };

    // UPDATED: Using Render URL
    axios
      .post(`${BASE_URL}/admin/${endpoint}`, payload)
      .then((res) => {
        console.log(res.data);
        
        if (res.data.token) {
          toast({
            title: "Logged in Successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          // Store admin token if needed, or just navigate
          localStorage.setItem("adminToken", res.data.token); 
          navigate(`/admin`);
        } 
        else if (res.data.msg && (res.data.msg.includes("registered") || res.data.msg.includes("success"))) {
           toast({
            title: "Admin Registered!",
            description: "Please login now.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setIsRegistering(false); 
        } 
        else {
          toast({
            title: res.data.msg || "Error",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Connection Failed",
          description: "Ensure the Backend Server is running.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>
            {isRegistering ? "Register Admin" : "Sign in Admin"}
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            To access Admin Dashboard 👨‍💻
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            {isRegistering && (
                <FormControl id="name">
                <FormLabel>Name</FormLabel>
                <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                </FormControl>
            )}
            
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                {!isRegistering && <Checkbox>Remember me</Checkbox>}
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "black",
                }}
                onClick={handleSubmit}
              >
                {isRegistering ? "Register" : "Login"}
              </Button>
              
              <Text align="center" fontSize="sm">
                  {isRegistering ? "Already have an account?" : "Need an Admin account?"}{" "}
                  <Button variant="link" color="blue.400" onClick={() => setIsRegistering(!isRegistering)}>
                      {isRegistering ? "Login" : "Register Here"}
                  </Button>
              </Text>

            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}