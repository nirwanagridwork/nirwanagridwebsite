import { 
  Zap, 
  TrendingDown, 
  BarChart3, 
  MessageSquare, 
  Leaf, 
  Brain, 
  Shield, 
  Power,
  Lightbulb,
  Thermometer,
  Wifi,
  Battery
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { useState, useEffect } from 'react';

const About = () => {
  const headerRef = useScrollAnimation(0.2);
  const featuresRef = useScrollAnimation(0.1);
  const teamRef = useScrollAnimation(0.1);
  const visionRef = useScrollAnimation(0.2);
  const [smartHomeState, setSmartHomeState] = useState({
    lights: false,
    ac: false,
    fan: false,
    tv: false
  });
  const [energyData, setEnergyData] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // Simulate smart home automation
  useEffect(() => {
    const interval = setInterval(() => {
      const devices = Object.keys(smartHomeState);
      const randomDevice = devices[Math.floor(Math.random() * devices.length)];
      setSmartHomeState(prev => ({
        ...prev,
        [randomDevice]: !prev[randomDevice as keyof typeof prev]
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Simulate real-time energy data
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergyData(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 10)));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Energy consumption data
  const energyConsumptionData = [
    { month: 'Jan', beforeNirwana: 450, afterNirwana: 320, savings: 130 },
    { month: 'Feb', beforeNirwana: 480, afterNirwana: 340, savings: 140 },
    { month: 'Mar', beforeNirwana: 520, afterNirwana: 360, savings: 160 },
    { month: 'Apr', beforeNirwana: 580, afterNirwana: 390, savings: 190 },
    { month: 'May', beforeNirwana: 650, afterNirwana: 420, savings: 230 },
    { month: 'Jun', beforeNirwana: 720, afterNirwana: 450, savings: 270 },
  ];

  // Device usage pie chart data
  const deviceUsageData = [
    { name: 'Lights', value: 25, color: '#8884d8' },
    { name: 'AC', value: 35, color: '#82ca9d' },
    { name: 'Appliances', value: 20, color: '#ffc658' },
    { name: 'Others', value: 20, color: '#ff7c7c' },
  ];

  const features = [
    {
      icon: Zap,
      title: 'Smart Automation',
      description: 'Converts traditional devices into smart devices without replacing them.',
      gradient: 'from-primary to-primary-light',
      video: '/videos/smart-automation.mp4'
    },
    {
      icon: TrendingDown,
      title: 'Energy Saving',
      description: 'Reduces electricity consumption and helps lower your electricity bills.',
      gradient: 'from-secondary to-secondary-light',
      video: '/videos/energy-saving.mp4'
    },
    {
      icon: BarChart3,
      title: 'Usage Insights',
      description: 'Shows clear graph representations and compares energy usage before and after installation.',
      gradient: 'from-primary to-secondary',
      video: '/videos/usage-insights.mp4'
    },
    {
      icon: MessageSquare,
      title: 'Easy Alerts',
      description: 'Sends normal text messages (no smartphone required) to notify users about energy status.',
      gradient: 'from-secondary to-primary',
      video: '/videos/easy-alerts.mp4'
    },
    {
      icon: Leaf,
      title: 'Environment-Friendly',
      description: 'Actively reduces carbon emissions by optimizing energy usage.',
      gradient: 'from-secondary to-secondary-light',
      video: '/videos/environment-friendly.mp4'
    },
    {
      icon: Brain,
      title: 'Smart Recommendations',
      description: 'Gives intelligent suggestions to cut off unused devices automatically.',
      gradient: 'from-primary to-primary-light',
      video: '/videos/recommendations.mp4'
    },
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Detects defects and shuts down power before mishappenings or short circuits occur.',
      gradient: 'from-primary to-secondary',
      video: '/videos/safety-first.mp4'
    },
    {
      icon: Power,
      title: 'Fault Isolation',
      description: 'Can cut off power only in the specific area/device where a fault is detected.',
      gradient: 'from-secondary to-primary',
      video: '/videos/fault-isolation.mp4'
    }
  ];

  const teamMembers = [
    { name: 'AABHAY GUPTA', image: '/src/assets/team-aabhay.jpg' },
    { name: 'CHITVAN CHAUDHARY', image: '/src/assets/team-chitvan.png' },
    { name: 'ANUSHKA TIWARI', image: '/src/assets/team-anushka.jpg' },
    { name: 'DEVANSH SINGH', image: '/src/assets/team-devansh.jpg' },
    { name: 'PIYUSH KUMAR', image: '/src/assets/team-piyush.png' }
  ];

  return (
    <section id="about" className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Energy-themed Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        {/* Primary floating shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary rounded-full blur-xl animate-float-medium" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-accent rounded-full blur-xl animate-float-fast" style={{ animationDelay: '2s' }}></div>
        
        {/* Geometric shapes */}
        <div className="absolute top-32 right-20 w-16 h-16 bg-gradient-to-r from-primary to-secondary rotate-45 animate-spin-slow opacity-30"></div>
        <div className="absolute bottom-32 left-20 w-20 h-20 bg-gradient-to-r from-secondary to-primary rotate-12 animate-bounce-slow opacity-40"></div>
        
        {/* Moving gradient lines */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-slide-x"></div>
        <div className="absolute bottom-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-secondary to-transparent animate-slide-y"></div>
      </div>

      {/* Energy waves and electrical effects */}
      <div className="absolute inset-0 opacity-15">
        {/* Energy waves */}
        <div className="absolute top-1/4 left-0 w-full h-2 bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-energy-wave"></div>
        <div className="absolute top-2/4 right-0 w-full h-1 bg-gradient-to-l from-transparent via-secondary/50 to-transparent animate-energy-wave-reverse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-3/4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-energy-wave" style={{ animationDelay: '2s' }}></div>
        
        {/* Energy pulses */}
        <div className="absolute top-16 left-16 w-4 h-4 bg-primary rounded-full animate-energy-pulse"></div>
        <div className="absolute bottom-16 right-16 w-6 h-6 bg-secondary rounded-full animate-energy-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-accent rounded-full animate-energy-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-1/3 left-1/4 w-5 h-5 bg-primary rounded-full animate-energy-pulse" style={{ animationDelay: '2.5s' }}></div>
        
        {/* Electrical zigzag lines */}
        <div className="absolute top-20 left-1/4 w-32 h-1 bg-primary animate-electrical-zap opacity-60"></div>
        <div className="absolute bottom-20 right-1/4 w-24 h-1 bg-secondary animate-electrical-zap-reverse opacity-60" style={{ animationDelay: '1s' }}></div>
        
        {/* Energy field rings */}
        <div className="absolute top-1/2 left-1/6 w-40 h-40 border-2 border-primary rounded-full animate-energy-ring"></div>
        <div className="absolute top-1/3 right-1/6 w-32 h-32 border border-secondary rounded-full animate-energy-ring-reverse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-5 animate-grid-move tech-pattern"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div 
          ref={headerRef.ref} 
          className={`text-center mb-16 transition-all duration-1000 transform ${
            headerRef.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 relative">
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient bg-300% animate-pulse">
              NirwanaGrid Private Limited
            </span>
            <br />
            <span className="text-2xl md:text-3xl lg:text-4xl mt-2 inline-block animate-bounce text-white" style={{ animationDelay: '0.5s' }}>
              – Zero Effort. Peaceful Living.
            </span>
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed hover:text-foreground transition-colors duration-300">
              NirwanaGrid Private Limited is an innovative smart energy management system that fits seamlessly 
              inside your existing switch boards and transforms traditional electrical devices 
              into intelligent, connected devices. It empowers users to monitor, control, and 
              automate their entire home — all with safety and simplicity.
            </p>
          </div>
        </div>

        {/* Interactive Smart Home Demo */}
        <div 
          ref={featuresRef.ref} 
          className={`mb-16 transition-all duration-1000 transform ${
            featuresRef.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Experience Smart Automation
            </span>
          </h3>
          
          {/* Smart Home Visualization */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 mb-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-green-500/10"></div>
            <h4 className="text-xl font-semibold text-foreground mb-6 text-center relative z-10">
              Live Smart Home Simulation
            </h4>
            
            {/* House Layout */}
            <div className="relative z-10 max-w-4xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {/* Living Room */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 hover:border-primary/50 transition-all duration-300">
                  <h5 className="text-foreground font-medium mb-3 text-center">Living Room</h5>
                  <div className="space-y-3">
                    <div className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-500 ${
                      smartHomeState.lights ? 'bg-yellow-500/20 border border-yellow-500/50' : 'bg-gray-700/50'
                    }`}>
                      <Lightbulb className={`w-5 h-5 transition-all duration-300 ${
                        smartHomeState.lights ? 'text-yellow-400 animate-pulse' : 'text-gray-500'
                      }`} />
                      <span className={`text-sm transition-colors duration-300 ${
                        smartHomeState.lights ? 'text-yellow-300' : 'text-gray-400'
                      }`}>
                        Lights {smartHomeState.lights ? 'ON' : 'OFF'}
                      </span>
                    </div>
                    <div className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-500 ${
                      smartHomeState.tv ? 'bg-blue-500/20 border border-blue-500/50' : 'bg-gray-700/50'
                    }`}>
                      <div className={`w-5 h-5 transition-all duration-300 ${
                        smartHomeState.tv ? 'text-blue-400' : 'text-gray-500'
                      }`}>📺</div>
                      <span className={`text-sm transition-colors duration-300 ${
                        smartHomeState.tv ? 'text-blue-300' : 'text-gray-400'
                      }`}>
                        TV {smartHomeState.tv ? 'ON' : 'OFF'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bedroom */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 hover:border-primary/50 transition-all duration-300">
                  <h5 className="text-foreground font-medium mb-3 text-center">Bedroom</h5>
                  <div className="space-y-3">
                    <div className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-500 ${
                      smartHomeState.ac ? 'bg-cyan-500/20 border border-cyan-500/50' : 'bg-gray-700/50'
                    }`}>
                      <Thermometer className={`w-5 h-5 transition-all duration-300 ${
                        smartHomeState.ac ? 'text-cyan-400 animate-pulse' : 'text-gray-500'
                      }`} />
                      <span className={`text-sm transition-colors duration-300 ${
                        smartHomeState.ac ? 'text-cyan-300' : 'text-gray-400'
                      }`}>
                        AC {smartHomeState.ac ? 'ON' : 'OFF'}
                      </span>
                    </div>
                    <div className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-500 ${
                      smartHomeState.fan ? 'bg-green-500/20 border border-green-500/50' : 'bg-gray-700/50'
                    }`}>
                      <div className={`w-5 h-5 transition-all duration-300 ${
                        smartHomeState.fan ? 'text-green-400 animate-spin' : 'text-gray-500'
                      }`}>🌀</div>
                      <span className={`text-sm transition-colors duration-300 ${
                        smartHomeState.fan ? 'text-green-300' : 'text-gray-400'
                      }`}>
                        Fan {smartHomeState.fan ? 'ON' : 'OFF'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Control Panel */}
                <div className="bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm rounded-xl p-4 border border-primary/30">
                  <h5 className="text-foreground font-medium mb-3 text-center">Control Hub</h5>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-green-500/20 border border-green-500/50">
                      <Wifi className="w-5 h-5 text-green-400 animate-pulse" />
                      <span className="text-sm text-green-300">Connected</span>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">{Math.round(energyData)}%</div>
                      <div className="text-xs text-gray-300">Energy Efficiency</div>
                      <div className={`mt-1 h-2 bg-gray-700 rounded-full overflow-hidden`}>
                        <div 
                          className="h-full bg-gradient-to-r from-green-400 to-blue-400 transition-all duration-1000 ease-out"
                          style={{ width: `${energyData}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Energy Monitor */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 hover:border-secondary/50 transition-all duration-300">
                  <h5 className="text-foreground font-medium mb-3 text-center">Energy Monitor</h5>
                  <div className="space-y-3">
                    <div className="text-center">
                      <Battery className="w-8 h-8 text-green-400 mx-auto mb-2 animate-pulse" />
                      <div className="text-lg font-semibold text-green-400">
                        {Math.round(30 - energyData * 0.2)}%
                      </div>
                      <div className="text-xs text-gray-300">Energy Saved</div>
                    </div>
                    <div className="text-xs text-center text-gray-400">
                      Real-time monitoring
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Energy Savings Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Monthly Energy Consumption Chart */}
            <Card className="p-6 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border-0">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-center">Monthly Energy Consumption</CardTitle>
                <CardDescription className="text-center">Before vs After NirwanaGrid Installation</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={energyConsumptionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: 'none', 
                        borderRadius: '8px',
                        color: '#F9FAFB'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="beforeNirwana" 
                      stackId="1" 
                      stroke="#EF4444" 
                      fill="#EF4444" 
                      fillOpacity={0.3}
                      name="Before NirwanaGrid (kWh)"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="afterNirwana" 
                      stackId="2" 
                      stroke="#10B981" 
                      fill="#10B981" 
                      fillOpacity={0.6}
                      name="After NirwanaGrid (kWh)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Device Usage Distribution */}
            <Card className="p-6 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border-0">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-center">Smart Device Distribution</CardTitle>
                <CardDescription className="text-center">Optimized Energy Usage by Device Type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={deviceUsageData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {deviceUsageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: 'none', 
                        borderRadius: '8px',
                        color: '#F9FAFB'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                  {deviceUsageData.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: entry.color }}
                      ></div>
                      <span className="text-sm text-muted-foreground">{entry.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Feature Cards */}
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              What Makes NirwanaGrid Different
            </span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={feature.title} 
                  className={`group cursor-pointer transition-all duration-500 hover:scale-105 hover:rotate-1 hover:shadow-2xl hover:shadow-primary/20 border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm hover:from-card hover:to-card/80 transform ${
                    featuresRef.isVisible 
                      ? 'translate-y-0 opacity-100 scale-100' 
                      : 'translate-y-8 opacity-0 scale-95'
                  }`}
                  style={{ 
                    transitionDelay: featuresRef.isVisible ? `${index * 100}ms` : '0ms'
                  }}
                  onClick={() => setSelectedVideo(feature.video)}
                >
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg hover:shadow-xl`}>
                      <Icon className="h-8 w-8 text-foreground group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-sm leading-relaxed group-hover:text-foreground transition-colors duration-300">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Our Team */}
        <div 
          ref={teamRef.ref}
          className={`mb-16 transition-all duration-1000 transform ${
            teamRef.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              Our Team
            </span>
          </h3>
          
          {/* Team Group Photo */}
          <div className="mb-12 text-center group">
            <img 
              src="/src/assets/team-group.jpg" 
              alt="NirwanaGrid Team"
              className="mx-auto rounded-2xl shadow-2xl max-w-4xl w-full h-auto transition-all duration-500 group-hover:scale-105 group-hover:shadow-3xl hover:shadow-primary/20"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {teamMembers.map((member, index) => (
              <Card 
                key={member.name}
                className={`text-center group cursor-pointer transition-all duration-500 hover:scale-110 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/20 border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm hover:from-card hover:to-card/80 transform ${
                  teamRef.isVisible 
                    ? 'translate-y-0 opacity-100 scale-100' 
                    : 'translate-y-8 opacity-0 scale-95'
                }`}
                style={{ 
                  transitionDelay: teamRef.isVisible ? `${300 + index * 100}ms` : '0ms'
                }}
              >
                <CardContent className="pt-6">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-r from-primary to-secondary p-1 group-hover:p-0.5 group-hover:scale-110 transition-all duration-300">
                    <img
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="font-semibold text-sm group-hover:text-primary transition-colors duration-300">{member.name}</h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Vision Statement */}
        <div 
          ref={visionRef.ref}
          className={`text-center bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-2xl p-8 relative overflow-hidden group hover:from-primary/20 hover:via-secondary/20 hover:to-primary/20 transition-all duration-500 transform ${
            visionRef.isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          <h3 className="text-xl md:text-2xl font-semibold mb-4 text-primary relative z-10 group-hover:scale-105 transition-transform duration-300">
            Our Vision
          </h3>
          <p className="text-muted-foreground max-w-3xl mx-auto relative z-10 group-hover:text-foreground transition-colors duration-300 leading-relaxed">
            To create a world where every home operates with maximum efficiency, minimal effort, 
            and complete peace of mind. Where technology serves humanity by making life simpler, 
            safer, and more sustainable.
          </p>
        </div>

        {/* Video Dialog */}
        <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
          <DialogContent className="max-w-4xl w-full p-0">
            <DialogHeader className="p-6 pb-2">
              <DialogTitle className="text-center">
                {features.find(f => f.video === selectedVideo)?.title} Demo
              </DialogTitle>
            </DialogHeader>
            {selectedVideo && (
              <div className="px-6 pb-6">
                <video
                  controls
                  autoPlay
                  className="w-full rounded-lg"
                  src={selectedVideo}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default About;