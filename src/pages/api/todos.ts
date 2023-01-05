import type { NextApiRequest, NextApiResponse } from "next";
import type { RequireAuthProp } from "@clerk/nextjs/api";

import { prisma } from "src/lib/prisma";
import { requireAuth, users } from "@clerk/nextjs/api";

const handler = requireAuth(
  async (
    { method, body: text, auth: { userId } }: RequireAuthProp<NextApiRequest>,
    { status }: NextApiResponse
  ) => {
    const user = await users.getUser(userId);
    const primaryEmailAddress = user.emailAddresses.find(
      (emailAddress) => emailAddress.id === user.primaryEmailAddressId
    )?.emailAddress;
    console.log("email:", primaryEmailAddress);

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
  }
);

export default handler;
