import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from "../../../firebase/firebase-config"; // Importez l'instance de la base de données Firebase

const ComplaintInfoCard = ({ title, description, date, status }) => {
  return (
    <Box borderBottom={"2px"} borderBottomColor={"gray.500"}>
      <Text fontSize="lg" fontWeight="bold" mb={2}>
        {title}
      </Text>
      <Text fontSize="sm" color="gray.500" mb={2}>
        {description}
      </Text>
      <Flex justify="space-between" align="center">
        <Text fontSize="sm" color="gray.500">
          Date: {date}
        </Text>
        <Text fontSize="sm" fontWeight="bold" color={status === "resolved" ? "green.500" : "red.500"}>
          {status === "resolved" ? "Resolved" : "Pending"}
        </Text>
      </Flex>
    </Box>
  );
};

const ComplaintsList = () => {
  const [complaints, loading, error] = useCollectionData(db.collection("reclamation"), { idField: 'id' });

  if (loading) {
    return <CircularProgress color="purple" isIndeterminate />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      {complaints.map((complaint) => (
        <ComplaintInfoCard
          key={complaint.id}
          title={complaint.name}
          description={complaint.message}
          date={complaint.date}
          status={complaint.status}
        />
      ))}
    </div>
  );
};

export default ComplaintsList;

