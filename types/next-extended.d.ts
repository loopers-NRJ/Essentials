import { FileRequest } from "multer";
import { NextApiRequest } from "next";
import { Users } from ".";

declare module "next" {
  export interface NextApiRequest extends FileRequest {
    files: Express.Multer.File[];
    user: Users;
  }
}
