// import { User as NextAuthUser } from "next-auth";
// import { AdapterUser } from "next-auth/adapters";

export interface User {
  id?: string;
  email: string;
  name: string;
  image: string;
  provider: string;
  token?: string;
  orders?: string[];
}
