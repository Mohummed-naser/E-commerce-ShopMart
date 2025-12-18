// import { decode } from "next-auth/jwt";
// import { cookies } from "next/headers";

// export function getUserToken() {
//   const allCookies = cookies();
//   const userToken = allCookies.get("next-auth.session-token")?.value;

//   if (!userToken) return null;

//   return decode({
//     token: userToken,
//     secret: process.env.NEXTAUTH_SECRET!,
//   }).then((decoded) => decoded?.token as string | null);
// }
