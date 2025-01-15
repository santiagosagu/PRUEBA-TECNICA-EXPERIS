import { HttpResponse } from "msw";

export const mockHttpResponseDeletePost = (): HttpResponse => {
  return HttpResponse.json({});
};
