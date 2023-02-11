import type { NextApiRequest, NextApiResponse } from "next";
import type { RequireAuthProp } from "@clerk/nextjs/api";

import { requireAuth, users } from "@clerk/nextjs/api";

import { prisma } from "src/lib/prisma";

const handler = requireAuth(
  async (
    { method, body: text, auth: { userId } }: RequireAuthProp<NextApiRequest>,
    { status }: NextApiResponse
  ) => {
    const user = await users.getUser(userId);
    const email =
      user.emailAddresses.find(
        (emailAddress) => emailAddress.id === user.primaryEmailAddressId
      )?.emailAddress || "foo@example.com";

    if (method === "GET") {
      return status(200).json(
        await prisma.todo.findMany({
          where: { email },
          orderBy: { createdAt: "asc" },
        })
      );
    } else if (method === "POST") {
      return status(201).json(
        await prisma.todo.create({
          data: {
            text,
            email,
          },
        })
      );
    }
  }
);

export default handler;
