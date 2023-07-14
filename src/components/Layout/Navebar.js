import { Box,Text, Flex,MenuItem, MenuList, Input, IconButton, Badge, MenuButton, Menu } from "@chakra-ui/react";
import { BellIcon,ChevronDownIcon } from "@chakra-ui/icons";
import { db } from "../../firebase/firebase-config";
import { useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
// Component for the primary navbar
const PrimaryNavbar = () => {
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const snapshot = await db.collection('notifications').get();
        const notificationsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotifications(notificationsData);
        
        // Count the number of unread notifications
        const unreadNotificationsCount = notificationsData.reduce(
          (count, notification) => count + (notification.read ? 0 : 1),
          0
        );
        setUnreadCount(unreadNotificationsCount);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
  
    fetchNotifications();
  }, []);
  
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false); // State to track if the notifications list is open

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const snapshot = await db.collection('notifications').get();
        const notificationsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotifications(notificationsData);
        setUnreadCount(notificationsData.filter((notification) => !notification.read).length);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleNotificationClick = () => {
    setIsNotificationOpen(!isNotificationOpen); // Toggle the state to open or close the notifications list
  };

  const handleNotificationItemClick = (notificationId) => {
    // Update the notification as read in the database
    db.collection('notifications')
      .doc(notificationId)
      .update({ read: true })
      .then(() => {
        // Update the notifications state and unread count
        setNotifications((prevNotifications) =>
          prevNotifications.map((notification) =>
            notification.id === notificationId ? { ...notification, read: true } : notification
          )
        );
        setUnreadCount((prevUnreadCount) => prevUnreadCount - 1);
      })
      .catch((error) => {
        console.error('Error marking notification as read:', error);
      });
  };

  const inputWidth = useBreakpointValue({ base: '300px', sm: '200px', md: '75%', lg: '100%' });

  const MAX_NOTIFICATIONS_DISPLAYED = 5;
  return (
    <Box width={inputWidth} borderLeft={'2px'} mx={0} borderLeftColor={'gray.200'}>
      <Flex bg="white" color="black" p={4} justifyContent={'space-between'}>
        {/* Logo */}

        {/* Search input */}
        <Input
          width={inputWidth}
          type="text"
          placeholder="Search"
          mx={12}
          bg="white"
          color="black"
          _placeholder={{ color: 'gray.400' }}
        />

        {/* Notifications */}
        <Menu>
        <MenuButton
  as={IconButton}
  icon={<BellIcon />}
  variant="ghost"
  color="black"
  aria-label="Notifications"
  mr={4}
  _hover={{ background: 'none' }}
>
  <Badge colorScheme="red" borderRadius="full">
    {unreadCount}
  </Badge>
  <ChevronDownIcon ml={2} />
</MenuButton>

          <MenuList maxHeight={MAX_NOTIFICATIONS_DISPLAYED * 55} overflowY="auto">
            {notifications.map((notification) => (
              <MenuItem p={7}
                key={notification.id} 
                
                onClick={() => handleNotificationItemClick(notification.id)}
                fontWeight={notification.read ? 'normal' : 'bold'} bg={notification.read ? 'gray.100' : ' white'}
              >
                {/* Render your notification item component here */}
                {/* Example: <NotificationItem notification={notification} /> */}
                {notification.text} - {notification.courseName}
              </MenuItem>
            ))}
            {notifications.length === 0 && <MenuItem>No notifications</MenuItem>}
          </MenuList>
        </Menu>
        
        <Badge colorScheme="red" borderRadius="100% " color={"white"}  px={2} h={"25px"} visibility={unreadCount === 0 ? "hidden" : "visible"}>
              {unreadCount}
            </Badge>
        {/* Avatar and Sign In */}
      </Flex>
    </Box>
  );
};



// Component that renders both navbars
const DoubleNavbar = () => {
  return ( 
     <PrimaryNavbar  />
  );
};

export default DoubleNavbar;

