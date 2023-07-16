import { Box,Checkbox, Table, Thead, Tbody, Tr, Th, Td, IconButton, Icon, Flex } from '@chakra-ui/react';
import { FiDownload,FiTrash } from 'react-icons/fi';
import React, {useState, useEffect } from 'react';
import { db } from '../firebase/firebase-config';
import ButtonWidget from '../components/Shared/Widgets/Button';
const ExamTable = ({ exams }) => {
  const [selectedPDF, setSelectedPDF] = useState("");
  const handleOpenPDF = (pdfURL) => {
    window.open(pdfURL, "_blank");
  };
  const handleDeleteExam = (examenId) => {
    // Delete the exam with the provided ID
    db.collection("examen").doc(examenId).delete()
      .then(() => {
        // Exam successfully deleted, perform any necessary actions
        console.log("Exam deleted:", examenId);
      })
      .catch((error) => {
        // An error occurred while deleting the exam
        console.error("Error deleting exam:", examenId, error);
      });
  };
  return (
    <Box borderWidth="1px" borderRadius="md" p={3} bg="white" overflowX="auto">
      <Table variant="simple" overflowX={'auto'}>
        <Thead>
          <Tr>
            <Th>
              <Checkbox />
            </Th>
            <Th>Nom de l'examen</Th>
            <Th>Date de téléchargement</Th>
            <Th>Personne qui a téléchargé</Th>
            <Th>Télécharger</Th>
          </Tr>
        </Thead>
        <Tbody>
          {exams.map((exam, index) => (
            <Tr key={index}>
              <Td>
                <Checkbox />
              </Td>
              <Td>{exam.examenname}</Td>
              <Td>{exam.date}</Td>
              <Td>{exam.profname}</Td>
              <Td><Flex>
                <IconButton
                  aria-label="Télécharger"
                  icon={<Icon as={FiDownload} />}
                  size="sm"
                  variant="ghost"
                  onClick={() => handleOpenPDF(exam.pdf)}
                />  <IconButton
                aria-label="Supprimer"
                icon={<Icon as={FiTrash} />}
                size="sm"
                variant="ghost"
                onClick={() => handleDeleteExam(exam.examenId)}
              />
            </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default function Examen() {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const examsSnapshot = await db.collection('examen').get();
        const examsData = examsSnapshot.docs.map((doc) => doc.data());
        setExams(examsData);
      } catch (error) {
        console.error('Error fetching exams:', error);
      }
    };

    fetchExams();
  }, []);

  return (
    <Box p={4}>
      {/* Render your content */}
      {/* ... */}
     
      <ExamTable exams={exams} />
    </Box>
  );
}

