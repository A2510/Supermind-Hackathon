import { apiPost } from "@/utils/apiHandler";
import { catchError } from "@/utils/catchError";
import { DashboardData } from "@/types/types";

export interface GetDashboardParams {
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

export const getDashboard = async ({
    query,
    sources,
    target,
}: GetDashboardParams): Promise<ActionResponse<DashboardData>> => {
    const [error, response] = await catchError(
        apiPost<GetDashboardParams, DashboardData>("/api/art/dashboard/", {
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
