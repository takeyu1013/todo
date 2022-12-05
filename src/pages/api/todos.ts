import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(await new PrismaClient().todo.findMany());
};

export default handler;
