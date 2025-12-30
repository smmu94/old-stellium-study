import { useMutation, UseMutationOptions, UseMutationResult } from "@tanstack/react-query";
import { API_KEY, BASE_URL, SUBJECTS_KEY } from "@/services/constants";
import { SubjectCreationBody, SubjectCreationResponse } from "./types";
import { buildSubjectCreationResponseMock } from "./dataMock";

export function useCreateSubject(
  options?: Omit<
    UseMutationOptions<SubjectCreationResponse, Error, SubjectCreationBody>,
    "mutationFn"
  >
): UseMutationResult<SubjectCreationResponse, Error, SubjectCreationBody> {
  return useMutation<SubjectCreationResponse, Error, SubjectCreationBody>({
    mutationFn: async (body: SubjectCreationBody) => {
      // const response = await fetch(`${BASE_URL}/${SUBJECTS_KEY}`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "x-api-key": API_KEY,
      //   },
      //   body: JSON.stringify(body),
      // });
      // return response.json();
      await new Promise(resolve => setTimeout(resolve, 300));
      return buildSubjectCreationResponseMock(body);
    },
    ...options,
  });
}
