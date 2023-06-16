import request from 'superagent';

export const sendReq = async (method: string, url: string, body?: any) => {
  const req = request(method, `${url[0] === '/' ? url : `/${url}`}`);
  if (body) req.send(body);
  return req.then((res) => JSON.parse(res.text).data);
}
