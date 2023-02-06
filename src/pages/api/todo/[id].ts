import type { NextApiRequest, NextApiResponse } from "next";
import type { RequireAuthProp } from "@clerk/nextjs/api";

import { requireAuth } from "@clerk/nextjs/api";

import { prisma } from "src/lib/prisma";

const handler = requireAuth(
  async (
    { method, body, query: { id } }: RequireAuthProp<NextApiRequest>,
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
    } else if (method === "PUT") {
      const checked = JSON.parse(body);
      try {
        return status(200).json(
          await prisma.todo.update({
            where: {
              id: Number(id),
            },
            data: {
              checked,
            },
          })
        );
      } catch (error) {
        return status(400).json(error);
      }
    }
  }
);

export default handler;
