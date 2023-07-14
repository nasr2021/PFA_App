import React from 'react';
import {
  Box,
  Flex,Image,Center,
  Avatar,
  Text,
  Heading,
  Stack,
  Divider,
  Badge,
} from '@chakra-ui/react';


export default function BlogPost() {


  return (<>
  
<Center mx={12} mt={12} mb={12}>
    <Flex mx={4} >
    <Image mx={6}
            src={
              'https://tse2.mm.bing.net/th?id=OIP.xOncFp4SzGejuQ5lQ_5hRgHaEK&pid=Api&P=0&h=180'
            }
            width={"30%"} height={"60vh"}
          />
          <Text mx={12}>  Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor</Text>
    </Flex>
</Center>
<Center mt={12} mb={12}>
    <Flex mx={4} >
    
          <Text mx={12}>  Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor</Text>
          <Image mx={6}
            src={
              'https://tse1.mm.bing.net/th?id=OIP.NCS9ZkG5FNifdiuHb-gJGQHaEE&pid=Api&P=0&h=180'
            }
            width={"30%"} height={"60vh"}
          />
    </Flex>
</Center>

</>
  );
}
