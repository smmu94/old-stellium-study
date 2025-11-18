import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { listMock } from "./dataMock";
import { SubjectListResponse, SubjectQueryParams } from "./types";
import { SUBJECTS_KEY } from "../../constants";
export function useGetSubjectList(
  queryParams: SubjectQueryParams = {},
  options?: Omit<
    UseQueryOptions<SubjectListResponse, Error>,
    "queryKey" | "queryFn"
  >
): UseQueryResult<SubjectListResponse, Error> {
  return useQuery<SubjectListResponse, Error>({
    queryKey: [SUBJECTS_KEY, queryParams],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return listMock;
      // const params = buildQueryParams(queryParams);
      // const url = `${BASE_URL}/${SUBJECTS_KEY}${params ? `?${params}` : ""}`;

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