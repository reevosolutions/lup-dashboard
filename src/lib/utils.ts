import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function applyOnChunkedArray<T>(
  array: T[],
  chunkSize: number,
  callback: (chunk: T[], index: number) => Promise<void>
) {
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    await callback(chunk, i);
  }
}

