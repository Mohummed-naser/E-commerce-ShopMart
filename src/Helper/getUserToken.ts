import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() {
  const mycookies = await cookies()
    const userToken =
      mycookies.get("next-auth.session-token")?.value ||
      mycookies.get("__secure-next-auth.session-token")?.value;
  const accessToken = await decode({
    token: userToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });
    return accessToken?.token
}
