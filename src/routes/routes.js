import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TableList from "@/pages/TableList.vue";
import Typography from "@/pages/Typography.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Notifications from "@/pages/Notifications.vue";
import UpgradeToPRO from "@/pages/UpgradeToPRO.vue";

import Homepage from "@/pages/Homepage.vue";
import Stadiums from "@/pages/Stadiums.vue";
import Statistics from "@/pages/Statistics.vue";
import Games from "@/pages/Games.vue"; 
import GameAdd from "@/pages/GameAdd.vue"; 
import GameEdit from "@/pages/GameEdit.vue"; 
import Game from "@/pages/Game.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Homepage,
  },
  {
    path:"/stadioane",
    name:"Stadiums",
    component:Stadiums
  },
  {
    path:"/statistici/:type",
    name:"Statistics",
    component:Statistics
  },
  {
    path:"/campionate/:stadium_id?",
    name:"Games",
    component:Games
  },
  {
    path:"/creeaza-campionat",
    name:"GameAdd",
    component:GameAdd
  },
  {
    path:"/editeaza-campionat/:id",
    name:"GameEdit",
    component:GameEdit
  },
  {
    path:"/campionat/:id",
    name:"Game",
    component:Game
  },

  // {
  //   path: "/",
  //   component: DashboardLayout,
  //   redirect: "/dashboard",
  //   children: [
  //     {
  //       path: "dashboard",
  //       name: "Dashboard",
  //       component: Dashboard,
  //     },
  //     {
  //       path: "user",
  //       name: "User Profile",
  //       component: UserProfile,
  //     },
  //     {
  //       path: "table",
  //       name: "Table List",
  //       component: TableList,
  //     },
  //     {
  //       path: "typography",
  //       name: "Typography",
  //       component: Typography,
  //     },
  //     {
  //       path: "icons",
  //       name: "Icons",
  //       component: Icons,
  //     },
  //     {
  //       path: "maps",
  //       name: "Maps",
  //       meta: {
  //         hideFooter: true,
  //       },
  //       component: Maps,
  //     },
  //     {
  //       path: "notifications",
  //       name: "Notifications",
  //       component: Notifications,
  //     },
  //     {
  //       path: "upgrade",
  //       name: "Upgrade to PRO",
  //       component: UpgradeToPRO,
  //     },
  //   ],
  // },
];

export default routes;
