import axios, { AxiosInstance, AxiosResponse } from "axios";
import * as queryString from "querystring";
import { RootDataDto, RootDataParams } from "./model";

const api: AxiosInstance = axios.create({
  //baseURL: "http://95.216.159.188:7003/api/",
  timeout: 300 * 1000,
});

// Proxy to bypass CORS for localhost
function buildCorsFreeUrl(target: string): string {
  return `https://cors.bridged.cc/${target}`;
}

export const RootData = async (
  params?: Partial<RootDataParams>
): Promise<AxiosResponse<RootDataDto>> =>
  await api.get(
    buildCorsFreeUrl(
      `http://95.216.159.188:7003/api/illustration${
        params ? `?${queryString.stringify(params)}` : ""
      }`
    )
  );
