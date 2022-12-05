import { PrismaClient } from "@prisma/client";

(async () => {
  const prisma = new PrismaClient();
  await prisma.todo.createMany({
    data: [
      {
        text: "foo",
      },
      {
        text: "bar",
      },
      {
        text: "baz",
      },
    ],
  });
  console.log(await prisma.todo.findMany());
})();
