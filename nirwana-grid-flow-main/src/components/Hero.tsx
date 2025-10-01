import { ArrowRight, Zap, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';



const Hero = () => {
  return (
    <section id="home" className="hero-section min-h-screen flex items-center pt-16 relative overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/video_NG.mp4" type="video/mp4" />
      </video>
      
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-background/70 z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-20">
        <div className="text-center">
          {/* Logo removed */}

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up animate-delay-200">
            <span className="text-foreground font-bold">
              NirwanaGrid Private Limited
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 animate-fade-in-up animate-delay-300">
            <span className="text-cyan-400 font-bold">Zero Effort.</span>{' '}
            <span className="text-secondary font-bold">Peaceful Living.</span>
          </p>

          {/* Description */}
          <div className="max-w-3xl mx-auto mb-12 animate-fade-in-up animate-delay-400">
            <p className="text-lg text-muted-foreground mb-6">
              Transform your home into a smart, efficient living space with our innovative 
              energy management system that seamlessly integrates with your existing infrastructure.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-secondary" />
                <span>Smart Automation</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-secondary" />
                <span>Energy Savings</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-secondary" />
                <span>Safety First</span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center animate-fade-in-up animate-delay-400">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="btn-primary group">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Live Demo: Why You'll Love NirwanaGrid
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-4xl p-0">
                <video
                  controls
                  autoPlay
                  className="w-full h-auto max-h-[80vh] rounded-lg"
                >
                  <source src="/videos/demo-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </DialogContent>
            </Dialog>
          </div>

          {/* Tech pattern background */}
          <div className="absolute inset-0 tech-pattern opacity-30 pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default Hero;