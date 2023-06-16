import request from 'superagent';

export const sendReq = async (url: string, method: string, body?: any) => {
  const req = request(method, `http://localhost:5555${url[0] === '/' ? url : `/${url}`}`);
  if (body) req.send(body);
  return req.then((res) => JSON.parse(res.text).data);
}
