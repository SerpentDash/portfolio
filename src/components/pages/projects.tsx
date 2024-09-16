import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { SiGithub } from '@icons-pack/react-simple-icons'
import { motion, useInView } from 'framer-motion';
import { useRef, useMemo } from 'react';

const projects = [
    {
        title: "Shinden Mobile",
        description: "Unofficial mobile version of the Shinden website. Modern design with new features including video streaming in external video player apps.",
        technologies: ["Flutter", "Dart", "InAppWebView"],
        category: "Mobile Development",
        githubUrl: "https://github.com/SerpentDash/shinden_mobile"
    },
    {
        title: "ADB-TAR",
        description: "Tool for managing and transferring archived data between Android device and desktop machine using Android Debug Bridge.",
        technologies: ["Python", "ADB"],
        category: "Android Development",
        githubUrl: "https://github.com/SerpentDash/ADB-TAR"
    },
    {
        title: "SIM Assistant",
        description: "Flutter app that allows users to send extracted USSD top-up codes from images using OCR.",
        technologies: ["Flutter", "Dart", "OCR", "Google ML Kit", "ObjectBox"],
        category: "Mobile Development",
        githubUrl: null
    },
    
    {
        title: "Portfolio",
        description: "This website",
        technologies: ["React", "Tailwind CSS", "Shadcn UI", "TypeScript", "Vite", "Github Pages", "Github Actions"],
        category: "Web Development",
        githubUrl: "https://github.com/SerpentDash/portfolio"
    },
    {
        title: "Audio shop",
        description: "E-commerce web app for browsing and selling access to podcasts and audiobooks",
        technologies: ["React", "Tailwind CSS", "Daisy UI", "JavaScript", "Vite"],
        category: "Web Development",
        githubUrl: null
    }
]

export default function Projects() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const projectCards = useMemo(() => projects.map((project, index) => (
        <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 + index * 0.2 }}
        >
            <Card className="bg-transparent backdrop-blur-sm border-muted transition-all duration-200 lg:hover:scale-105 h-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-2xl font-bold">{project.title}</CardTitle>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={!project.githubUrl}
                                        asChild={!!project.githubUrl}
                                    >
                                        {project.githubUrl ? (
                                            <a href={project.githubUrl} className="text-foreground" target="_blank" rel="noopener noreferrer">
                                                <SiGithub className="pointer-events-none" size={20} />
                                                <span className="sr-only">GitHub</span>
                                            </a>
                                        ) : (
                                            <>
                                                <SiGithub className="pointer-events-none" size={20} />
                                                <span className="sr-only">GitHub</span>
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent className="rounded-xl">
                                <p>{project.githubUrl ? "View on GitHub" : "Private Repository"}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                    <div>
                        <CardDescription className="mb-2">{project.category}</CardDescription>
                        <p className="mb-4 line-clamp-3">{project.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                            <Badge key={techIndex} variant="secondary" className="cursor-default rounded-xl">{tech}</Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )), [isInView])

    return (
        <div ref={ref} className="w-full max-w-4xl space-y-8">
            <motion.h1 
                className="text-4xl font-bold text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
            >
                Projects
            </motion.h1>
            <motion.p 
                className="text-center text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                Some of my projects are listed here.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projectCards}
            </div>
        </div>
    )
}