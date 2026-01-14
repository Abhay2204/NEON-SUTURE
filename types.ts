export interface Product {
  id: string;
  name: string;
  collection: string;
  price: string;
  image: string;
  description: string;
  details: string[];
}

export interface MaterialSpec {
  id: string;
  title: string;
  description: string;
  chemical_formula?: string;
  properties: string[];
}

export interface ArchiveItem {
  id: string;
  year: string;
  code: string;
  name: string;
  image: string;
  specs: {
    weight: string;
    origin: string;
    composition: string;
  };
}
