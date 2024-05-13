import { PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

const createUser = async (data: User) => {
  const user = await prisma.user.create({
    data: {
      name: data.name
    }
  })

  console.log(user)

  return user
}

export { createUser }
