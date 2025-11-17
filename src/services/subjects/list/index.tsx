import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { SubjectListResponse, SubjectQueryParams } from "./types";
import { buildQueryParams } from "@/services/utils";
import { SUBJECTS_LIST_KEY } from "./constants";
import { API_KEY, BASE_URL } from "../../constants";
import { listMock } from "./dataMock";
export function useGetSubjectList(
  queryParams: SubjectQueryParams = {},
  options?: Omit<
    UseQueryOptions<SubjectListResponse, Error>,
    "queryKey" | "queryFn"
  >
): UseQueryResult<SubjectListResponse, Error> {
  return useQuery<SubjectListResponse, Error>({
    queryKey: [SUBJECTS_LIST_KEY, queryParams],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return listMock;
      // const params = buildQueryParams(queryParams);
      // const url = `${BASE_URL}/${SUBJECTS_LIST_KEY}${params ? `?${params}` : ""}`;

      // const response = await fetch(url, {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "x-api-key": API_KEY,
      //   },
      // });
      // return response.json();
    },
    ...options,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
}