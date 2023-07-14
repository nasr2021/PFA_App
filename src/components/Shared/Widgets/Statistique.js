import React from "react";
import {
  Box,Avatar,
  Flex,
  Text,Input,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  LineChart,PieChart, Pie, Cell, Legend, Tooltip, 
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart, Bar ,
  ResponsiveContainer,
} from "recharts";



function ChartWidget  ({ data }) {
    const textColor = useColorModeValue("gray.800", "white");
    const dataa = [
      { name: "Janvier", sales: 1200 },
      { name: "Février", sales: 2000 },
      { name: "Mars", sales: 1500 },
      { name: "Avril", sales: 300 },
      { name: "Mai", sales: 1800 },
      { name: "Juin", sales: 2200 },
    ];
    const datas = [
        { name: "EPI", value: 400 },
        { name: "ESPTIT", value: 300 },
        { name: "ISIMM", value: 300 },
        { name: "ENSI", value: 200 },
      ];
      
      const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
      
    return (< Flex mx={4} >
        <Box bg="white" borderRadius="md" boxShadow="md" mb={5} p={4} width={400} mr={7}>
        <Flex align="center" mb={4}>
          <Text fontSize="lg" fontWeight="bold" color={textColor}>
            Chiffre d'affaires
          </Text>
        </Flex>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#3182CE" // Définir la couleur de la ligne
                strokeWidth={4}
                dot={{ stroke: "#3182CE", fill: "white" }} // Définir la couleur des points de données
                activeDot={{ stroke: "#3182CE", strokeWidth: 2, r: 8 }} // Définir la couleur du point actif
                label={{ fill: "#3182CE", fontSize: 12 }} // Définir la couleur et la taille des valeurs
                animationBegin={500}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </Box>

      <Box bg="white" borderRadius="md" boxShadow="md" mb={5} p={4} >
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
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend verticalAlign="bottom" height={36} />
        <Tooltip />
      </PieChart>
    </Box>
  

      
      </Flex>
    );
  };
  export default ChartWidget;