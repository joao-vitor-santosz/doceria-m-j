export type ProductCategoryId = "brownies" | "brigadeiros";

export type ProductCategory = {
  id: ProductCategoryId;
  name: string;
  description: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: ProductCategoryId;
  imageSrc?: string;
};

export const productCategories: readonly ProductCategory[] = [
  {
    id: "brownies",
    name: "Brownies",
    description: "Massa macia, intensa e feita com muito carinho.",
  },
  {
    id: "brigadeiros",
    name: "Brigadeiros",
    description: "Pequenos doces para deixar o dia mais especial.",
  },
];

export const products: readonly Product[] = [
  {
    id: "brownie-brigadeiro",
    name: "Brownie de Brigadeiro",
    description: "Brownie de chocolate com cobertura cremosa de brigadeiro.",
    price: 9,
    categoryId: "brownies",
    imageSrc: brigadeiroImage,
  },
  {
    id: "brownie-simples",
    name: "Brownie Simples",
    description: "Nosso brownie tradicional, macio por dentro e cheio de chocolate.",
    price: 7,
    categoryId: "brownies",
  },
  {
    id: "brownie-ninho",
    name: "Brownie de Ninho",
    description: "Brownie de chocolate com uma generosa camada de creme de ninho.",
    price: 9,
    categoryId: "brownies",
    imageSrc: ninhoImage,
  },
  {
    id: "brownie-casadinho",
    name: "Brownie Casadinho",
    description: "A combinação perfeita de brigadeiro e ninho sobre o brownie.",
    price: 10,
    categoryId: "brownies",
    imageSrc: casadinhoImage,
  },
  {
    id: "brigadeiro-chocolate",
    name: "Brigadeiro de Chocolate",
    description: "Clássico, cremoso e finalizado com granulado de chocolate.",
    price: 3.5,
    categoryId: "brigadeiros",
  },
  {
    id: "brigadeiro-ninho",
    name: "Brigadeiro de Ninho",
    description: "Brigadeiro de leite ninho suave e delicado.",
    price: 3.5,
    categoryId: "brigadeiros",
  },
  {
    id: "brigadeiro-casadinho",
    name: "Brigadeiro Casadinho",
    description: "Dois sabores em um doce: brigadeiro e ninho.",
    price: 4,
    categoryId: "brigadeiros",
  },
];
import brigadeiroImage from "../assets/brigadeiro.jpeg";
import casadinhoImage from "../assets/casadinho.jpeg";
import ninhoImage from "../assets/ninho.jpeg";
