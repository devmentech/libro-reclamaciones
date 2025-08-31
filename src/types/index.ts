export type ProductDTO = {
  id: string | number;
  name: string;
};

export type ProductsResponseDTO = {
  products: ProductDTO[];
};

export type ComplaintsFormConfig = {
  companyName: string;
  formTitle: string;
  formSubtitle: string;
  currency: {
    symbol: string;
    name: string;
  };
  responseTime: number;
  recaptcha: {
    enabled: boolean;
    siteKey: string;
  };
  productsEndpoint?: string;
  products?: ProductDTO[];
};

export type ComplaintFormData = {
  fullName: string;
  address: string;
  id: string;
  phone: string;
  email: string;
  isMinor: boolean;
  guardian?: string;
  productId: string;
  amount: number;
  incidentDate: Date;
  type: 'reclamo' | 'queja';
  details: string;
  request: string;
  signature?: string;
};
