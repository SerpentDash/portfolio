import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { cn } from "@/lib/utils"
import Home from './components/pages/home'
import Projects from './components/pages/projects'
import Contact from './components/pages/contact'

import './index.css'

const sections = [
  { name: 'Home', component: Home },
  { name: 'Projects', component: Projects },
  { name: 'Contact', component: Contact }
]

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const backgroundRef = useRef<HTMLDivElement>(null)

  const scrollToSection = useCallback((sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const handleScrollAndResize = useCallback(() => {
    if (containerRef.current && backgroundRef.current) {
      const scrollPercentage = containerRef.current.scrollTop / (containerRef.current.scrollHeight - containerRef.current.clientHeight)
      const backgroundHeight = backgroundRef.current.offsetHeight - window.innerHeight
      backgroundRef.current.style.transform = `translateY(-${scrollPercentage * backgroundHeight}px)`
      backgroundRef.current.style.height = `${window.innerHeight * sections.length}px`
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          const newSection = entry.target.id;
          setActiveSection(newSection);
        }
      }),
      { threshold: 0.5 }
    )

    sectionRefs.current.forEach(ref => ref && observer.observe(ref))

    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScrollAndResize)
      window.addEventListener('resize', handleScrollAndResize)
      handleScrollAndResize()
    }

    return () => {
      container?.removeEventListener('scroll', handleScrollAndResize)
      window.removeEventListener('resize', handleScrollAndResize)
      observer.disconnect()
    }
  }, [handleScrollAndResize])

  const renderedSections = useMemo(() => sections.map((section, index) => (
    <div
      key={section.name}
      id={section.name.toLowerCase()}
      ref={el => (sectionRefs.current[index] = el)}
      className="section min-h-screen w-full flex items-center justify-center py-20 px-2 snap-start pb-28 relative"
    >
      <section.component />

    </div>
  )), [])

  return (
    <div className="w-screen h-screen overflow-hidden relative bg-background">
      <div
        ref={backgroundRef}
        className={cn(
          "absolute inset-0 w-full pointer-events-none",
          "bg-[radial-gradient(circle,theme(colors.foreground/0.15)_2px,transparent_2px)]",
          "bg-[size:40px_40px]",
          "after:content-[''] after:absolute after:inset-0",
          "animate-float-background"
        )}
      />
      <div className="flex w-full h-full relative">
        <nav className="w-10 h-svh flex flex-col items-center justify-between py-7 relative z-10">
          <ul className="space-y-12 relative">
            {sections.map((section, _) => (
              <li key={section.name} className="relative">
                <button
                  onClick={() => scrollToSection(section.name.toLowerCase())}
                  className={cn(
                    "w-10 py-4 text-sm bg-transparent flex items-center justify-center cursor-pointer",
                    "transition-colors duration-300 ease-in-out",
                    "hover:border-transparent focus:border-transparent focus:outline-none group",
                    activeSection === section.name.toLowerCase()
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary",
                  )}
                >
                  <span className="-rotate-90 whitespace-nowrap relative">
                    {section.name}
                  </span>
                  <span
                    className={cn(
                      "absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-0 bg-primary",
                      "transition-all duration-300 ease-in-out",
                      activeSection === section.name.toLowerCase()
                        ? "h-full opacity-100"
                        : "opacity-0"
                    )}
                  />
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div ref={containerRef} className="flex-1 h-screen overflow-y-auto snap-y snap-mandatory">
          {renderedSections}
        </div>
      </div>
    </div>
  )
}

export default App