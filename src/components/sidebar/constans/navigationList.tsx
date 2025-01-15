import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";

import { INavigationList } from "../Sidebar";

export const navigationList: INavigationList[] = [
  {
    name: "dashboard",
    path: "/",
    icon: <DashboardIcon />,
    childrens: [],
  },
  {
    name: "Create post",
    path: "create-post",
    icon: <PeopleIcon fontSize="medium" />,
    childrens: [],
  },
];
