import NextAuth from "next-auth";
import { authOptions } from "../authOptions";

const handler = NextAuth(authOptions);

// Export GET and POST for Next.js API routes
export { handler as GET, handler as POST };