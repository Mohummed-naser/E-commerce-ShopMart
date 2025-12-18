import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() {
  const userToken = (await cookies()).get("next-auth.session-token")?.value;
  const accessToken = await decode({
    token: userToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });
    return accessToken?.token
}
