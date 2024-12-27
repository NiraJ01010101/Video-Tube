import axios, { AxiosRequestConfig } from "axios";
import { env } from "config/env";
import toast from "react-hot-toast";

type RequestOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  cookie?: string;
  params?: Record<string, string | number | boolean | undefined | null>;
  cache?: RequestCache; // Not applicable for Axios
  next?: NextFetchRequestConfig; // Not applicable for Axios
};

function buildUrlWithParams(
  url: string,
  params?: RequestOptions["params"]
): string {
  if (!params) return url;
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== null
    )
  );
  if (Object.keys(filteredParams).length === 0) return url;
  const queryString = new URLSearchParams(
    filteredParams as Record<string, string>
  ).toString();
  return `${url}?${queryString}`;
}

async function fetchApi<T>(
  url: string,
  options: RequestOptions = {}
): Promise<T> {

  const { method = "GET", headers = {}, body, cookie, params } = options;
  const fullUrl = buildUrlWithParams(`${env.API_URL}${url}`, params);

  const config: AxiosRequestConfig = {
    method,
    url: fullUrl,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
      ...(cookie ? { Cookie: cookie } : {}),
    },
    data: body,
    withCredentials: false, // Equivalent to credentials: "include"
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message;
    if (typeof window !== "undefined") {
      const notifications = {
        type: "error",
        title: "Error",
        message,
      };
      toast.error(notifications.message)
      // console.log("notifications", notifications);
    }
    throw new Error(message);
  }
}

export const api = {
  get<T>(url: string, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, { ...options, method: "GET" });
  },
  post<T>(url: string, body?: any, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, { ...options, method: "POST", body });
  },
  put<T>(url: string, body?: any, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, { ...options, method: "PUT", body });
  },
  patch<T>(url: string, body?: any, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, { ...options, method: "PATCH", body });
  },
  delete<T>(url: string, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, { ...options, method: "DELETE" });
  },
};
