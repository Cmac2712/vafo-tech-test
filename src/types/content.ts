export type Crumb = {
  label: string;
  href: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
};

export type PdpContent = {
  title: string;
  price: number;
  comparePrice?: number;
  points?: number;
  description: string;
  highlights: string[];
  breadcrumbs: Crumb[];
  images: GalleryImage[];
};
