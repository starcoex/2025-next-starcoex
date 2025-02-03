import getUser from "@/app/lib/get-user";
import UserTest from "@/app/users/UserTest";

const Page = async () => {
  const me = await getUser();
  return (
    <div>
      Get User
      <UserTest />
    </div>
  );
};

export default Page;
