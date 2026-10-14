/**
 * Client and partner logos. Rendered on the homepage only when this list has
 * entries — add genuine, approved logos only (place files in /public/images/clients/).
 */
export interface ClientLogo {
  name: string;
  logo: { src: string; width: number; height: number };
  url?: string;
}

export const clients: ClientLogo[] = [];
