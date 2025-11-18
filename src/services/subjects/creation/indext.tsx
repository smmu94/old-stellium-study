import { useMutation, UseMutationOptions, UseMutationResult } from "@tanstack/react-query";
import { API_KEY, BASE_URL } from "../../constants";
import { SUBJECTS_KEY } from "../../constants";
import { SubjectCreationBody, SubjectCreationResponse } from "./types";

export function useCreateSubject(
  options?: Omit<
    UseMutationOptions<SubjectCreationResponse, Error, SubjectCreationBody>,
    "mutationFn"
  >
): UseMutationResult<SubjectCreationResponse, Error, SubjectCreationBody> {
  return useMutation<SubjectCreationResponse, Error, SubjectCreationBody>({
    mutationFn: async (body: SubjectCreationBody) => {
      const response = await fetch(`${BASE_URL}/${SUBJECTS_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
        body: JSON.stringify(body),
      });
      return response.json();
    },
    ...options,
  });
}
