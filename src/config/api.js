// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://astrology-8oek.onrender.com';

export const API_ENDPOINTS = {
  BLOG: `${API_BASE_URL}/api/blog`,
  PRODUCT: `${API_BASE_URL}/api/product`,
  PHOTO: `${API_BASE_URL}/api/photo`,
  AUTH: `${API_BASE_URL}/api/auth`,
  CONTACT: `${API_BASE_URL}/api/contact`,
  PAYMENT: `${API_BASE_URL}/api/payment`,
  CART: `${API_BASE_URL}/api/cart`,
  ORDERS: `${API_BASE_URL}/api/orders`,
  KUNDLI: `${API_BASE_URL}/api/kundli`,
  ADMIN: `${API_BASE_URL}/api/admin`
};

export default API_BASE_URL;