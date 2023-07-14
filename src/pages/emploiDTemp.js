import React, { useState, useEffect } from 'react';
import { Box, Flex,Text, Select, Image } from '@chakra-ui/react';
import { db } from '../firebase/firebase-config';
import { IconButton } from '@chakra-ui/react';
import { FiDownload } from 'react-icons/fi';

export default function PDFViewer() {
  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [titles, setTitles] = useState([]);
  const [showDownloadMessage, setShowDownloadMessage] = useState(false);

  useEffect(() => {
    const fetchImageURL = async () => {
      try {
        const archiveSnapshot = await db.collection('timetable').get();
        const archiveData = archiveSnapshot.docs.map((doc) => doc.data());

        setTitles(archiveData.map((doc) => doc.title));
      } catch (error) {
        console.error('Error fetching titles:', error);
      }
    };

    fetchImageURL();
  }, []);

  useEffect(() => {
    const fetchImageURL = async () => {
      try {
        const archiveSnapshot = await db
          .collection('timetable')
          .where('title', '==', selectedTitle)
          .get();
        const archiveData = archiveSnapshot.docs.map((doc) => doc.data());

        if (archiveData.length > 0) {
          const { imageURL } = archiveData[0];
          setImageURL(imageURL);
        }
      } catch (error) {
        console.error('Error fetching image URL:', error);
      }
    };

    fetchImageURL();
  }, [selectedTitle]);

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
    setSelectedTitle(e.target.options[e.target.selectedIndex].text);
  };

  const handleDownload = () => {
    if (imageURL) {
      const link = document.createElement('a');
      link.href = imageURL;
      link.download = {imageURL}; // Nom du fichier de téléchargement
      link.click();
      setShowDownloadMessage(true);
      
    }
  };
  

  return (
    <Box p={4} mx={12}>
      <Flex direction={{ base: 'row', md: 'row' }} align="center" mb={4} justifyContent="space-between">
        <Select
          placeholder="Sélectionner un filtre"
          value={selectedFilter}
          onChange={handleFilterChange}
          width={{ base: '100%', md: '200px' }}
          mb={{ base: 2, md: 0 }}
        >
          {titles.map((title) => (
            <option key={title} value={title}>
              {title}
            </option>
          ))}
        </Select>
        <IconButton
          aria-label="Télécharger"
          icon={<FiDownload />}
          size="lg"
          variant="ghost"
          onClick={handleDownload}
        />
      </Flex>

      <Flex justify="center">
        {imageURL && (
          <Box width="100%">
            <Image src={imageURL} alt="Emploi du temps" width="100%" />
            {showDownloadMessage}
          </Box>
        )}
      </Flex>
    </Box>
  );};
