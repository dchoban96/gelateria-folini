/// <reference types="astro/client" />
declare module 'cloudflare:workers' {
  export const env: {
    DB: any;
    MEDIA: any;
    ADMIN_PASSWORD?: string;
    SESSION_SECRET?: string;
    ANTHROPIC_API_KEY?: string;
  };
}
declare namespace App {
  interface Locals {
    admin?: boolean;
  }
}
