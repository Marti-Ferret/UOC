export interface Article {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  isOnSale: boolean;
  
  quantityInCart: number;
}

export interface ArticleQuantityChange {
  article: Article;
  quantity: number;
}
