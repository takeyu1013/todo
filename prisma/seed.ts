import { PrismaClient } from "@prisma/client";

(async () => {
  const prisma = new PrismaClient();
  const email = "foo@example.com";
  await prisma.todo.createMany({
    data: [
      {
        text: "foo",
        email,
      },
      {
        text: "bar",
        email,
      },
      {
        text: "baz",
        email,
      },
    ],
  });
  console.log(await prisma.todo.findMany());
  await prisma.$disconnect();
})();
