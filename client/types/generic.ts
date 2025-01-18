export interface ActionResponse<Data> {
  message: string;
  code: number;
  status: "success" | "error";
  data: Data | null;
}
