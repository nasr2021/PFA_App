import React from 'react';
import { Box, Button, ButtonGroup, Text } from '@chakra-ui/react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePrevPage = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
      <ButtonGroup isAttached variant="outline">
        <Button
          isDisabled={isFirstPage}
          onClick={handlePrevPage}
          leftIcon={<Text fontSize="xl">←</Text>}
        >
          Previous
        </Button>
        <Button
          isDisabled={isLastPage}
          onClick={handleNextPage}
          rightIcon={<Text fontSize="xl">→</Text>}
        >
          Next
        </Button>
      </ButtonGroup>
    </Box>
  );
}

export default function BlogPage() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = 10; // Total number of pages

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Perform any data fetching or updating based on the new page
  };

  return (
    <Box p={4}>
      {/* Render your blog posts */}
      {/* ... */}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Box>
  );
}
