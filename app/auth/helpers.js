export async function getUserByMail(mail) {
  const url = `${process.env.NEXT_PUBLIC_FB_DB_URL}/users.json?orderBy="email"&equalTo="${mail}"`;
  const response = await fetch(url);
  const userData = await response.json();
  console.log(userData);

  if (Object.keys(userData).length === 0) return null;
  const user = { id: Object.keys(userData)[0], ...Object.values(userData)[0] };
  return user;
}

export async function createUser(user) {
  console.log("user create", user);

  const userWithBooked = {
    ...user,
    booked: "",
  };

  const url = `${process.env.NEXT_PUBLIC_FB_DB_URL}/users.json`;
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(userWithBooked),
  });
  const data = await response.json();

  return { id: data.name, ...userWithBooked };
}
