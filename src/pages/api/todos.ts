import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient();
  if (req.method === "GET") {
    return res.status(200).json(await prisma.todo.findMany());
  } else if (req.method === "POST") {
    return await prisma.todo.create({
      data: {
        text: req.body,
      },
    });
  }
};

export default handler;
