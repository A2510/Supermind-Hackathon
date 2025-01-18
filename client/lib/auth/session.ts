"use server";
import { encrypt, decrypt, JwtPayload } from "@/lib/auth/utils/encryption";
import { cookies } from "next/headers";
import { apiPost } from "@/utils/apiHandler";
import { catchError } from "@/utils/catchError";
import { UserResponse } from "@/types/types";

interface RequestUser {
  email: string;
  password: string;
}

export async function login(formData: {
  email: string;
  password: string;
}): Promise<{
  message: string;
  status: "success" | "error";
  data?: UserResponse;
}> {
  const user: RequestUser = {
    email: formData.email,
    password: formData.password,
  };
  const [error, response] = await catchError(
    apiPost<RequestUser, UserResponse>("/api/auth/login/", user),
  );
  if (error) {
    return {
      message: error.message || "Login failed",
      status: "error",
    };
  }
  if (response) {
    const cookieStore = await cookies();
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 365); // 1 year expiry
    const session = await encrypt({
      user: response.user,
      tokens: response.tokens,
    });
    cookieStore.set({
      name: "session",
      value: session,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires,
    });
    return {
      message: "Login successful",
      status: "success",
      data: response,
    };
  }
  return {
    message: "Unknown error occurred",
    status: "error",
  };
}

export async function getSession(): Promise<JwtPayload | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  return await decrypt(session);
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.set({
    name: "session",
    value: "",
    maxAge: 0,
  });
}