import { useState } from 'react';
import { 
  Shield, 
  Cloud, 
  Brain, 
  Wifi, 
  BarChart3, 
  Smartphone, 
  Globe,
  X
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const Tech = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const technologies = [
    {
      icon: Shield,
      title: 'Cyber Security',
      description: 'Advanced security protocols to protect your smart home infrastructure from threats.',
      color: 'text-red-500',
      video: '/videos/cyber-security.mp4'
    },
    {
      icon: Cloud,
      title: 'Cloud Computing',
      description: 'Scalable cloud solutions on AWS, Azure, and GCP for seamless device management.',
      color: 'text-blue-500',
      video: '/videos/cloud-computing.mp4'
    },
    {
      icon: Brain,
      title: 'Machine Learning',
      description: 'AI-powered optimization algorithms that learn your usage patterns and preferences.',
      color: 'text-purple-500',
      video: '/videos/machine-learning.mp4'
    },
    {
      icon: Wifi,
      title: 'Internet of Things',
      description: 'Connected device ecosystem that enables intelligent home automation.',
      color: 'text-primary',
      video: '/videos/iot.mp4'
    },
    {
      icon: BarChart3,
      title: 'Data Analytics',
      description: 'Comprehensive analytics platform for energy usage insights and optimization.',
      color: 'text-secondary',
      video: '/videos/data-analytics.mp4'
    },
    {
      icon: Smartphone,
      title: 'App Development',
      description: 'Native Android & iOS applications for seamless smart home control.',
      color: 'text-green-500',
      video: '/videos/app-development.mp4'
    },
    {
      icon: Globe,
      title: 'Website Development',
      description: 'Modern web applications and platforms for device management and monitoring.',
      color: 'text-indigo-500'
    }
  ];

  const handleIconClick = (video?: string) => {
    if (video) {
      setSelectedVideo(video);
      setIsVideoModalOpen(true);
    }
  };

  return (
    <section id="tech" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 animate-fade-in-up">
            Empowering Innovation with{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Advanced Technologies
            </span>
          </h2>
          <div className="max-w-4xl mx-auto animate-fade-in-up animate-delay-200">
            <p className="text-lg text-muted-foreground">
              At NirwanaGrid Private Limited, we don't just build smart energy devices — we innovate across 
              diverse technology domains to drive the future of connected living.
            </p>
          </div>
        </div>

        {/* Technology Grid */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 animate-fade-in-up animate-delay-300">
            Our Technology Areas
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologies.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <Card 
                  key={tech.title} 
                  className={`card-hover group animate-scale-in`}
                  style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                >
                  <CardHeader className="text-center pb-4">
                    <div 
                      className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 flex items-center justify-center mb-4 group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-300 ${tech.video ? 'cursor-pointer' : ''}`}
                      onClick={() => handleIconClick(tech.video)}
                    >
                      <Icon className={`h-10 w-10 ${tech.color} group-hover:scale-110 transition-transform duration-300`} />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                      {tech.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center leading-relaxed">
                      {tech.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Innovation Promise */}
        <div className="text-center bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 rounded-2xl p-8 tech-pattern animate-fade-in-up animate-delay-600">
          <h3 className="text-xl md:text-2xl font-semibold mb-4 text-primary">
            Continuous Innovation
          </h3>
          <p className="text-muted-foreground max-w-3xl mx-auto mb-6">
            Our multidisciplinary expertise across cybersecurity, cloud computing, AI, IoT, 
            data analytics, and application development ensures that NirwanaGrid stays at 
            the forefront of smart home technology.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="px-3 py-1 bg-primary/10 rounded-full text-primary">Research & Development</span>
            <span className="px-3 py-1 bg-secondary/10 rounded-full text-secondary">Innovation Labs</span>
            <span className="px-3 py-1 bg-primary/10 rounded-full text-primary">Technology Partnerships</span>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={isVideoModalOpen} onOpenChange={setIsVideoModalOpen}>
        <DialogContent className="max-w-4xl w-full p-0 bg-background/95 backdrop-blur-sm">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-center text-xl text-foreground">Technology Demo</DialogTitle>
          </DialogHeader>
          <div className="p-6 pt-4">
            {selectedVideo && (
              <div className="aspect-video rounded-lg overflow-hidden">
                <video
                  src={selectedVideo}
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error('Video failed to load:', selectedVideo);
                  }}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Tech;