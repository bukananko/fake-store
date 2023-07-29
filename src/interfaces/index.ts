export interface ProductsProps {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating?: {
    count?: number;
    rate?: number;
  };
  title: string;
}

export interface CartProps {
  id: number;
  qty: number;
  title: string;
  price: number;
  image: string;
  selected?: boolean;
}

export interface OutletContextProps {
  cart: CartProps[];
  setCart: React.Dispatch<React.SetStateAction<CartProps[]>>;
}

export interface UserProps {
  isloggedin: boolean;
  password: string;
  username: string;
}
