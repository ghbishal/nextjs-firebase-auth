import { auth, signOut } from "@/auth";

export default async function Home() {
  const session = await auth();

  const handleSignOut = async () => {
    "use server";
    await signOut({ redirectTo: "/auth" });
  };
  return (
    <div>
      Hi <span className="font-bold text-green-500">{session?.user?.name}</span>{" "}
      are authenticated
      <button
        className="bg-blue-400 px-3 py-3 rounded-3xl cursor-pointer hover:bg-blue-800"
        onClick={handleSignOut}
      >
        sign out
      </button>
    </div>
  );
}
