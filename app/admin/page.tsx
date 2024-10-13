import AdminLogin from "@/components/admin/Login";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Page = () => {
  const admin = cookies().get("admin")?.value;

  if (!admin) {
    return <AdminLogin />;
  }

  redirect("/admin/dashboard");
};

export default Page;
