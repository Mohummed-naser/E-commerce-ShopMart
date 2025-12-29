export default  interface WishlistItem {
  id: string;
  title: string;
  imageCover: string;
  price: number;
  category: { name: string };
}

export interface WishlistResponse {
  success: boolean;
  message: string;
  data: string[];
}