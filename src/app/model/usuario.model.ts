// user.model.ts
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  telephones: Telephone[];
  addresses: Address[];
}

// telephone.model.ts
export interface Telephone {
  id?: number;
  codeCountry: string;
  codeState: string;
  number: string;
}

// address.model.ts
export interface Address {
  id?: number;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
}
