import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useMemo, useCallback } from 'react';

export default function Home() {
    const scrollToSection = useCallback((sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    const technologies = ['React', 'JavaScript', 'TypeScript', 'Flutter', 'Python'];
    const techBadges = useMemo(() => technologies.map((tech, index) => (
        <motion.div
            key={tech}
            className="flex-[1_0_auto] sm:flex-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: 1.15 + index * 0.15 }}
        >
            <Badge variant="secondary" className="sm:text-sm px-2 py-1 rounded-full cursor-default whitespace-nowrap">
                {tech}
            </Badge>
        </motion.div>
    )), []);

    return (
        <div className="w-full py-20 flex flex-col justify-center items-start px-4 sm:px-12 max-w-5xl mx-auto relative overflow-hidden">
            <motion.h1
                className="text-4xl sm:text-6xl font-extrabold text-foreground mb-4 relative z-10"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
            >
                Hi, I'm <motion.span 
                    className="text-primary inline-block"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.55, delay: 0.35, ease: "easeOut" }}
                >Damian</motion.span>
            </motion.h1>
            <motion.p
                className="text-xl sm:text-2xl text-muted-foreground mb-4 relative z-10"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.75, ease: "easeOut" }}
            >
                Frontend Software Engineer
            </motion.p>
            <motion.div
                className="flex flex-wrap gap-2 sm:gap-4 mb-6 relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.45, delay: 0.95 }}
            >
                {techBadges}
            </motion.div>
            <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, delay: 1.95 }}
                >
                    <Button 
                        className="font-bold hover:border-transparent"
                        variant="default" 
                        size="default" 
                        onClick={() => scrollToSection('projects')}
                    >
                        Explore My Projects
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, delay: 2.15 }}
                >
                    <Button 
                        className="hover:border-transparent"
                        variant="outline" 
                        size="default" 
                        onClick={() => scrollToSection('contact')}
                    >
                        Contact me
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </motion.div>
            </div>
        </div>
    )
}
