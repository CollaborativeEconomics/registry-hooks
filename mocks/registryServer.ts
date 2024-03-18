import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { getRegistryBaseUrl } from '../init';

const handlers = [
  // Intercept the "GET /resource" request.
  http.get(`${getRegistryBaseUrl()}/test`, () => {
    // And respond with a "text/plain" response
    // with a "Hello world!" text response body.
    return HttpResponse.json({ message: "Hello test!" })
  }),
];

const server = setupServer(...handlers);

export default server;