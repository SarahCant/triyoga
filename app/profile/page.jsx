import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";

export default function Profile() {
  async function createPost(formData) {
    "use server";
  }

  return (
    <main>
      <SignUp />;
      <SignIn />;
    </main>
  );
}
