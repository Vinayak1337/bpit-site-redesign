import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

let clientIdCounter = 0

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createClientId(prefix = "id") {
  const randomUuid = globalThis.crypto?.randomUUID?.bind(globalThis.crypto)

  if (randomUuid) {
    return randomUuid()
  }

  clientIdCounter += 1
  return `${prefix}-${Date.now().toString(36)}-${clientIdCounter.toString(36)}`
}
