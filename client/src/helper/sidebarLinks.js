import { AiFillHome } from "react-icons/ai";
import { FaList, FaUserMd, FaUser, FaUsers } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";

export const admin = [
  {
    name: "Home",
    path: "/home",
    icon: <AiFillHome />,
  },
  {
    name: "Notifications",
    path: "/notifications",
    icon: <IoNotifications />,
  },
  {
    name: "Appointments",
    path: "/appointments",
    icon: <FaList />,
  },
  {
    name: "Users",
    path: "/users",
    icon: <FaUsers />,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: <FaUser />,
  },
];

export const doctor = [
  {
    name: "Home",
    path: "/home",
    icon: <AiFillHome />,
  },
  {
    name: "Notifications",
    path: "/notifications",
    icon: <IoNotifications />,
  },
  {
    name: "Appointments",
    path: "/appointments",
    icon: <FaList />,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: <FaUser />,
  },
];

export const user = [
  {
    name: "Home",
    path: "/home",
    icon: <AiFillHome />,
  },
  {
    name: "Notifications",
    path: "/notifications",
    icon: <IoNotifications />,
  },
  {
    name: "Appointments",
    path: "/appointments",
    icon: <FaList />,
  },
  {
    name: "Apply for Doctor",
    path: "/doctorapply",
    icon: <FaUserMd />,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: <FaUser />,
  },
];
