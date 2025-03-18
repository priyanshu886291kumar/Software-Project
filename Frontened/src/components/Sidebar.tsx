


import React from 'react';
import { Home, Grid, Crown, LogOut, Music2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useClerk } from '@clerk/clerk-react';

interface SidebarProps {
  onSubscriptionClick: () => void;
}

const Sidebar = ({ onSubscriptionClick }: SidebarProps) => {
  const { signOut } = useClerk();

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-20 md:w-64 h-screen bg-[#1B1B1B] fixed left-0 top-0 border-r border-white/10"
    >
      <div className="p-4 mb-8">
        <div className="flex items-center space-x-2 px-4">
          <Music2 className="h-8 w-8 text-orange-500" />
          <span className="text-xl font-bold text-white hidden md:block">
            Thrillbit
          </span>
        </div>
      </div>

      <nav className="space-y-2 px-2 flex flex-col h-full">
        <NavItem icon={<Home />} text="Home" isActive />
        <NavItem icon={<Grid />} text="Categories" />
        <NavItem icon={<Crown />} text="Subscription" onClick={onSubscriptionClick} />
        <div className="flex-grow" />
        <NavItem icon={<LogOut />} text="Logout" onClick={signOut} className="mt-auto" />
      </nav>
    </motion.div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

const NavItem = ({
  icon,
  text,
  isActive,
  onClick,
  className = '',
}: NavItemProps) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`w-full flex items-center space-x-4 px-4 py-3 rounded-lg transition-colors duration-300
               ${isActive 
                 ? 'bg-orange-500/10 text-orange-500' 
                 : 'text-gray-400 hover:text-white hover:bg-white/5'} 
               ${className}`}
  >
    <span className="flex-shrink-0">{icon}</span>
    <span className="hidden md:block">{text}</span>
  </motion.button>
);

export default Sidebar;
