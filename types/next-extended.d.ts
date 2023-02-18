import { FileRequest } from "multer";
import { NextApiRequest } from "next";

declare module "next" {
  export interface NextApiRequest extends FileRequest {
    files: Express.Multer.File[];
  }
}