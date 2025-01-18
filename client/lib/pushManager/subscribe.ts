"use server";
import { apiPost } from "@/utils/apiHandler";
import { fetchWithSession } from "@/utils/fetchWithSession";
export type SubscriptionKeys = {
  p256dh: string;
  auth: string;
};

export type PushSubscriptionPayload = {
  endpoint: string;
  keys: SubscriptionKeys;
};

export type SubscriptionResponse = {
  message: string;
  status: "success" | "error";
};

/**
 * Sends the push subscription to the server.
 */
export async function subscribe(formData: PushSubscriptionPayload) {
  const url = "/api/shop/subscribe/";
  return await fetchWithSession<PushSubscriptionPayload, SubscriptionResponse>(
    apiPost,
    url,
    formData,
  );
}
