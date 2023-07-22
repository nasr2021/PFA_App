import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  LineChart,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { auth, db } from "../../../firebase/firebase-config";

function ChartWidget({ data }) {
  const [userDocument, setUserDocument] = useState(null);
  useEffect(() => {
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

    const userId = auth.currentUser ? auth.currentUser.uid : null;

    if (userId) {
      fetchUserDocument(userId);
    }
  }, []);

  if (!userDocument) {
    // Render a loading state or alternative content while fetching the user document
    return <div>Loading...</div>;
  }

  //const textColor = useColorModeValue("gray.800", "white");
  const dataa = [
    { name: "Cour", sales: userDocument.coursnbr },
    { name: "Formation", sales: userDocument.nbrFormation },
    { name: "compte", sales: userDocument.nbrCompte },
    { name: "Chiffre d'affaires", sales: userDocument.nbrPt },
    { name: "nombre de point", sales: userDocument.point },
   
  ];
  const datas = [
    { name: "total", value: userDocument.pack },
    { name: "compte utilise", value: userDocument.nbrCompte },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <Flex mx={4}>
      <Box
        bg="white"
        borderRadius="md"
        boxShadow="md"
        mb={5}
        p={4}
        width={400}
        mr={7}
      >
        <Flex align="center" mb={4}>
          <Text fontSize="lg" fontWeight="bold" >
   
          </Text>
        </Flex>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={dataa}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#3182CE"
                strokeWidth={4}
                dot={{ stroke: "#3182CE", fill: "white" }}
                activeDot={{ stroke: "#3182CE", strokeWidth: 2, r: 8 }}
                label={{ fill: "#3182CE", fontSize: 12 }}
                animationBegin={500}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </Box>

      <Box bg="white" borderRadius="md" boxShadow="md" mb={5} p={4}>
        <PieChart width={400} height={300}>
          <Pie
            data={datas}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
          >
            {datas.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend verticalAlign="bottom" height={36} />
          <Tooltip />
        </PieChart>
      </Box>
    </Flex>
  );
}

export default ChartWidget;
