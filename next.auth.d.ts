import "next-auth/jwt"
import { UserS } from "./src/interfaces/User"

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation

declare module "next-auth/jwt" {
  interface JWT {
    /** The user's role. */
    role?: "ADMIN_ROL"
    
  }
}