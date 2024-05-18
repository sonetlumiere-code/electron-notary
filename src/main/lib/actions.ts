import { User } from '@prisma/client'
import { prisma } from './prisma-client'

const createUser = async (data: User) => {
  const user = await prisma.user.create({
    data: {
      name: data.name
    }
  })

  return user
}

const getUsers = async () => {
  const users = await prisma.user.findMany()
  return users
}

export { createUser, getUsers }
