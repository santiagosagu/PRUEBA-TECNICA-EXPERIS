import { HttpResponse } from "msw";

export const mockHttpResponseCreatePost = (): HttpResponse => {
  return HttpResponse.json({
    id: 101,
    title: "new post",
    body: "body new post",
  });
};
