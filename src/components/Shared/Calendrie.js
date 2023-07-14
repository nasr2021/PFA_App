import { Box, Button, Center, Grid, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, FormControl, FormLabel, Input, Stack, Select } from '@chakra-ui/react';
import { useState } from 'react';
import { format, parseISO } from 'date-fns';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('');

  const handleDateClick = (date) => {
    setSelectedDate(date);
    onOpen();
  };

  const handleEventSubmit = () => {
    const newEvent = {
      title,
      date: format(parseISO(date), 'dd/MM/yyyy'),
      type,
    };
    setEvents([...events, newEvent]);
    onClose();
  };

  return (
    <Box p={4} mr={4} bg={"white"} borderRadius={"lg"} mb={5}>
      <Center mb={4}>
        <Text fontSize="2xl" fontWeight="bold">Calendrier</Text>
      </Center>
      <Grid templateColumns="repeat(7, 1fr)" gap={2}>
        {Array.from({ length: 31 }).map((_, index) => {
          const day = index + 1;
          const date = new Date();
          date.setDate(day);

          return (
            <Box
              key={day}
              p={2}
              bg="gray.100"
              borderRadius="md"
              cursor="pointer"
              onClick={() => handleDateClick(date)}
            >
              <Text fontWeight="bold">{day}</Text>
              {events.map((event, index) => {
                if (event.date === format(date, 'dd/MM/yyyy')) {
                  return (
                    <Box key={index} mt={2}>
                      <Text fontSize="sm" color="blue.500">{event.title}</Text>
                    </Box>
                  );
                }
                return null;
              })}
            </Box>
          );
        })}
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ajouter un événement</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Titre</FormLabel>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Date</FormLabel>
                <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Type</FormLabel>
                <Select value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="meeting">Réunion</option>
                  <option value="reminder">Rappel</option>
                  <option value="event">Événement</option>
                </Select>
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleEventSubmit}>Ajouter</Button>
            <Button onClick={onClose}>Annuler</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Calendar;

