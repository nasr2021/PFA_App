import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebase-config';
import { Flex } from '@chakra-ui/react';
import Card from '../Shared/Widgets/Card';

function CardList() {
  const [formations, setFormation] = useState([]);
  const gridTemplateColumns = {
    base: "1fr", // 1 carte par ligne sur les écrans sm
    md: "repeat(2, 1fr)", // 2 cartes par ligne sur les écrans md
    lg: "repeat(4, 1fr)", // 3 cartes par ligne sur les écrans plus larges
  };
  useEffect(() => {
    const fetchFormation = async () => {
      try {
        const formationSnapshot = await db.collection('formation').get();
        const formationData = formationSnapshot.docs.map((doc) =>doc.data());
        console.log(formationSnapshot.docs)
        setFormation(formationData);
      } catch (error) {
        console.error('Error fetching formations:', error);
      }
    };

    fetchFormation();
  }, []);

  return (
    <Flex mx={2} flexWrap="wrap">
      {formations.map((formation) => (
        <Card
          key={formation.id}
          formation={formation}

        />
      ))}
    </Flex>
  );
}

export default CardList;
