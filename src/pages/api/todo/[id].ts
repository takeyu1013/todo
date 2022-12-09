import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    const id = Number(req.query.id);
    if (typeof id !== "number") return;
    return res.status(200).json(
      await prisma.todo.delete({
        where: {
          id,
        },
      })
    );
  }
};

export default handler;
