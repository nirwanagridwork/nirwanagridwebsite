import { useState } from 'react';
import { Mail, Instagram, Facebook, Send, Linkedin, Twitter, MessageCircle, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { z } from 'zod';

// Contact form validation schema
const contactSchema = z.object({
  name: z.string().trim().min(2, { message: "Name must be at least 2 characters" }).max(100, { message: "Name must be less than 100 characters" }),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255, { message: "Email must be less than 255 characters" }),
  phone: z.string().trim().min(10, { message: "Phone number must be at least 10 digits" }).max(15, { message: "Phone number must be less than 15 digits" }).regex(/^[+]?[\d\s()-]+$/, { message: "Invalid phone number format" }),
  subject: z.string().trim().min(5, { message: "Subject must be at least 5 characters" }).max(200, { message: "Subject must be less than 200 characters" }),
  queryType: z.string().min(1, { message: "Please select a query type" }),
  message: z.string().trim().min(10, { message: "Message must be at least 10 characters" }).max(1000, { message: "Message must be less than 1000 characters" })
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    queryType: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    try {
      contactSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create WhatsApp message with proper encoding
      const whatsappMessage = encodeURIComponent(
        `New Contact Form Submission:\n\n` +
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Phone: ${formData.phone}\n` +
        `Query Type: ${formData.queryType}\n` +
        `Subject: ${formData.subject}\n` +
        `Message: ${formData.message}`
      );
      
      // Open WhatsApp
      const whatsappUrl = `https://wa.me/917827092040?text=${whatsappMessage}`;
      window.open(whatsappUrl, '_blank');
      
      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        queryType: '',
        message: ''
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Support',
      value: 'support@nirwanagrid.com',
      href: 'mailto:support@nirwanagrid.com',
      color: 'text-primary'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      value: '+91 7827092040',
      href: 'tel:+917827092040',
      color: 'text-green-600'
    },
    {
      icon: MapPin,
      title: 'Office Location',
      value: 'Greater Noida, India',
      href: '#',
      color: 'text-blue-600'
    }
  ];

  const queryTypes = [
    'General Inquiry',
    'Product Information',
    'Technical Support',
    'Partnership Opportunity',
    'Installation Service',
    'Warranty Claim',
    'Feedback & Suggestions'
  ];

  const socialLinks = [
    {
      icon: Instagram,
      name: 'Instagram',
      href: 'https://www.instagram.com/nirwanagrid?igsh=azhlMGt1dHBkemMz',
      color: 'text-pink-500',
      hoverColor: 'hover:text-white',
      bgColor: 'bg-gradient-to-r from-pink-500/20 to-purple-500/20',
      hoverBg: 'hover:from-pink-500 hover:to-purple-500',
      borderColor: 'border-pink-500/50'
    },
    {
      icon: Facebook,
      name: 'Facebook',
      href: 'https://www.facebook.com/share/1DYicrLHEB/?mibextid=wwXIfr',
      color: 'text-blue-600',
      hoverColor: 'hover:text-white',
      bgColor: 'bg-gradient-to-r from-blue-600/20 to-blue-700/20',
      hoverBg: 'hover:from-blue-600 hover:to-blue-700',
      borderColor: 'border-blue-600/50'
    },
    {
      icon: Send,
      name: 'Telegram',
      href: 'https://t.me/NirwanaGrid',
      color: 'text-blue-500',
      hoverColor: 'hover:text-white',
      bgColor: 'bg-gradient-to-r from-blue-400/20 to-blue-600/20',
      hoverBg: 'hover:from-blue-400 hover:to-blue-600',
      borderColor: 'border-blue-500/50'
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/nirwanagrid-private-limited-8a6969381?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
      color: 'text-blue-700',
      hoverColor: 'hover:text-white',
      bgColor: 'bg-gradient-to-r from-blue-700/20 to-blue-800/20',
      hoverBg: 'hover:from-blue-700 hover:to-blue-800',
      borderColor: 'border-blue-700/50'
    },
    {
      icon: Twitter,
      name: 'X (Twitter)',
      href: 'https://x.com/nirwanagrid?s=11',
      color: 'text-foreground',
      hoverColor: 'hover:text-white',
      bgColor: 'bg-gradient-to-r from-foreground/20 to-foreground/30',
      hoverBg: 'hover:from-foreground hover:to-foreground/80',
      borderColor: 'border-foreground/50'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 animate-fade-in-up">
            Get In{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto animate-fade-in-up animate-delay-200">
            Ready to transform your home into a smart, efficient living space? 
            Contact us today and take the first step towards peaceful living.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="card-hover animate-fade-in-up">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <MessageCircle className="h-6 w-6 text-primary" />
                  Send Us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={errors.name ? 'border-red-500' : ''}
                        placeholder="Enter your full name"
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={errors.email ? 'border-red-500' : ''}
                        placeholder="Enter your email"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={errors.phone ? 'border-red-500' : ''}
                        placeholder="+91 99999 99999"
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <Label htmlFor="queryType">Query Type *</Label>
                      <Select value={formData.queryType} onValueChange={(value) => handleInputChange('queryType', value)}>
                        <SelectTrigger className={errors.queryType ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Select query type" />
                        </SelectTrigger>
                        <SelectContent>
                          {queryTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.queryType && <p className="text-red-500 text-sm mt-1">{errors.queryType}</p>}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className={errors.subject ? 'border-red-500' : ''}
                      placeholder="Brief subject of your inquiry"
                    />
                    {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className={errors.message ? 'border-red-500' : ''}
                      placeholder="Please provide detailed information about your inquiry..."
                      rows={5}
                    />
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending Message...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information and Social Media */}
          <div className="space-y-8">
            <div className="animate-fade-in-left">
              <h3 className="text-2xl font-semibold mb-6 text-primary">Contact Information</h3>
              
              {/* Contact Info */}
              <div className="space-y-4 mb-8">
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  return (
                    <Card key={info.title} className="card-hover">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 flex items-center justify-center">
                            <Icon className={`h-6 w-6 ${info.color}`} />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{info.title}</CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <a 
                          href={info.href}
                          className="text-muted-foreground hover:text-primary transition-colors duration-200"
                        >
                          {info.value}
                        </a>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Quick Response Promise */}
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-6 animate-fade-in-left animate-delay-300">
              <h4 className="font-semibold text-primary mb-2">Quick Response Guarantee</h4>
              <p className="text-sm text-muted-foreground">
                We typically respond to all inquiries within 24 hours. For urgent matters, 
                please call us directly or reach out via our social media channels.
              </p>
            </div>

            {/* Social Media */}
            <div className="animate-fade-in-right">
              <h3 className="text-3xl font-bold mb-6 animate-pulse">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Connect With Us
                </span>
              </h3>
              
              <div className="grid grid-cols-1 gap-4 mb-8">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex items-center gap-4 p-5 rounded-xl border-2 ${social.borderColor} ${social.bgColor} ${social.hoverBg} ${social.color} ${social.hoverColor} transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 animate-fade-in`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="relative">
                        <Icon className="h-7 w-7 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                        <div className="absolute inset-0 -z-10 rounded-full bg-current opacity-20 scale-150 transition-all duration-300 group-hover:scale-200 group-hover:opacity-30"></div>
                      </div>
                      <span className="font-semibold text-lg transition-all duration-300 group-hover:translate-x-1">
                        {social.name}
                      </span>
                      <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* Call to Action */}
              <Card className="relative overflow-hidden border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-background to-secondary/5 animate-fade-in-right animate-delay-400 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-pulse">
                    Ready to Get Started?
                  </CardTitle>
                  <CardDescription className="text-base">
                    Join thousands of satisfied customers who have transformed their homes with NirwanaGrid.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                      <Button 
                        className="btn-primary"
                        onClick={() => {
                          const productSection = document.getElementById('product');
                          if (productSection) {
                            productSection.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                      >
                        View Products
                      </Button>
                      <Button 
                        variant="outline" 
                        className="btn-outline" 
                        onClick={() => {
                          const subject = encodeURIComponent('Inquiry from Website');
                          const body = encodeURIComponent('Hello NirwanaGrid team,\n\nI am interested in your smart energy solutions. Please provide more information.\n\nBest regards,');
                          window.open(`mailto:support@nirwanagrid.com?subject=${subject}&body=${body}`, '_blank');
                        }}
                      >
                        Email Us
                      </Button>
                      <Button 
                        variant="secondary"
                        onClick={() => {
                          const message = encodeURIComponent('Hello! I am interested in NirwanaGrid smart energy solutions. Please provide more information.');
                          window.open(`https://wa.me/917827092040?text=${message}`, '_blank');
                        }}
                      >
                        WhatsApp Us
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                      Follow us on social media for the latest updates and smart home tips!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;