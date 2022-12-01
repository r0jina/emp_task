import {
  CalendarBlank,
  ChartPieSlice,
  ClockCounterClockwise,
  List,
  Note,
  PencilSimpleLine,
  SquaresFour,
  User,
} from "phosphor-react";

export const drawerData = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <SquaresFour size={24} />,
  },
  {
    name: "Userlist",
    path: "/userlist",
    icon: <User size={24} />,
  },

  {
    name: "Reports",
    path: "/reports",
    icon: <ChartPieSlice size={24} />,
  },
  {
    name: "History",
    path: "/history",
    icon: <ClockCounterClockwise size={24} />,
  },
  {
    name: "Rules",
    path: "/rules",
    icon: <Note size={24} />,
  },
  {
    name: "Calendarpage",
    path: "/calendar",
    icon: <CalendarBlank size={24} />,
  },
];
