import { useState } from "react";
import { NavItem } from "./nav-item";

const { Inbox, ExpandLess, ExpandMore } = require("@mui/icons-material");
const { Collapse, List } = require("@mui/material");

const CollapseItem = ({ title, icon, items }) => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <NavItem
        title={title}
        icon={icon}
        onClick={handleClick}
        endIcon={open ? <ExpandLess /> : <ExpandMore />}
      />

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {items.map((item) => (
            <NavItem
              icon={item.icon}
              href={item.href}
              title={item.title}
              key={item.title}
              sx={{ marginLeft: 5 }}
            />
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default CollapseItem;
