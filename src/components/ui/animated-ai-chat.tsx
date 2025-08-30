"use client";

import { useEffect, useRef, useCallback, useTransition } from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
    ImageIcon,
    FileUp,
    Figma,
    MonitorIcon,
    CircleUserRound,
    ArrowUpIcon,
    Paperclip,
    PlusIcon,
    SendIcon,
    XIcon,
    LoaderIcon,
    Sparkles,
    Command,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import * as React from "react"

interface UseAutoResizeTextareaProps {
    minHeight: number;
    maxHeight?: number;
}

function useAutoResizeTextarea({
    minHeight,
    maxHeight,
}: UseAutoResizeTextareaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustHeight = useCallback(
        (reset?: boolean) => {
            const textarea = textareaRef.current;
            if (!textarea) return;

            if (reset) {
                textarea.style.height = `${minHeight}px`;
                return;
            }

            textarea.style.height = `${minHeight}px`;
            const newHeight = Math.max(
                minHeight,
                Math.min(
                    textarea.scrollHeight,
                    maxHeight ?? Number.POSITIVE_INFINITY
                )
            );

            textarea.style.height = `${newHeight}px`;
        },
        [minHeight, maxHeight]
    );

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = `${minHeight}px`;
        }
    }, [minHeight]);

    useEffect(() => {
        const handleResize = () => adjustHeight();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [adjustHeight]);

    return { textareaRef, adjustHeight };
}

