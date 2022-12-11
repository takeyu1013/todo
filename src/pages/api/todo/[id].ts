import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "src/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    const id = Number(req.query.id);
    if (typeof id !== "number") return;
    try {
      return res.status(200).json(
        await prisma.todo.delete({
          where: {
            id,
          },
        })
      );
    } catch (error) {
      return res.status(400).json(error);
    }
  }
};

export default handler;
