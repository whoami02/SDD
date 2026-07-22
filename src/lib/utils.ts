import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function resolveAssetUrl(path: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  
  // Normalize paths from markdown stubs pointing to relative GSDD img directory
  let cleanPath = path;
  if (cleanPath.startsWith('../img/')) {
    cleanPath = cleanPath.replace('../img/', '/gsdd/img/');
  }
  
  const base = import.meta.env.BASE_URL.replace(/\/$/, ''); // Strip trailing slash (e.g. '/SDD' or '')
  const cleanSuffix = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
  return `${base}${cleanSuffix}`;
}

