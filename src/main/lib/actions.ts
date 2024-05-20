const createUser = async (data) => {
  const user = { id: 1, name: 'demo' }

  return user
}

const getUsers = async () => {
  const users = [{ id: 1, name: 'demo' }]
  return users
}

export { createUser, getUsers }
