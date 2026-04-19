import axios from "axios";

const API_URL = "/api";

const ApiClient = axios.create({
  baseURL: API_URL,
});

export const AnalyzePostsJson = async (Data) => {
  const Response = await ApiClient.post("/analyze", { data: Data });
  return Response.data;
};

export const AnalyzePostsFile = async (File) => {
  const FormData_ = new FormData();
  FormData_.append("FileUpload", File);
  const Response = await ApiClient.post("/analyze/upload", FormData_, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return Response.data;
};