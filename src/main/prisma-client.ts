import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const createUser = async () => {
  const user = await prisma.user.create({
    data: {
      name: 'demo'
    }
  })

  console.log(user)

  return user
}

export { createUser }
