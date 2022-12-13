import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "src/lib/prisma";

const handler = async (
  { method, query: { id } }: NextApiRequest,
  { status }: NextApiResponse
) => {
  if (method === "DELETE") {
    try {
      return status(200).json(
        await prisma.todo.delete({
          where: {
            id: Number(id),
          },
        })
      );
    } catch (error) {
      return status(400).json(error);
    }
  }
};

export default handler;
