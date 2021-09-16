const users = [];

const addUser = ({ id, username, room }) => {
  //Clear the data
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  //Validate the date
  if (!username || !room) {
    return {
      error: "Username and room are required",
    };
  }

  // Check for existing user
  const existingUser = users.find((user) => {
    return user.room === room && user.username === username;
  });

  //Validate the username
  if (existingUser) {
    return {
      error: "User already exists",
    };
  }

  //Store user
  const user = { id, username, room };
  users.push(user);
  return {
    user,
  };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => {
    return user.id === id;
  });

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => {
  return users.find((user) => {
    return user.id === id;
  });
};

const getUsersInRoom = (room) => {
  room = room.trim().toLowerCase();
  const usersInRoom = users.filter((user) => {
    return user.room === room;
  });
  return usersInRoom;
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
};
