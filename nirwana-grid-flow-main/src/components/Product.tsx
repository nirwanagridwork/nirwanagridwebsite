import { useState } from 'react';
import { Home, Building2, MapPin, Check, Plus, Minus, Server, Receipt, Calendar, Users, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Product = () => {
  const { toast } = useToast();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [additionalAppliances, setAdditionalAppliances] = useState(0);
  const [showReceipt, setShowReceipt] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    notes: ''
  });

  const packages = [
    {
      id: 'home',
      title: 'Home Package',
      description: 'Perfect for residential smart home automation',
      icon: Home,
      iconBg: 'bg-gradient-to-br from-blue-500 to-blue-700',
      basePrice: 10000,
      additionalPrice: 2000,
      features: [
        'Smart energy monitoring',
        'Mobile app control', 
        'Safety features included',
        '1-year warranty'
      ],
      highlight: '5 Switch Boards Included',
      highlightIcon: Check
    },
    {
      id: 'industry',
      title: 'Industry Package',
      description: 'Enterprise solution with local server',
      icon: Building2,
      iconBg: 'bg-gradient-to-br from-green-500 to-green-700',
      basePrice: 20000,
      features: [
        'Local server infrastructure',
        'Enterprise-grade security',
        'Advanced analytics',
        '24/7 support'
      ],
      highlight: 'Local Server Included',
      highlightIcon: Server
    }
  ];

  const calculateTotalPrice = () => {
    const selectedPkg = packages.find(p => p.id === selectedPackage);
    if (!selectedPkg) return 0;
    
    if (selectedPackage === 'home') {
      return selectedPkg.basePrice + (additionalAppliances * selectedPkg.additionalPrice);
    }
    return selectedPkg.basePrice;
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitAddress = () => {
    // Validate required fields
    if (!formData.fullName || !formData.phone || !formData.address || !formData.city) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    const selectedPkg = packages.find(p => p.id === selectedPackage);
    const totalCost = calculateTotalPrice();
    const orderId = `NG${Date.now()}`;
    
    // Store order data
    setOrderData({
      orderId,
      package: selectedPkg,
      additionalAppliances,
      totalCost,
      customerInfo: formData,
      orderDate: new Date().toLocaleDateString()
    });
    
    setShowReceipt(true);
    
    toast({
      title: "Order Confirmed!",
      description: "Your installation has been scheduled.",
    });
  };

  const handleBackToPackages = () => {
    setSelectedPackage(null);
    setAdditionalAppliances(0);
    setShowReceipt(false);
    setOrderData(null);
  };

  const handleNewOrder = () => {
    setSelectedPackage(null);
    setAdditionalAppliances(0);
    setShowReceipt(false);
    setOrderData(null);
    setFormData({
      fullName: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      notes: ''
    });
  };

  // Receipt Page
  if (showReceipt && orderData) {
    return (
      <section id="product" className="py-20 bg-muted/30 min-h-screen">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card border border-border rounded-3xl shadow-2xl p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center shadow-lg">
                <Receipt className="h-8 w-8 text-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Order Receipt</h2>
              <p className="text-muted-foreground">Your order has been confirmed successfully!</p>
            </div>

            {/* Order Details */}
            <div className="space-y-6">
              {/* Order ID */}
              <div className="bg-gray-700/50 border border-gray-600 rounded-xl p-4">
                <div className="text-center">
                  <p className="text-gray-300 text-sm">Order ID</p>
                  <p className="text-white font-mono text-lg">{orderData.orderId}</p>
                  <p className="text-gray-400 text-sm mt-1">Order Date: {orderData.orderDate}</p>
                </div>
              </div>

              {/* Package Details */}
              <div className="bg-gray-700/50 border border-gray-600 rounded-xl p-4">
                <h3 className="text-white font-semibold mb-3">Package Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Package:</span>
                    <span className="text-white">{orderData.package.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Base Price:</span>
                    <span className="text-white">₹{orderData.package.basePrice.toLocaleString()}</span>
                  </div>
                  {orderData.additionalAppliances > 0 && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Additional Appliances:</span>
                        <span className="text-white">{orderData.additionalAppliances} × ₹{orderData.package.additionalPrice?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Additional Cost:</span>
                        <span className="text-white">₹{(orderData.additionalAppliances * (orderData.package.additionalPrice || 0)).toLocaleString()}</span>
                      </div>
                    </>
                  )}
                  <div className="border-t border-gray-600 pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span className="text-gray-200">Total Amount:</span>
                      <span className="text-secondary text-xl">₹{orderData.totalCost.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Details */}
              <div className="bg-gray-700/50 border border-gray-600 rounded-xl p-4">
                <h3 className="text-white font-semibold mb-3">Customer Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Name:</span>
                    <span className="text-white">{orderData.customerInfo.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Phone:</span>
                    <span className="text-white">{orderData.customerInfo.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">City:</span>
                    <span className="text-white">{orderData.customerInfo.city}</span>
                  </div>
                </div>
              </div>

              {/* Installation Timeline */}
              <div className="bg-gray-700/50 border border-gray-600 rounded-xl p-4">
                <h3 className="text-white font-semibold mb-4">Installation Timeline</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                      <Users className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Survey Team Visit</p>
                      <p className="text-gray-300 text-sm">Day 1: Site survey and measurement</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Installation Team</p>
                      <p className="text-gray-300 text-sm">Day 2: Complete installation</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Feedback Team</p>
                      <p className="text-gray-300 text-sm">Within 2 days after installation</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gradient-to-r from-cyan-500/10 to-green-500/10 border border-cyan-500/20 rounded-xl p-4">
                <h3 className="text-white font-semibold mb-3">Need Help?</h3>
                <div className="space-y-2">
                  <p className="text-gray-300 text-sm">Our team will contact you within 24 hours to schedule the survey.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Support:</span>
                    <span className="text-cyan-400">+91 7827092040</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Office:</span>
                    <span className="text-cyan-400">Greater Noida, India</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  onClick={handleNewOrder}
                  className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white border-0"
                >
                  Place New Order
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (selectedPackage) {
    const selectedPkg = packages.find(p => p.id === selectedPackage);
    
    return (
      <section id="product" className="py-20 bg-gray-900 min-h-screen">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-800 border border-gray-700 rounded-3xl shadow-2xl p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Installation Address</h2>
              <p className="text-gray-300">Provide your address for installation scheduling</p>
            </div>

            {/* Selected Package Summary */}
            <div className="bg-gray-700/50 border border-gray-600 rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-200 font-medium">Selected: {selectedPkg?.title}</span>
              </div>
              
              {selectedPackage === 'home' && (
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-200">Additional Appliances:</span>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full bg-gray-600 border-gray-500 text-white hover:bg-gray-500"
                      onClick={() => setAdditionalAppliances(Math.max(0, additionalAppliances - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-medium text-white">{additionalAppliances}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full bg-gray-600 border-gray-500 text-white hover:bg-gray-500"
                      onClick={() => setAdditionalAppliances(additionalAppliances + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
              
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  Total Cost: ₹{calculateTotalPrice().toLocaleString()}
                </div>
              </div>
            </div>

            {/* Address Form */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName" className="text-gray-200 font-medium">Full Name *</Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => handleFormChange('fullName', e.target.value)}
                    className="mt-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-gray-200 font-medium">Phone Number *</Label>
                  <Input
                    id="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => handleFormChange('phone', e.target.value)}
                    className="mt-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address" className="text-gray-200 font-medium">Complete Address *</Label>
                <Textarea
                  id="address"
                  placeholder="Enter your complete address"
                  rows={4}
                  value={formData.address}
                  onChange={(e) => handleFormChange('address', e.target.value)}
                  className="mt-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city" className="text-gray-200 font-medium">City *</Label>
                  <Input
                    id="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => handleFormChange('city', e.target.value)}
                    className="mt-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <Label htmlFor="state" className="text-gray-200 font-medium">State</Label>
                  <Input
                    id="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={(e) => handleFormChange('state', e.target.value)}
                    className="mt-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <Label htmlFor="pincode" className="text-gray-200 font-medium">Pincode</Label>
                  <Input
                    id="pincode"
                    placeholder="Pincode"
                    value={formData.pincode}
                    onChange={(e) => handleFormChange('pincode', e.target.value)}
                    className="mt-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="notes" className="text-gray-200 font-medium">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any special instructions or requirements"
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => handleFormChange('notes', e.target.value)}
                  className="mt-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  variant="outline"
                  onClick={handleBackToPackages}
                  className="flex-1 py-3 bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                >
                  Back to Packages
                </Button>
                <Button
                  onClick={handleSubmitAddress}
                  className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white border-0"
                >
                  Submit Address
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="product" className="py-20 bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Our{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
              Product Packages
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Choose the perfect smart energy solution for your needs - whether it's your home 
            or industrial facility.
          </p>
        </div>

        {/* Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {packages.map((pkg) => {
            const Icon = pkg.icon;
            const HighlightIcon = pkg.highlightIcon;
            
            return (
              <Card key={pkg.id} className="bg-gray-800 border border-gray-700 shadow-2xl rounded-3xl overflow-hidden hover:shadow-cyan-500/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-gray-600">
                <CardHeader className="text-center pb-6">
                  <div className={`w-20 h-20 mx-auto rounded-3xl ${pkg.iconBg} flex items-center justify-center mb-6 shadow-lg`}>
                    <Icon className="h-10 w-10 text-foreground" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-foreground mb-2">{pkg.title}</CardTitle>
                  <CardDescription className="text-gray-300 text-base">{pkg.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Highlight Feature */}
                  <div className="flex items-center gap-3 text-gray-200">
                    <div className="w-5 h-5 rounded-full bg-green-900/50 border border-green-500 flex items-center justify-center flex-shrink-0">
                      <HighlightIcon className="h-3 w-3 text-green-400" />
                    </div>
                    <span className="font-medium">{pkg.highlight}</span>
                  </div>

                  {/* Pricing */}
                  <div className="text-center py-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-2xl">💰</span>
                      <span className="text-lg font-medium text-gray-200">
                        {pkg.id === 'home' ? 'Base Price:' : 'Basic Package:'}
                      </span>
                      <span className="text-2xl font-bold text-foreground">₹{pkg.basePrice.toLocaleString()}</span>
                    </div>
                    {pkg.id === 'home' && (
                      <p className="text-gray-400 text-sm">
                        Additional appliances: ₹{pkg.additionalPrice.toLocaleString()} per appliance
                      </p>
                    )}
                    {pkg.id === 'industry' && (
                      <p className="text-gray-400 text-sm">Complete industrial automation solution</p>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-gray-200">
                        <div className="w-5 h-5 rounded-full bg-green-900/50 border border-green-500 flex items-center justify-center flex-shrink-0">
                          <Check className="h-3 w-3 text-green-400" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Select Button */}
                  <Button
                    onClick={() => setSelectedPackage(pkg.id)}
                    className="w-full py-4 text-lg font-medium bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-primary-foreground border-0 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-primary/25"
                  >
                    Select {pkg.title}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center">
                  <svg className="w-6 h-6 text-foreground" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">Phone Support</h3>
                  <p className="text-gray-300 text-lg">+91 7827092040</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">Office Location</h3>
                  <p className="text-gray-300 text-lg">Greater Noida, India</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Product;