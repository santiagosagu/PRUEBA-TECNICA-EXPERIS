/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { Link } from "react-router";
import { Key, memo } from "react";

interface IChildrens {
  name: string;
  path: string;
  icon: any;
}

export interface INavigationList {
  name: string;
  path: string;
  icon: any;
  childrens: IChildrens[];
}
interface Iprops {
  navigationList: INavigationList[];
}

const Sidebar = memo(({ navigationList }: Iprops) => {
  return (
    <Box
      sx={{ width: 208, paddingBottom: 5 }}
      role="presentation"
      className=" md:fixed bg-[#FCFCFE] h-full z-[2000] mt-4 overflow-y-auto custom-scrollbar"
    >
      <List>
        {navigationList.map((item: INavigationList, index: Key) => {
          return (
            <Link to={item.path} key={index}>
              <ListItem key={index} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} className="capitalize" />
                </ListItemButton>
              </ListItem>
            </Link>
          );
        })}
      </List>
    </Box>
  );
});

export default Sidebar;
