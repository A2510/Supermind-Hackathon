"use server";
import { cookies } from "next/headers";
import { apiPost } from "@/utils/apiHandler";
import { catchError } from "@/utils/catchError";
import { encrypt } from "@/lib/auth/utils/encryption";
import { UserResponse } from "@/types/types";

export async function getOTP(phone_number: string) {
  const [error, response] = await catchError(
    apiPost(`/api/auth/send-otp/`, { phone_number }),
  );
  console.log("response", response);
  if (error) {
    return {
      message: error.message,
      code: error.status || 500,
      status: "error",
    };
  }
  return {
    message: "OTP sent",
    code: 200,
    status: "success",
    data: response,
  };
}

export async function verifyOTP(phone_number: string, otp: string) {
  interface RequestBody {
    phone_number: string;
    otp: string;
  }
  const [error, response] = await catchError<UserResponse | null>(apiPost<RequestBody, UserResponse | null>(`/api/auth/verify-otp/`, { phone_number, otp }));
  if (error) {
    return {
      message: error.message,
      code: error.status || 500,
      status: "error",
    };
  }
  if (response) {
    const cookieStore = await cookies();
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 2); // 2 year expiry
    const session = await encrypt(response);
    cookieStore.set({
      name: "session",
      value: session,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires,
    });
  }
  return {
    message: "OTP verified",
    code: 200,
    status: "success",
    data: response,
  };
}
