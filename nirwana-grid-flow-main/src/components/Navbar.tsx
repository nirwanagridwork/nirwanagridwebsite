import { useState } from 'react';
import { Menu, X, ShoppingCart, User, Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';


interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

const Navbar = ({ activeSection, setActiveSection }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = [
    { name: 'Home', section: 'home' },
    { name: 'About', section: 'about' },
    { name: 'Product', section: 'product' },
    { name: 'Tech', section: 'tech' },
    { name: 'Contact', section: 'contact' },
  ];

  const handleNavClick = (section: string) => {
    setActiveSection(section);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateCartItemQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCartItems(items => items.filter(item => item.id !== id));
    } else {
      setCartItems(items => 
        items.map(item => 
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeFromCart = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleLogin = () => {
    if (email && password) {
      setIsLoggedIn(true);
      setEmail('');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-background/45 backdrop-blur-md z-50 border-b border-border/45">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-start items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            {/* Logo removed */}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 ml-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.section)}
                className={`relative text-foreground font-semibold text-lg cursor-pointer px-4 py-2 rounded-lg transition-all duration-300 group overflow-hidden
                  before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-gray-800/0 before:via-gray-600/30 before:to-gray-800/0 
                  before:translate-x-[-100%] before:transition-transform before:duration-500 before:ease-out
                  hover:before:translate-x-[100%] hover:before:duration-700
                  after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/10 after:to-transparent 
                  after:translate-x-[-100%] after:transition-transform after:duration-300 after:delay-200
                  hover:after:translate-x-[100%] hover:after:duration-500
                  hover:text-white hover:bg-gray-700/20 hover:shadow-lg hover:shadow-gray-500/25 hover:scale-105 transform
                  ${activeSection === item.section ? 'text-primary bg-gray-700/30 shadow-md shadow-gray-500/20' : ''}
                `}
              >
                <span className="relative z-10">{item.name}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/20 via-gray-700/40 to-gray-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-3 ml-auto">
            {/* Cart Sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-foreground hover:text-foreground hover:bg-accent">
                  <ShoppingCart className="h-5 w-5" />
                  {getTotalItems() > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs bg-primary text-primary-foreground">
                      {getTotalItems()}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-96 bg-background text-foreground">
                <SheetHeader>
                  <SheetTitle className="text-foreground">Shopping Cart</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {cartItems.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">Your cart is empty</p>
                  ) : (
                    <>
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between border-b pb-4">
                            <div className="flex-1">
                              <h4 className="font-medium text-foreground">{item.name}</h4>
                              <p className="text-muted-foreground">${item.price}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                              <span className="w-8 text-center text-foreground">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => removeFromCart(item.id)}
                              className="h-8 w-8 p-0 ml-2"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                        <div className="border-t pt-4">
                          <div className="flex justify-between font-semibold text-lg text-foreground">
                            <span>Total: ${getTotalPrice()}</span>
                          </div>
                          <Button className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary-dark">
                          Checkout
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            {/* Account Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground hover:text-foreground hover:bg-accent">
                  <User className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-background text-foreground">
                <DialogHeader>
                  <DialogTitle className="text-foreground">
                    {isLoggedIn ? 'Account' : 'Login'}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {isLoggedIn ? (
                    <div className="space-y-4">
                        <p className="text-foreground">Welcome back!</p>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start">
                          Profile Settings
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          Order History
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          Preferences
                        </Button>
                      </div>
                      <Button 
                        onClick={handleLogout}
                        variant="destructive" 
                        className="w-full"
                      >
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                        <div>
                          <Label htmlFor="email" className="text-foreground">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-background border-border text-foreground"
                          />
                      </div>
                        <div>
                          <Label htmlFor="password" className="text-foreground">Password</Label>
                          <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-background border-border text-foreground"
                          />
                      </div>
                      <Button 
                          onClick={handleLogin}
                          className="w-full bg-primary text-primary-foreground hover:bg-primary-dark"
                      >
                        Login
                      </Button>
                        <p className="text-sm text-muted-foreground text-center">
                          Don't have an account? <span className="text-primary cursor-pointer">Sign up</span>
                        </p>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Mobile menu button and logo */}
          <div className="md:hidden flex items-center justify-between w-full">
            {/* Logo removed */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="hover:bg-accent"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-b border-border">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.section)}
                className={`block w-full text-left px-3 py-2 rounded-md font-medium transition-all duration-300 relative group overflow-hidden
                  before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-gray-800/0 before:via-gray-600/30 before:to-gray-800/0 
                  before:translate-x-[-100%] before:transition-transform before:duration-500 before:ease-out
                  hover:before:translate-x-[100%] hover:before:duration-700
                  after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/10 after:to-transparent 
                  after:translate-x-[-100%] after:transition-transform after:duration-300 after:delay-200
                  hover:after:translate-x-[100%] hover:after:duration-500
                  hover:text-white hover:bg-gray-700/20 hover:shadow-lg hover:shadow-gray-500/25 hover:scale-105 transform
                  ${activeSection === item.section ? 'text-primary bg-gray-700/30 shadow-md shadow-gray-500/20' : 'text-foreground'}
                `}
              >
                <span className="relative z-10">{item.name}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/20 via-gray-700/40 to-gray-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            ))}
            <div className="flex space-x-3 px-3 py-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative text-foreground hover:text-foreground hover:bg-accent">
                    <ShoppingCart className="h-5 w-5" />
                    {getTotalItems() > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs bg-primary text-primary-foreground">
                        {getTotalItems()}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-96 bg-background text-foreground">
                  <SheetHeader>
                    <SheetTitle className="text-foreground">Shopping Cart</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    {cartItems.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">Your cart is empty</p>
                    ) : (
                      <>
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex items-center justify-between border-b pb-4">
                              <div className="flex-1">
                                <h4 className="font-medium text-foreground">{item.name}</h4>
                              <p className="text-muted-foreground">${item.price}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                                className="h-8 w-8 p-0"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center text-foreground">{item.quantity}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                                className="h-8 w-8 p-0"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => removeFromCart(item.id)}
                                className="h-8 w-8 p-0 ml-2"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                          <div className="border-t pt-4">
                            <div className="flex justify-between font-semibold text-lg text-foreground">
                              <span>Total: ${getTotalPrice()}</span>
                            </div>
                            <Button className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary-dark">
                            Checkout
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-foreground hover:text-foreground hover:bg-accent">
                    <User className="h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-background text-foreground">
                  <DialogHeader>
                    <DialogTitle className="text-foreground">
                      {isLoggedIn ? 'Account' : 'Login'}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    {isLoggedIn ? (
                      <div className="space-y-4">
                        <p className="text-foreground">Welcome back!</p>
                        <div className="space-y-2">
                          <Button variant="outline" className="w-full justify-start">
                            Profile Settings
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            Order History
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            Preferences
                          </Button>
                        </div>
                        <Button 
                          onClick={handleLogout}
                          variant="destructive" 
                          className="w-full"
                        >
                          Logout
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                          <div>
                            <Label htmlFor="email" className="text-foreground">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="Enter your email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="bg-background border-border text-foreground"
                            />
                        </div>
                          <div>
                            <Label htmlFor="password" className="text-foreground">Password</Label>
                            <Input
                              id="password"
                              type="password"
                              placeholder="Enter your password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="bg-background border-border text-foreground"
                            />
                        </div>
                        <Button 
                          onClick={handleLogin}
                            className="w-full bg-primary text-primary-foreground hover:bg-primary-dark"
                        >
                          Login
                        </Button>
                          <p className="text-sm text-muted-foreground text-center">
                            Don't have an account? <span className="text-primary cursor-pointer">Sign up</span>
                          </p>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;