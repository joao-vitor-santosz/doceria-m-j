export type ProductCategoryId = "brownies" | "brigadeiros";

export type ProductCategory = {
  id: ProductCategoryId;
  name: string;
  description: string;
};

export type ProductOption = {
  id: string;
  label: string;
  description?: string;
  price: number;
};

export type ProductOptionGroup = {
  id: string;
  title: string;
  description?: string;
  required?: boolean;
  selectionMode: "single" | "multiple" | "quantity";
  minimumQuantity?: number;
  maximumQuantity?: number;
  options: readonly ProductOption[];
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: ProductCategoryId;
  imageSrc?: string;
  customizationGroups?: readonly ProductOptionGroup[];
};

const brownieAddOns: ProductOptionGroup = {
  id: "brownie-add-ons",
  title: "Personalize seu brownie",
  description: "Adicione seus acompanhamentos favoritos.",
  selectionMode: "multiple",
  options: [
    { id: "strawberry", label: "Adicionar morango", price: 3 },
    { id: "kit-kat", label: "Adicionar Kit Kat", price: 2.5 },
  ],
};

const brigadeiroFlavorOptions: readonly ProductOption[] = [
  { id: "brigadeiro", label: "Brigadeiro", description: "Sabor chocolate", price: 0 },
  { id: "ninho", label: "Ninho", price: 0 },
  { id: "casadinho", label: "Casadinho", description: "Chocolate e ninho", price: 0 },
  { id: "beijinho", label: "Beijinho", price: 0 },
];

const brigadeiroBoxFlavors: ProductOptionGroup = {
  id: "brigadeiro-box-flavors",
  title: "Monte sua caixinha",
  description: "Escolha 4 brigadeiros. Você pode repetir ou misturar os sabores.",
  selectionMode: "quantity",
  minimumQuantity: 4,
  maximumQuantity: 4,
  options: brigadeiroFlavorOptions,
};

const brigadeiroPartyFlavors: ProductOptionGroup = {
  id: "brigadeiro-party-flavors",
  title: "Monte o seu cento",
  description: "Divida 100 brigadeiros entre os sabores que preferir.",
  selectionMode: "quantity",
  minimumQuantity: 100,
  maximumQuantity: 100,
  options: brigadeiroFlavorOptions,
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
    customizationGroups: [brownieAddOns],
  },
  {
    id: "brownie-simples",
    name: "Brownie Simples",
    description: "Nosso brownie tradicional, macio por dentro e cheio de chocolate.",
    price: 7,
    categoryId: "brownies",
    customizationGroups: [brownieAddOns],
  },
  {
    id: "brownie-ninho",
    name: "Brownie de Ninho",
    description: "Brownie de chocolate com uma generosa camada de creme de ninho.",
    price: 9,
    categoryId: "brownies",
    imageSrc: ninhoImage,
    customizationGroups: [brownieAddOns],
  },
  {
    id: "brownie-casadinho",
    name: "Brownie Casadinho",
    description: "A combinação perfeita de brigadeiro e ninho sobre o brownie.",
    price: 10,
    categoryId: "brownies",
    imageSrc: casadinhoImage,
    customizationGroups: [brownieAddOns],
  },
  {
    id: "brigadeiro-caixinha",
    name: "Caixinha com 4 Brigadeiros",
    description: "Monte sua caixinha com até quatro sabores diferentes.",
    price: 9,
    categoryId: "brigadeiros",
    customizationGroups: [brigadeiroBoxFlavors],
  },
  {
    id: "brigadeiro-festa",
    name: "Cento de Brigadeiros para Festa",
    description: "100 brigadeiros para adoçar a sua comemoração, do seu jeito.",
    price: 170,
    categoryId: "brigadeiros",
    customizationGroups: [brigadeiroPartyFlavors],
  },
];
import brigadeiroImage from "../assets/brigadeiro.jpeg";
import casadinhoImage from "../assets/casadinho.jpeg";
import ninhoImage from "../assets/ninho.jpeg";
