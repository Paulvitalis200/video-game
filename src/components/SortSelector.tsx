import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

const SortSelector = () => {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        Order by: Relevance
      </MenuButton>
      <MenuList>
        <MenuItem>Relevance</MenuItem>
        <MenuItem>Date aded</MenuItem>
        <MenuItem>Release Date</MenuItem>
        <MenuItem>Name</MenuItem>
        <MenuItem>Popularity</MenuItem>
        <MenuItem>Avverage Rating</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default SortSelector;
