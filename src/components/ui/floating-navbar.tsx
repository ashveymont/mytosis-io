"use client";
import * as React from "react";
import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

const NavItem = ({ item, onMouseEnter, onMouseLeave, isHovered, isLogin = false }: { 
  item: { name: string; link: string; icon?: React.ReactNode };
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isHovered: boolean;
  isLogin?: boolean;
}) => {
  if (isLogin) {
    return (
      <button 
        className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all ${
          isHovered 
            ? 'bg-gradient-to-br from-white/20 to-white/10 text-white shadow-lg' 
            : 'bg-gradient-to-br from-white/10 to-white/5 text-white/90'
        }`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <span>{item.name}</span>
        <span className={`absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      </button>
    );
  }

  return (
    <div 
      className={`relative px-4 py-2 rounded-full transition-all ${
        isHovered 
          ? 'bg-gradient-to-br from-white/20 to-white/10 shadow-lg' 
          : 'bg-transparent'
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
<Link
        href={item.link}
        className="flex items-center space-x-1 text-sm font-medium text-white transition-all relative"
      >
        <span className="block sm:hidden">{item.icon}</span>
        <span className="hidden sm:block relative">
          {item.name}
          <span className={`absolute inset-x-0 -bottom-2 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
        </span>
      </Link>
    </div>
  );
};

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
}) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const visible = true; // Always show the navbar

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut"
        }}
        className={cn(
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto rounded-full bg-black/80 backdrop-blur-sm shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4",
          className
        )}
      >
        {navItems.map((navItem: any, idx: number) => (
          <NavItem 
            key={`nav-item-${idx}`}
            item={navItem}
            isHovered={hoveredItem === `nav-${idx}`}
            onMouseEnter={() => setHoveredItem(`nav-${idx}`)}
            onMouseLeave={() => setHoveredItem(null)}
          />
        ))}
        <NavItem 
          item={{ name: 'Login', link: '#' }}
          isHovered={hoveredItem === 'login'}
          isLogin
          onMouseEnter={() => setHoveredItem('login')}
          onMouseLeave={() => setHoveredItem(null)}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export function FloatingNavDemo() {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <span className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Solution",
      link: "#solution",
      icon: <span className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
  ];

  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}