interface CommandSuggestion {
    icon: React.ReactNode;
    label: string;
    description: string;
    prefix: string;
}

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  containerClassName?: string;
  showRing?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, containerClassName, showRing = true, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    
    return (
      <div className={cn(
        "relative",
        containerClassName
      )}>
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
            "transition-all duration-200 ease-in-out",
            "placeholder:text-muted-foreground",
            "disabled:cursor-not-allowed disabled:opacity-50",
            showRing ? "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0" : "",
            className
          )}
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        
        {showRing && isFocused && (
          <motion.span 
            className="absolute inset-0 rounded-md pointer-events-none ring-2 ring-offset-0 ring-violet-500/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}

        {props.onChange && (
          <div 
            className="absolute bottom-2 right-2 opacity-0 w-2 h-2 bg-violet-500 rounded-full"
            style={{
              animation: 'none',
            }}
            id="textarea-ripple"
          />
        )}
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export function AnimatedAIChat() {
    const [value, setValue] = useState("");
    const [attachments, setAttachments] = useState<string[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [activeSuggestion, setActiveSuggestion] = useState<number>(-1);
    const [showCommandPalette, setShowCommandPalette] = useState(false);
    const [recentCommand, setRecentCommand] = useState<string | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const { textareaRef, adjustHeight } = useAutoResizeTextarea({
        minHeight: 60,
        maxHeight: 200,
    });
    const [inputFocused, setInputFocused] = useState(false);
    const commandPaletteRef = useRef<HTMLDivElement>(null);

    const commandSuggestions: CommandSuggestion[] = [
        { 
            icon: <ImageIcon className="w-4 h-4" />, 
            label: "Clone UI", 
            description: "Generate a UI from a screenshot", 
            prefix: "/clone" 
        },
        { 
            icon: <Figma className="w-4 h-4" />, 
            label: "Import Figma", 
            description: "Import a design from Figma", 
            prefix: "/figma" 
        },
        { 
            icon: <MonitorIcon className="w-4 h-4" />, 
            label: "Create Page", 
            description: "Generate a new web page", 
            prefix: "/page" 
        },
        { 
            icon: <Sparkles className="w-4 h-4" />, 
            label: "Improve", 
            description: "Improve existing UI design", 
            prefix: "/improve" 
        },
    ];

    useEffect(() => {
        if (value.startsWith('/') && !value.includes(' ')) {
            setShowCommandPalette(true);
            
            const matchingSuggestionIndex = commandSuggestions.findIndex(
                (cmd) => cmd.prefix.startsWith(value)
            );
            
            if (matchingSuggestionIndex >= 0) {
                setActiveSuggestion(matchingSuggestionIndex);
            } else {
                setActiveSuggestion(-1);
            }
        } else {
            setShowCommandPalette(false);
        }
    }, [value]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            const commandButton = document.querySelector('[data-command-button]');
            
            if (commandPaletteRef.current && 
                !commandPaletteRef.current.contains(target) && 
                !commandButton?.contains(target)) {
                setShowCommandPalette(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (showCommandPalette) {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setActiveSuggestion(prev => 
                    prev < commandSuggestions.length - 1 ? prev + 1 : 0
                );
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setActiveSuggestion(prev => 
                    prev > 0 ? prev - 1 : commandSuggestions.length - 1
                );
            } else if (e.key === 'Tab' || e.key === 'Enter') {
                e.preventDefault();
                if (activeSuggestion >= 0) {
                    const selectedCommand = commandSuggestions[activeSuggestion];
                    setValue(selectedCommand.prefix + ' ');
                    setShowCommandPalette(false);
                    
                    setRecentCommand(selectedCommand.label);
                    setTimeout(() => setRecentCommand(null), 3500);
                }
            } else if (e.key === 'Escape') {
                e.preventDefault();
                setShowCommandPalette(false);
            }
        } else if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (value.trim()) {
                handleSendMessage();
            }
        }
    };

    const handleSendMessage = () => {
        if (value.trim()) {
            startTransition(() => {
                setIsTyping(true);
                setTimeout(() => {
                    setIsTyping(false);
                    setValue("");
                    adjustHeight(true);
                }, 3000);
            });
        }
    };

    const handleAttachFile = () => {
        const mockFileName = `file-${Math.floor(Math.random() * 1000)}.pdf`;
        setAttachments(prev => [...prev, mockFileName]);
    };

    const removeAttachment = (index: number) => {
        setAttachments(prev => prev.filter((_, i) => i !== index));
    };
    
    const selectCommandSuggestion = (index: number) => {
        const selectedCommand = commandSuggestions[index];
        setValue(selectedCommand.prefix + ' ');
        setShowCommandPalette(false);
        
        setRecentCommand(selectedCommand.label);
        setTimeout(() => setRecentCommand(null), 2000);
    };

    return (
        <div className="relative w-full min-h-screen bg-gradient-to-br from-black to-neutral-950 overflow-hidden">
            {/* Background Grid Pattern - Same as Hero */}
            <div className="bg-card text-card-foreground shadow-sm absolute inset-0 border-0 rounded-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f0a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f0a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),rgba(255,255,255,0))]"></div>
            </div>

            {/* Animated Spotlight - Same as Hero */}
            <svg className="animate-spotlight pointer-events-none absolute z-[1] h-[169%] w-[138%] lg:w-[84%] opacity-0 -top-40 left-0 md:left-60 md:-top-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3787 2842" fill="none">
                <g filter="url(#filter)">
                    <ellipse cx="1924.71" cy="273.501" rx="1924.71" ry="273.501" transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)" fill="white" fillOpacity="0.21"></ellipse>
                </g>
                <defs>
                    <filter id="filter" x="0.860352" y="0.838989" width="3785.16" height="2840.26" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                        <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur_1065_8"></feGaussianBlur>
                    </filter>
                </defs>
            </svg>

            {/* AI Chat Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
                <div className="w-full max-w-4xl mx-auto">
                    <motion.div 
                        className="relative space-y-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {/* Header Section */}
                        <div className="text-center space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                                className="inline-block"
                            >
                                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 leading-tight tracking-tight">
                                    How can I help today?
                                </h1>
                                <motion.div 
                                    className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mt-4"
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: "100%", opacity: 1 }}
                                    transition={{ delay: 0.8, duration: 1.2 }}
                                />
                            </motion.div>
                            <motion.p 
                                className="text-xl md:text-2xl text-neutral-400 max-w-2xl mx-auto"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                            >
                                Type a command or ask a question to get started with AI-powered assistance
                            </motion.p>
                        </div>

                        {/* Chat Interface */}
                        <motion.div 
                            className="relative backdrop-blur-2xl bg-white/[0.02] rounded-3xl border border-white/[0.05] shadow-2xl"
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                            whileHover={{ scale: 1.01 }}
                            transition={{ duration: 0.3 }}
                        >
                            <AnimatePresence>
                                {showCommandPalette && (
                                    <motion.div 
                                        ref={commandPaletteRef}
                                        className="absolute left-4 right-4 bottom-full mb-3 backdrop-blur-xl bg-black/90 rounded-xl z-50 shadow-2xl border border-white/10 overflow-hidden"
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2, ease: "easeOut" }}
                                    >
                                        <div className="py-2 bg-black/95">
                                            {commandSuggestions.map((suggestion, index) => (
                                                <motion.div
                                                    key={suggestion.prefix}
                                                    className={cn(
                                                        "flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200 cursor-pointer",
                                                        activeSuggestion === index 
                                                            ? "bg-white/10 text-white" 
                                                            : "text-white/70 hover:bg-white/5"
                                                    )}
                                                    onClick={() => selectCommandSuggestion(index)}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.05, duration: 0.3 }}
                                                    whileHover={{ x: 5 }}
                                                >
                                                    <div className="w-6 h-6 flex items-center justify-center text-white/60">
                                                        {suggestion.icon}
                                                    </div>
                                                    <div className="font-medium">{suggestion.label}</div>
                                                    <div className="text-white/40 text-xs ml-auto">
                                                        {suggestion.prefix}
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="p-6">
                                <Textarea
                                    ref={textareaRef}
                                    value={value}
                                    onChange={(e) => {
                                        setValue(e.target.value);
                                        adjustHeight();
                                    }}
                                    onKeyDown={handleKeyDown}
                                    onFocus={() => setInputFocused(true)}
                                    onBlur={() => setInputFocused(false)}
                                    placeholder="Ask me anything or type a command..."
                                    containerClassName="w-full"
                                    className={cn(
                                        "w-full px-6 py-4",
                                        "resize-none",
                                        "bg-transparent",
                                        "border-none",
                                        "text-white/90 text-lg",
                                        "focus:outline-none",
                                        "placeholder:text-white/30",
                                        "min-h-[80px]",
                                        "font-medium"
                                    )}
                                    style={{
                                        overflow: "hidden",
                                    }}
                                    showRing={false}
                                />
                            </div>

                            <AnimatePresence>
                                {attachments.length > 0 && (
                                    <motion.div 
                                        className="px-6 pb-4 flex gap-3 flex-wrap"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        {attachments.map((file, index) => (
                                            <motion.div
                                                key={index}
                                                className="flex items-center gap-2 text-sm bg-white/[0.05] py-2 px-4 rounded-lg text-white/70 border border-white/[0.05]"
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                <span>{file}</span>
                                                <button 
                                                    onClick={() => removeAttachment(index)}
                                                    className="text-white/40 hover:text-white transition-colors ml-2"
                                                >
                                                    <XIcon className="w-4 h-4" />
                                                </button>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="p-6 border-t border-white/[0.05] flex items-center justify-between gap-6">
                                <div className="flex items-center gap-4">
                                    <motion.button
                                        type="button"
                                        onClick={handleAttachFile}
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="p-3 text-white/40 hover:text-white/90 rounded-xl transition-all duration-200 relative group bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.05]"
                                    >
                                        <Paperclip className="w-5 h-5" />
                                        <motion.span
                                            className="absolute inset-0 bg-white/[0.05] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                                            layoutId="button-highlight"
                                        />
                                    </motion.button>
                                    <motion.button
                                        type="button"
                                        data-command-button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setShowCommandPalette(prev => !prev);
                                        }}
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={cn(
                                            "p-3 text-white/40 hover:text-white/90 rounded-xl transition-all duration-200 relative group bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.05]",
                                            showCommandPalette && "bg-white/10 text-white/90 border-white/20"
                                        )}
                                    >
                                        <Command className="w-5 h-5" />
                                        <motion.span
                                            className="absolute inset-0 bg-white/[0.05] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                                            layoutId="button-highlight"
                                        />
                                    </motion.button>
                                </div>
                                
                                <motion.button
                                    type="button"
                                    onClick={handleSendMessage}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={isTyping || !value.trim()}
                                    className={cn(
                                        "px-8 py-3 rounded-xl text-base font-semibold transition-all duration-200",
                                        "flex items-center gap-3",
                                        "shadow-lg",
                                        value.trim()
                                            ? "bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-blue-500/25 hover:shadow-blue-500/40"
                                            : "bg-white/[0.05] text-white/40 border border-white/[0.05]"
                                    )}
                                >
                                    {isTyping ? (
                                        <LoaderIcon className="w-5 h-5 animate-[spin_2s_linear_infinite]" />
                                    ) : (
                                        <SendIcon className="w-5 h-5" />
                                    )}
                                    <span>{isTyping ? "Thinking..." : "Send"}</span>
                                </motion.button>
                            </div>
                        </motion.div>

                        {/* Command Suggestions */}
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            {commandSuggestions.map((suggestion, index) => (
                                <motion.button
                                    key={suggestion.prefix}
                                    onClick={() => selectCommandSuggestion(index)}
                                    className="flex items-center gap-3 px-6 py-4 bg-white/[0.02] hover:bg-white/[0.05] rounded-2xl text-base text-white/60 hover:text-white/90 transition-all duration-200 relative group border border-white/[0.05] hover:border-white/[0.1]"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="w-6 h-6 text-white/60 group-hover:text-white/80 transition-colors">
                                        {suggestion.icon}
                                    </div>
                                    <span className="font-medium">{suggestion.label}</span>
                                    <motion.div
                                        className="absolute inset-0 border border-white/[0.05] rounded-2xl"
                                        initial={false}
                                        animate={{
                                            opacity: [0, 1],
                                            scale: [0.98, 1],
                                        }}
                                        transition={{
                                            duration: 0.3,
                                            ease: "easeOut",
                                        }}
                                    />
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Typing Indicator */}
            <AnimatePresence>
                {isTyping && (
                    <motion.div 
                        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 backdrop-blur-2xl bg-white/[0.02] rounded-full px-6 py-3 shadow-2xl border border-white/[0.05] z-50"
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-8 rounded-full bg-gradient-to-r from-blue-500/20 to-violet-500/20 flex items-center justify-center text-center border border-white/10">
                                <span className="text-sm font-semibold text-white/90">AI</span>
                            </div>
                            <div className="flex items-center gap-2 text-base text-white/70">
                                <span>Thinking</span>
                                <TypingDots />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Interactive Background Effect */}
            {inputFocused && (
                <motion.div 
                    className="fixed w-[60rem] h-[60rem] rounded-full pointer-events-none z-0 opacity-[0.03] bg-gradient-to-r from-blue-500 via-violet-500 to-indigo-500 blur-[120px]"
                    animate={{
                        x: mousePosition.x - 480,
                        y: mousePosition.y - 480,
                    }}
                    transition={{
                        type: "spring",
                        damping: 30,
                        stiffness: 200,
                        mass: 0.8,
                    }}
                />
            )}

            {/* Bottom Gradient Overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-20"></div>
        </div>
    );
}

function TypingDots() {
    return (
        <div className="flex items-center ml-2">
            {[1, 2, 3].map((dot) => (
                <motion.div
                    key={dot}
                    className="w-2 h-2 bg-white/90 rounded-full mx-1"
                    initial={{ opacity: 0.3 }}
                    animate={{ 
                        opacity: [0.3, 0.9, 0.3],
                        scale: [0.85, 1.1, 0.85]
                    }}
                    transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: dot * 0.15,
                        ease: "easeInOut",
                    }}
                    style={{
                        boxShadow: "0 0 8px rgba(255, 255, 255, 0.4)"
                    }}
                />
            ))}
        </div>
    );
}

interface ActionButtonProps {
    icon: React.ReactNode;
    label: string;
}

function ActionButton({ icon, label }: ActionButtonProps) {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
        <motion.button
            type="button"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="flex items-center gap-2 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 rounded-full border border-neutral-800 text-neutral-400 hover:text-white transition-all relative overflow-hidden group"
        >
            <div className="relative z-10 flex items-center gap-2">
                {icon}
                <span className="text-xs relative z-10">{label}</span>
            </div>
            
            <AnimatePresence>
                {isHovered && (
                    <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-indigo-500/10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    />
                )}
            </AnimatePresence>
            
            <motion.span 
                className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-violet-500 to-indigo-500"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
            />
        </motion.button>
    );
}

const rippleKeyframes = `
@keyframes ripple {
  0% { transform: scale(0.5); opacity: 0.6; }
  100% { transform: scale(2); opacity: 0; }
}
`;

if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.innerHTML = rippleKeyframes;
    document.head.appendChild(style);
}
