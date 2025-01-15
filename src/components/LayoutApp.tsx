import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "./sidebar/Sidebar";
import { navigationList } from "./sidebar/constans/navigationList";
import { Drawer } from "antd";
import { Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/logo.jpeg";
const LayoutApp = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <div className="min-h-screen lg:min-w-[1355px] w-full flex">
      <div className="h-16 bg-white">
        <Box
          component="section"
          sx={{ p: 2, borderBottom: "1px solid #e1e1e1" }}
          className="w-full flex justify-between fixed bg-white z-[1000]"
        >
          <div
            className="cursor-pointer block lg:hidden"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </div>
          <div className="p-0 rounded-md flex items-center gap-2">
            <img src={logo} width="40px" className="rounded-md" alt="logo" />
            <span className="text-xl font-bold text-[#000000]">
              Prueba Tecnica Experis
            </span>
          </div>
        </Box>
      </div>
      <div className="hidden lg:block mt-16">
        <Sidebar navigationList={navigationList} />
      </div>
      <Drawer
        open={open}
        className="block lg:hidden bg-[#FCFCFE]"
        onClose={toggleDrawer(false)}
        placement={"left"}
      >
        <Sidebar navigationList={navigationList} />
      </Drawer>

      <div className="w-full flex-1 p-4 overflow-y-auto bg-white lg:ml-[208px] mt-16">
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutApp;
