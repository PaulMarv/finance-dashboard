import { ArrowLeftRight, HandCoins, LayoutDashboard } from "lucide-react";

export const sideNav = [
    {
        text: 'Overview',
        path: '/overview',
        icon:  <LayoutDashboard size={20}/>,
    },
    {
        text: 'Loans',
        path: '/loans',
        icon:  <HandCoins size={20}/>,
    },
    {
        text: 'Transactions',
        path: '/transactions',
        icon:  <ArrowLeftRight size={20}/>,
    },
];