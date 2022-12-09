import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    return res.status(200).json(await prisma.todo.findMany());
  } else if (req.method === "POST") {
    return res.status(201).json(
      await prisma.todo.create({
        data: {
          text: req.body,
        },
      })
    );
  }
};

export default handler;
