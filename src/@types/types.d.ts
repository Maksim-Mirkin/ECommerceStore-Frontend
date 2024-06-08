export type FC<P = object> = (props: P & { children?: ReactNode }) => ReactNode;

export interface Theme {
  isDark: boolean;
  toggleTheme: () => void;
}

export type InputFieldProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  name: Path<T>;
  pattern?: ValidationRule<RegExp> | undefined;
} & Omit<Omit<React.InputHTMLAttributes<HTMLInputElement>, "name">, "pattern">;

export type AutoExpandingTextareaProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  name: Path<T>;
} & Omit<
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "name">,
  "pattern"
>;

export interface AuthContextType {
  isLoggedIn: boolean;
  jwt?: string | null;
  login: (jwt: string) => void;
  logout: () => void;
  user: User | null;
  isAdmin: boolean;
}

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
};

export type LoginRequest = {
  username: string;
  password: string;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  brand: string;
  description: string;
  image: string;
  memory: string;
  screenSize: string;
  batteryCapacity: string;
  operatingSystem: string;
  color: string;
  averageRating: string;
  createdAt: string;
  updatedAt: string;
  category: string;
};

export type Page = {
  totalItems: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  isFirst: boolean;
  isLast: boolean;
};

export type OrderPage = Page & {
  orders: Array<Order>;
};

export type ProductPage = Page & {
  products: Array<Product>;
};

export type OrderSortByType = "id" | "createdAt" | "status" | "totalPrice";

export type ProductSortByType =
  | "id"
  | "name"
  | "price"
  | "brand"
  | "memory"
  | "screenSize"
  | "batteryCapacity"
  | "operatingSystem"
  | "color"
  | "ratings";

export type SortByType = ProductSortByType | OrderSortByType;

export interface PaginationParams {
  pageNumber?: number;
  pageSize?: number;
  sortDir?: "asc" | "desc";
  sortBy?: SortByType;
}

export type ProductFilterOption = {
  brands: string[];
  prices: number[];
  colors: string[];
  memories: string[];
  screenSizes: string[];
  batteryCapacities: string[];
  operatingSystems: string[];
  categories: string[];
};

export interface ProductParams {
  name?: string;
  brand?: string[];
  minPrice?: number;
  maxPrice?: number;
  color?: string[];
  memory?: string[];
  screenSize?: string[];
  batteryCapacity?: string[];
  operatingSystem?: string[];
  category?: string[];
}

export interface ProductFilterParams {
  name?: string;
  brand?: string[];
  color?: string[];
  memory?: string[];
  screenSize?: string[];
  batteryCapacity?: string[];
  operatingSystem?: string[];
  category?: string[];
}

export type User = {
  id: number;
  username: string;
  email: string;
  userImage: string;
  roles: { id: number; roleName: string }[];
};

export type ChangePasswordRequest = {
  username: string;
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export type UpdateUserDataRequest = {
  oldUsername: string;
  newUsername: string;
  email: string;
  userImage: string;
};

export type ProductRequest = {
  name: string;
  price: number;
  brand: string;
  description: string;
  image: string;
  category: string;
  memory: string;
  screenSize: string;
  batteryCapacity: string;
  operatingSystem: string;
  color: string;
};

export type OrderRequest = {
  orderItems: { productId: number; quantity: number }[];
  address: string;
  city: string;
  postalCode: string;
  phoneNumber: string;
  paymentInformation: string;
};

export type Order = {
  id: number;
  customer: User;
  createdAt: string;
  updatedAt: string;
  totalPrice: number;
  items: CartItem[];
  address: string;
  city: string;
  postalCode: string;
  phoneNumber: string;
  paymentInformation: string;
  status: string;
};

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  subTotal: number;
}

export interface OrderList {
  orders: OrderPage;
  navigateToOrder: (id: string, order: Order) => void;
}

export type StatusRequest = {
  orderId: number;
  status: Status;
};

export type RatingRequest = {
  productId: number;
  rating: string;
};

export type SortInput = {
  id: string;
  label: string;
};
