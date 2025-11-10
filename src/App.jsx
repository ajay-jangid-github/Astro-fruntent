import { useState, useEffect } from 'react';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Frontmaster from './Front/component/Frontmaster';
import Home from './Front/pages/Home';
import About from './Front/pages/About';
import Photogallery from './Front/pages/Photogallery';
import Press from './Front/pages/Press';
import Product from './Front/pages/Product';
import Astrologyblog from './Front/pages/Astrologyblog';
import Inquiryform from './Front/pages/Inquiryform';
import ScrollToTop from './Front/component/Scrolltop';
import PopupModal from './Front/pages/Popup';
import JAp from './Front/pages/JAp';
import Yagya from './Front/pages/Yagya';
import Newborn from './Front/pages/Newborn';
import Drishti from './Front/pages/Drishti';
import Mantra from './Front/pages/Mantra';
import Pooja from './Front/pages/Pooja';
import Vastu from './Front/pages/Vastu';
import Stonechart from './Front/pages/Stonechart';
import Astrologyconsultation from './Front/pages/Astrologyconsultation';
import Cart from './Front/pages/cart';
import Paymentway from './Front/pages/Payment';
import Orders from './Front/pages/Orders';
import Kundali from './Front/pages/Kundali';
import KundliPayment from './Front/pages/KundliPayment';
import KundliGenerate from './Front/pages/KundliGenerate';
import MyKundlis from './Front/pages/MyKundlis';
import Signup from './Front/pages/Signup';
import Login from './Front/pages/Login';

// Dashboard Components
import AdminDashboard from './front copy/components/AdminDashboard';
import UserDashboard from './front copy/components/UserDashboard';
import UserDashboardHome from './front copy/pages/UserDashboardHome';
import UserCart from './front copy/pages/UserCart';
import UserOrders from './front copy/pages/UserOrders';
import UserKundlis from './front copy/pages/UserKundlis';
import DashboardOverview from './front copy/pages/DashboardOverview';
import Dashbooardblog from './front copy/pages/Dashbooardblog';
import Productdashboard from './front copy/pages/Productdashboard';
import DashboardOrders from './front copy/pages/DashboardOrders';
import Gallery from './front copy/pages/Gallery';
import IndexForm from './front copy/pages/indexfrom';
import Blogfrom from './front copy/pages/Blogfrom';
import AddProduct from './front copy/pages/AddProduct';
import AddPhoto from './front copy/pages/AddPhoto';
import DashboardInquiries from './front copy/pages/DashboardInquiries';
import AdminKundlis from './front copy/components/AdminKundlis';
import AdminUsers from './front copy/components/AdminUsers';
import RoleBasedRoute from './components/RoleBasedRoute';

function App() {
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);

  // Clear navigation flag on app start (page refresh)
  useEffect(() => {
    const isPageRefresh = performance.getEntriesByType('navigation')[0]?.type === 'reload';
    if (isPageRefresh) {
      sessionStorage.removeItem('hasNavigatedInApp');
    }
  }, []);

  useEffect(() => {
    // Only show popup on home page
    if (location.pathname === '/') {
      // Check if we navigated here from another page in this session
      const hasNavigated = sessionStorage.getItem('hasNavigatedInApp');
      
      if (!hasNavigated) {
        // This is a fresh page load/refresh
        const timer = setTimeout(() => {
          setShowPopup(true);
        }, 5000);
        
        return () => clearTimeout(timer);
      }
    } else {
      // Mark that user has navigated within the app
      sessionStorage.setItem('hasNavigatedInApp', 'true');
      setShowPopup(false);
    }
  }, [location.pathname]);

  // Make hidePopup function available globally
  useEffect(() => {
    window.hidePopup = () => setShowPopup(false);
    return () => {
      delete window.hidePopup;
    };
  }, []);

  return (
    <CartProvider>
      <ScrollToTop />

      {showPopup && <PopupModal />}

      <Routes>
        {/* Frontend Routes */}
        <Route path='/' element={<Frontmaster />}>
          <Route index element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path='knowmore' element={<About />} />
          <Route path='gallery' element={<Photogallery />} />
          <Route path='Press' element={<Press />} />
          <Route path='product' element={<Product />} />
          <Route path='Blog' element={<Astrologyblog />} />
          <Route path='inquiryform' element={<Inquiryform />} />
          <Route path='astrologyconsultation' element={<Astrologyconsultation />} />
          <Route path='jap' element={<JAp />} />
          <Route path='yagya' element={<Yagya />} />
          <Route path='newbornastrology' element={<Newborn />} />
          <Route path='drishti' element={<Drishti />} />
          <Route path='mantrahealing' element={<Mantra />} />
          <Route path='poojaservice' element={<Pooja />} />
          <Route path='vastushastra' element={<Vastu />} />
          <Route path='luckystonechart' element={<Stonechart />} />
          <Route path='payment' element={<Paymentway />} />
          <Route path='orders' element={<Orders />} />
          <Route path='kundli' element={<Kundali />} />
          <Route path='kundli-payment' element={<KundliPayment />} />
          <Route path='kundli-generate' element={<KundliGenerate />} />
          <Route path='my-kundlis' element={<MyKundlis />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Signup />} />
        </Route>
        
        {/* User Dashboard Routes */}
        <Route 
          path='/user-dashboard' 
          element={
            <RoleBasedRoute allowedRoles={['user']}>
              <UserDashboard />
            </RoleBasedRoute>
          }
        >
          <Route index element={<UserDashboardHome />} />
          <Route path='cart' element={<UserCart />} />
          <Route path='orders' element={<UserOrders />} />
          <Route path='kundlis' element={<UserKundlis />} />
        </Route>
        
        {/* Admin Dashboard Routes */}
        <Route 
          path='/admin-dashboard' 
          element={
            <RoleBasedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </RoleBasedRoute>
          }
        >
          <Route index element={<DashboardOverview />} />
          <Route path='blogs' element={<Dashbooardblog />} />
          <Route path='products' element={<Productdashboard />} />
          <Route path='orders' element={<DashboardOrders />} />
          <Route path='gallery' element={<Gallery />} />
          <Route path='add-blog' element={<Blogfrom />} />
          <Route path='add-product' element={<AddProduct />} />
          <Route path='add-photo' element={<AddPhoto />} />
          <Route path='contact-forms' element={<IndexForm />} />
        </Route>
        
        {/* Legacy dashboard route */}
        <Route 
          path='/dashboard' 
          element={
            <RoleBasedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </RoleBasedRoute>
          }
        >
          <Route index element={<DashboardOverview />} />
          <Route path='blogs' element={<Dashbooardblog />} />
          <Route path='products' element={<Productdashboard />} />
          <Route path='orders' element={<DashboardOrders />} />
          <Route path='inquiries' element={<DashboardInquiries />} />
          <Route path='users' element={<AdminUsers />} />
          <Route path='kundlis' element={<AdminKundlis />} />
          <Route path='gallery' element={<Gallery />} />
          <Route path='add-blog' element={<Blogfrom />} />
          <Route path='add-product' element={<AddProduct />} />
          <Route path='add-photo' element={<AddPhoto />} />
          <Route path='contact-forms' element={<IndexForm />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}

export default App;