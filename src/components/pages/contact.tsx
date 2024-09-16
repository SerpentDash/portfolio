import { FaGithub, FaEnvelope } from 'react-icons/fa';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
    },
};

export default function Contact() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.div
            ref={ref}
            className="w-full max-w-4xl space-y-8 p-8 relative min-h-full flex flex-col justify-center"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            <motion.h1
                className="text-3xl sm:text-4xl font-bold text-center"
                variants={itemVariants}
            >
                Get in touch with me
            </motion.h1>

            <motion.p
                className="text-xl text-pretty text-center text-muted-foreground mb-8"
                variants={itemVariants}
            >
                Whether you have a question or just want to say hi, feel free to reach out.
            </motion.p>

            <motion.div
                className="flex flex-row  justify-center items-center space-x-8"
                variants={containerVariants}
            >
                <motion.div variants={buttonVariants}>
                    <a
                        href="https://github.com/SerpentDash"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-lg hover:bg-primary/45 text-foreground hover:text-primary rounded-xl px-2 py-1 duration-300"
                    >
                        <FaGithub className="text-2xl" />
                        <span>GitHub</span>
                    </a>
                </motion.div>
                <motion.div variants={buttonVariants}>
                    <a
                        href="mailto:d.k500555@gmail.com"
                        className="flex items-center space-x-2 text-lg hover:bg-primary/45 text-foreground hover:text-primary rounded-xl px-2 py-1 duration-300"
                    >
                        <FaEnvelope className="text-2xl" />
                        <span>Email</span>
                    </a>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}