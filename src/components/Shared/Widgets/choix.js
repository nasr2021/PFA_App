import React from 'react';
import {Box, Checkbox, Stack,useBreakpointValue } from '@chakra-ui/react';
import CardCour from './Formation';

 function FilterCard({ filters, selectedFilters, onFilterChange }) {
  const handleFilterChange = (filter) => {
    const updatedFilters = selectedFilters.includes(filter)
      ? selectedFilters.filter((selectedFilter) => selectedFilter !== filter)
      : [...selectedFilters, filter];
    onFilterChange(updatedFilters);
  };

  const isIndeterminate = selectedFilters.length > 0 && selectedFilters.length < filters.length;

  const handleSelectAll = () => {
    if (selectedFilters.length === filters.length) {
      onFilterChange([]);
    } else {
      onFilterChange([...filters]);
    }
  };

  const cardWidth = useBreakpointValue({ base: "calc(60% - 30px)", sm: "calc(25% - 25px)", md: "calc(30% - 15px)", lg: "calc(50% - 30px)" });

  return (
    <Box   p={4}  height="100%" width={cardWidth} >
      <Checkbox
        isChecked={selectedFilters.length === filters.length}
        isIndeterminate={isIndeterminate}
        onChange={handleSelectAll} 
      >
        Select All
      </Checkbox>
      <Stack spacing={3}   >
        {filters.map((filter) => (
          <Checkbox
            key={filter}
            isChecked={selectedFilters.includes(filter)}
            onChange={() => handleFilterChange(filter)}
          >
            {filter}
          </Checkbox>
        ))}
      </Stack>
   
    </Box>
  );
}

export default function FilterPage({ initialFilters, sselectedFilters, onFilterChange }) {
  const [selectedFilters, setSelectedFilters] = React.useState([]);
  const filters = ['css', ' Droit', 'Finance', 'comptabilité'];

  const handleFilterChange = (updatedFilters) => {
    setSelectedFilters(updatedFilters);
    // Perform any filtering or updating based on the selected filters
  };

  return (
    <Box  borderRight={"4px"} borderRightColor={"white"}  >
     

      <FilterCard
        filters={filters}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
      />
    </Box>
  );
}
