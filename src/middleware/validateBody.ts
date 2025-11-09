import type { Request, Response, NextFunction } from "express";
import { ZodType, ZodError } from "zod";

interface IvalidateBody {
  error: string[];
  statusCode: number;
  fields: {
    path: string;
    message: string;
  }[];
}

const validateBody =
  (schema: ZodType) =>
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    try {
      //nomes dos campos no body em minusculo
      const tuplaBody: [string, string][] = Object.entries(req.body);
      const body = Object.fromEntries(
        tuplaBody.map(([k, v]) => [k.toLowerCase(), v])
      );
      //
      await schema.parseAsync(body);

      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorCode = error.issues.map((e) => e.code.replaceAll("_", " "));

        const fields = error.issues.map((e) => ({
          path: e.path.join(""),
          message: e.message,
        }));

        const returnError: IvalidateBody = {
          error: errorCode,
          statusCode: 400,
          fields,
        };
        return res.status(400).json(returnError);
      }
    }
  };

export default validateBody;
