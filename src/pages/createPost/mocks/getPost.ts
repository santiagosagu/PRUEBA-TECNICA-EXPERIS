import { HttpResponse } from "msw";

export const mockHttpResponseGetPost = (): HttpResponse => {
  return HttpResponse.json({
    userId: 1,
    id: 1,
    title: "qui est esse",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  });
};
