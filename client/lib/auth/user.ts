'use server'
import { cookies } from "next/headers";
import { encrypt } from "@/lib/auth/utils/encryption";
import { apiPost } from "@/utils/apiHandler";
import { fetchWithSession } from "@/utils/fetchWithSession";
import { UserResponse } from "@/types/types";

export async function updateUser(name: string, email: string) {
  const url = "/api/auth/update-user/";
  const response = await fetchWithSession<{
    name: string;
    email: string;
  }, UserResponse>(apiPost, url, {
    name: name,
    email: email,
  })
  if (!response.data) return;
  const currentSession = await encrypt(response.data);
  const cookieStore = await cookies();
  cookieStore.set("session", currentSession, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 365,
  });
  return response;

}
