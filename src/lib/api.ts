import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';

export interface Banner {
  _id: string;
  title: string;
  image: string;
}

export interface Product {
  ID: string;
  title: string;
  image: string;
  price: number;
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // You can add token here if needed
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export async function getBanners(): Promise<Banner[]> {
  const res = await fetch(`${BASE_URL}/banners`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("خطا در دریافت بنرها");

  const data = await res.json();
  return data.data;
}

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products?limit=8`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("خطا در دریافت محصولات");

  const data = await res.json();
  const items: Product[] = data?.data.items;
  return items;
}

export const makeLoginOTP = (data : any) => apiClient.post('/make-login-otp', data);
export const verifyOTP = (data : any) => apiClient.post('/verify-otp', data);
export const login = (data : any) => apiClient.post('/login', data);
export const register = (data : any) => apiClient.post('/register', data);

export default apiClient;