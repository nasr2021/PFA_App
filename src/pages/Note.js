import React, { useEffect, useState } from 'react';
import { Box, Text, Flex, Table, Thead, Tr, Td ,Tbody} from '@chakra-ui/react';
import { db,auth } from '../firebase/firebase-config';
import ButtonWidget from '../components/Shared/Widgets/Button';
export default function GradeTable() {
  const [subjectsS1, setSubjectsS1] = useState([]);
  const [subjectsS2, setSubjectsS2] = useState([]);
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const userId = auth.currentUser ? auth.currentUser.uid : null;

        const notesSnapshotS1 = await db
          .collection('note')
          .where('userId', '==', userId)
          .where('semestre', '==', 's1')
          .get();

        const notesDataS1 = notesSnapshotS1.docs.map((doc) => doc.data());

        const subjectsDataS1 = notesDataS1.map((note) => ({
          name: note.matiere,
          oral: note.noteOral,
          exam: note.noteExamen,
          homework: note.noteDevoirSurveille,
        }));

        setSubjectsS1(subjectsDataS1);

        const notesSnapshotS2 = await db
          .collection('note')
          .where('userId', '==', userId)
          .where('semestre', '==', 's2')
          .get();

        const notesDataS2 = notesSnapshotS2.docs.map((doc) => doc.data());

        const subjectsDataS2 = notesDataS2.map((note) => ({
          name: note.matiere,
          oral: note.noteOral,
          exam: note.noteExamen,
          homework: note.noteDevoirSurveille,
        }));

        setSubjectsS2(subjectsDataS2);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);
  
 
  return (
    <><Flex> <ButtonWidget label="note" type="modal15" /></Flex>
      <Box p={4} mx={12} width={'175vh'}>
        <Table border={'8px'} borderColor={'white'}>
          <Thead justifyContent="space-between">
            <Tr> <Td>Matière</Td>
              <Td>Note Orale</Td>
              <Td>Note de Devoir Surveillé</Td>
              <Td>Note de l'Examen</Td></Tr>
             
  
          </Thead>
          <Tbody bg={'white'}>
          {subjectsS1.map((subject, index) => (
              <Tr key={index} justifyContent="space-between">
                <Td>{subject.name}</Td>
                <Td>{subject.oral}</Td>
                <Td>{subject.homework}</Td>
                <Td>{subject.exam}</Td>
              </Tr>
             ))}
          </Tbody>
        </Table>
        <Text borderBottom={'1px'} borderBottomColor={'black'} mt={12}></Text>
      </Box>

      <Box p={4} mx={12} width={'175vh'}>
        <Table border={'8px'} borderColor={'white'}>
          <Thead justifyContent="space-between">
            <Tr> <Td>Matière</Td>
              <Td>Note Orale</Td>
              <Td>Note de Devoir Surveillé</Td>
              <Td>Note de l'Examen</Td></Tr>
             
  
          </Thead>
          <Tbody bg={'white'}>
          {subjectsS2.map((subject, index) => (
              <Tr key={index} justifyContent="space-between">
                <Td>{subject.name}</Td>
                <Td>{subject.oral}</Td>
                <Td>{subject.homework}</Td>
                <Td>{subject.exam}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Text borderBottom={'1px'} borderBottomColor={'black'} mt={12}></Text>
      </Box>

       
{/* <Box p={4} mx={12} width={'175vh'}>
        <Table mt={4} border={'8px'} borderColor={'white'} >
          <Thead>
            <Tr >
              <Td>Semestre</Td>
              <Td>Note</Td>
            </Tr>
          </Thead>
          <Tbody bg={'white'}>
            {subjectsS2.length > 0 && (
              <Tr>
    
                  <Td>s2</Td>
                  <Td>12</Td>
             
              </Tr>
            )}
          
          </Tbody>
          <Tbody bg={'white'}>
            {subjectsS1.length > 0 && (
              <Tr>
              
                  <Td>s1</Td>
                  <Td>4</Td>
               
              </Tr>
            )}
           
              <Tr colSpan={2} textAlign="right" bg={'gray.100'}>
                Note Générale de l'Année : 12
              </Tr>
            </Tbody>
          </Table>
       </Box> */}
    </>
  );
}
