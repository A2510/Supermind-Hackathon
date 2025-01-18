import { apiGet } from "@/utils/apiHandler";
import { catchError } from "@/utils/catchError";
// types
import { ActionResponse } from "@/types/generic";
import { Gallery } from "@/types/types";

export const fetchPromo = async (): Promise<ActionResponse<Gallery[]>> => {
    const [error, response] = await catchError(apiGet<Gallery[]>("/get-ads/large"));
    if (error) return {
        message: error.message,
        code: error.status || 500,
        status: "error",
        data: null,
    };
    return {
        message: "Gallery fetched",
        code: 200,
        status: "success",
        data: response,
    };
};
