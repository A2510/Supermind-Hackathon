import { apiPost } from "@/utils/apiHandler";
import { catchError } from "@/utils/catchError";
import { SummaryData } from "@/types/types";

export interface GetSummaryParams {
    query: string;
    sources: string[];
    target: string;
}

export interface ActionResponse<Data> {
    message: string;
    code: number;
    status: "success" | "error";
    data: Data | null;
}

export const getSummary = async ({
    query,
    sources,
    target,
}: GetSummaryParams): Promise<ActionResponse<SummaryData>> => {
    const [error, response] = await catchError(
        apiPost<GetSummaryParams, SummaryData>("/api/art/get-summary/", {
            query,
            sources,
            target,
        })
    );

    if (error) {
        return {
            message: error.message,
            code: error.status || 500,
            status: "error",
            data: null,
        };
    }

    return {
        message: "Dashboard data fetched successfully",
        code: 200,
        status: "success",
        data: response,
    };
};
