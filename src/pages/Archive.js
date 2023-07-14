import React, { useEffect, useState } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { db } from '../firebase/firebase-config';
import { FiDownload } from 'react-icons/fi';
import { IconButton ,Icon } from '@chakra-ui/react';
export default function ReportTable() {
  const [archive, setArchive] = useState([]);
  const handleOpenPDF = (pdfURL) => {
    window.open(pdfURL, "_blank");
  };
  useEffect(() => {
    const fetchArchive = async () => {
      try {
        const archiveSnapshot = await db.collection('archive').where('type', '!=', null).get();
        const archiveData = archiveSnapshot.docs.map((doc) => doc.data());
        setArchive(archiveData);
      } catch (error) {
        console.error('Error fetching archive:', error);
      }
    };

    fetchArchive();
  }, []);

  const openPDF = (pdfUrl) => {
    window.open(pdfUrl, '_blank');
  };

  const downloadPDF = (pdfUrl) => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = pdfUrl.split('/').pop();
    link.click();
  };

  return (
    <Box p={4} mx={12} bg="white" width={{ base: '100%', md: '175vh' }} mt={6}>
      <Table variant="unstyled" borderWidth="1px" borderColor="gray.200" overflowX={'auto'}>
        <Thead>
          <Tr>
            <Th>Nom de stager</Th>
            <Th>Date</Th>
            <Th>Rapporteur</Th>
            <Th>Download</Th>
          </Tr>
        </Thead>
        <Tbody>
          {archive.map((item, index) => (
            <Tr key={index}>
              <Td>{item.stagername}</Td>
              <Td>{item.date }</Td>
              <Td>{item.president}</Td>
              <Td>
                <IconButton
                  aria-label="Télécharger"
                  icon={<Icon as={FiDownload} />}
                  size="sm"
                  variant="ghost"
                  onClick={() => handleOpenPDF(item.pdf)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}







