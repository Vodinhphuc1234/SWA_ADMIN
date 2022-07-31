import BaseAPI from ".";

export const getUser = async (props) => {
  let user = await BaseAPI.get("/users", { ...props });
  if (!user.avatar) user.avatar = "https://w7.pngwing.com/pngs/223/244/png-transparent-computer-icons-avatar-user-profile-avatar-heroes-rectangle-black.png"
  return user.data[0];
};
