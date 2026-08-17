import { redirect } from "next/navigation";
import { getSession } from "@/lib/get-session";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LoginForm } from "@/components/admin/login-form";

export default async function AdminLoginPage() {
  const session = await getSession();
  if (session?.user) redirect("/admin");

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <p className="brand-display text-lg text-primary">Iraava Naturals</p>
          <CardTitle className="text-xl">Admin sign in</CardTitle>
          <CardDescription>Manage site content, products and enquiries.</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
