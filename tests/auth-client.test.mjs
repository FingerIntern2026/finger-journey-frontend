import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import axios from 'axios';

// 실제 공통 클라이언트를 메모리 저장소와 HTTP 어댑터에 연결한다.
const source = (await readFile(new URL('../src/api/client.js', import.meta.url), 'utf8'))
  .replace(/^import .*;$/gm, '').replace(/export /g, '');
function setup(adapter, refresh) {
  let session = { accessToken: 'old', refreshToken: 'refresh', name: '직원' };
  let loading = 0;
  const store = { getState: () => ({ session, setSession: (next) => { session = next; } }) };
  const http = { create: (config) => axios.create({ ...config, adapter }), post: refresh };
  const api = new Function('axios', 'useAuthStore', 'API_BASE_URL', 'startLoading', 'stopLoading',
    source + '\nreturn { sendPost, refreshSession };')(http, store, 'http://test', () => loading++, () => loading--);
  return { ...api, session: () => session, loading: () => loading };
}
function unauthorized(config) {
  return Promise.reject(Object.assign(new Error('expired'), { config, response: { status: 401, data: { errorCode: 'AUTH_401' } } }));
}
test('동시 만료 요청은 토큰을 한 번 갱신하고 최신 토큰으로 재시도한다', async () => {
  let refreshes = 0;
  const api = setup(async (config) => {
    if (config.headers.Authorization === 'Bearer old') return unauthorized(config);
    assert.equal(config.headers.Authorization, 'Bearer new');
    return { data: { success: true }, status: 200, config };
  }, async () => { refreshes++; await new Promise((resolve) => setTimeout(resolve, 10)); return { data: { success: true, data: { accessToken: 'new', refreshToken: 'new-refresh' } } }; });
  await Promise.all([api.sendPost('/protected'), api.sendPost('/protected')]);
  assert.equal(refreshes, 1);
  assert.equal(api.session().name, '직원');
  assert.equal(api.loading(), 0);
});
test('잘못된 로그인은 토큰 갱신 없이 실패한다', async () => {
  const api = setup(unauthorized, () => { assert.fail('로그인은 갱신 대상이 아님'); });
  await assert.rejects(api.sendPost('/api/auth/login'));
  assert.equal(api.loading(), 0);
});
test('리프레시 토큰 만료는 로그인 상태를 삭제한다', async () => {
  const api = setup(unauthorized, async () => { throw { response: { status: 401 } }; });
  await assert.rejects(api.sendPost('/protected'));
  assert.equal(api.session(), null);
  assert.equal(api.loading(), 0);
});
test('토큰 갱신 중 네트워크 오류는 저장된 인증 정보를 보존한다', async () => {
  const api = setup(unauthorized, async () => { throw new Error('offline'); });
  await assert.rejects(api.sendPost('/protected'));
  assert.equal(api.session().accessToken, 'old');
  assert.equal(api.loading(), 0);
});
