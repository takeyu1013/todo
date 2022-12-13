import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "src/lib/prisma";

const handler = async (
  { method, body: text }: NextApiRequest,
  { status }: NextApiResponse
) => {
  if (method === "GET") {
    return status(200).json(await prisma.todo.findMany());
  } else if (method === "POST") {
    return status(201).json(
      await prisma.todo.create({
        data: {
          text,
        },
      })
    );
  }
};

export default handler;
