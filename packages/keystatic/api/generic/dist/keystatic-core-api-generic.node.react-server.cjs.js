'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var cookie = require('cookie');
var Iron = require('iron-webcrypto');
var z = require('zod');
var path = require('node:path');
var fs = require('node:fs/promises');
var readLocal = require('../../../dist/read-local-9451a6d0.node.react-server.cjs.js');
var node_crypto = require('node:crypto');
require('fs/promises');
require('path');
require('../../../dist/index-bf07e3be.node.react-server.cjs.js');
require('@markdoc/markdoc');
require('slate');
require('emery/assertions');
require('emery');
require('js-base64');
require('crypto');
require('../../../dist/empty-field-ui-11e96e9f.node.react-server.cjs.js');
require('react/jsx-runtime');
require('@emotion/weak-memoize');
require('@sindresorhus/slugify');
require('@braintree/sanitize-url');
require('ignore');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var cookie__default = /*#__PURE__*/_interopDefault(cookie);
var Iron__namespace = /*#__PURE__*/_interopNamespace(Iron);
var z__default = /*#__PURE__*/_interopDefault(z);
var path__default = /*#__PURE__*/_interopDefault(path);
var fs__default = /*#__PURE__*/_interopDefault(fs);

function redirect(to, initialHeaders) {
  return {
    body: null,
    status: 307,
    headers: [...(initialHeaders !== null && initialHeaders !== void 0 ? initialHeaders : []), ['Location', to]]
  };
}

const ghAppSchema = z.z.object({
  slug: z.z.string(),
  client_id: z.z.string(),
  client_secret: z.z.string()
});
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
async function handleGitHubAppCreation(req, slugEnvVarName) {
  const searchParams = new URL(req.url, 'https://localhost').searchParams;
  const code = searchParams.get('code');
  if (typeof code !== 'string' || !/^[a-zA-Z0-9]+$/.test(code)) {
    return {
      status: 400,
      body: 'Bad Request'
    };
  }
  const ghAppRes = await fetch(`https://api.github.com/app-manifests/${code}/conversions`, {
    method: 'POST',
    headers: {
      Accept: 'application/json'
    }
  });
  if (!ghAppRes.ok) {
    console.log(ghAppRes);
    return {
      status: 500,
      body: 'An error occurred while creating the GitHub App'
    };
  }
  const ghAppDataRaw = await ghAppRes.json();
  const ghAppDataResult = ghAppSchema.safeParse(ghAppDataRaw);
  if (!ghAppDataResult.success) {
    console.log(ghAppDataRaw);
    return {
      status: 500,
      body: 'An unexpected response was received from GitHub'
    };
  }
  const toAddToEnv = `# Keystatic
KEYSTATIC_GITHUB_CLIENT_ID=${ghAppDataResult.data.client_id}
KEYSTATIC_GITHUB_CLIENT_SECRET=${ghAppDataResult.data.client_secret}
KEYSTATIC_SECRET=${node_crypto.randomBytes(40).toString('hex')}
${slugEnvVarName ? `${slugEnvVarName}=${ghAppDataResult.data.slug}\n` : ''}`;
  let prevEnv;
  try {
    prevEnv = await fs__default["default"].readFile('.env', 'utf-8');
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
  }
  const newEnv = prevEnv ? `${prevEnv}\n\n${toAddToEnv}` : toAddToEnv;
  await fs__default["default"].writeFile('.env', newEnv);
  await wait(200);
  return redirect('/keystatic/created-github-app?slug=' + ghAppDataResult.data.slug);
}
function localModeApiHandler(config, localBaseDirectory) {
  const baseDirectory = path__default["default"].resolve(localBaseDirectory !== null && localBaseDirectory !== void 0 ? localBaseDirectory : process.cwd());
  return async (req, params) => {
    const joined = params.join('/');
    if (req.method === 'GET' && joined === 'tree') {
      return tree(req, config, baseDirectory);
    }
    if (req.method === 'GET' && params[0] === 'blob') {
      return blob(req, config, params, baseDirectory);
    }
    if (req.method === 'POST' && joined === 'update') {
      return update(req, config, baseDirectory);
    }
    return {
      status: 404,
      body: 'Not Found'
    };
  };
}
async function tree(req, config, baseDirectory) {
  if (req.headers.get('no-cors') !== '1') {
    return {
      status: 400,
      body: 'Bad Request'
    };
  }
  return {
    status: 200,
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(await readLocal.readToDirEntries(baseDirectory))
  };
}
function getIsPathValid(config) {
  const allowedDirectories = readLocal.getAllowedDirectories(config);
  return filepath => !filepath.includes('\\') && filepath.split('/').every(x => x !== '.' && x !== '..') && allowedDirectories.some(x => filepath.startsWith(x));
}
async function blob(req, config, params, baseDirectory) {
  if (req.headers.get('no-cors') !== '1') {
    return {
      status: 400,
      body: 'Bad Request'
    };
  }
  const expectedSha = params[1];
  const filepath = params.slice(2).join('/');
  const isFilepathValid = getIsPathValid(config);
  if (!isFilepathValid(filepath)) {
    return {
      status: 400,
      body: 'Bad Request'
    };
  }
  let contents;
  try {
    contents = await fs__default["default"].readFile(path__default["default"].join(baseDirectory, filepath));
  } catch (err) {
    if (err.code === 'ENOENT') {
      return {
        status: 404,
        body: 'Not Found'
      };
    }
    throw err;
  }
  const sha = await readLocal.blobSha(contents);
  if (sha !== expectedSha) {
    return {
      status: 404,
      body: 'Not Found'
    };
  }
  return {
    status: 200,
    body: contents
  };
}
async function update(req, config, baseDirectory) {
  if (req.headers.get('no-cors') !== '1' || req.headers.get('content-type') !== 'application/json') {
    return {
      status: 400,
      body: 'Bad Request'
    };
  }
  const isFilepathValid = getIsPathValid(config);
  const updates = z.z.object({
    additions: z.z.array(z.z.object({
      path: z.z.string().refine(isFilepathValid),
      contents: z.z.string().transform(x => Buffer.from(x, 'base64'))
    })),
    deletions: z.z.array(z.z.object({
      path: z.z.string().refine(isFilepathValid)
    }))
  }).safeParse(await req.json());
  if (!updates.success) {
    return {
      status: 400,
      body: 'Bad data'
    };
  }
  for (const addition of updates.data.additions) {
    await fs__default["default"].mkdir(path__default["default"].dirname(path__default["default"].join(baseDirectory, addition.path)), {
      recursive: true
    });
    await fs__default["default"].writeFile(path__default["default"].join(baseDirectory, addition.path), addition.contents);
  }
  for (const deletion of updates.data.deletions) {
    await fs__default["default"].rm(path__default["default"].join(baseDirectory, deletion.path), {
      force: true
    });
  }
  return {
    status: 200,
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(await readLocal.readToDirEntries(baseDirectory))
  };
}

function bytesToHex(bytes) {
  let str = '';
  for (const byte of bytes) {
    str += byte.toString(16).padStart(2, '0');
  }
  return str;
}

const keystaticRouteRegex = /^branch\/[^]+(\/collection\/[^/]+(|\/(create|item\/[^/]+))|\/singleton\/[^/]+)?$/;
const keyToEnvVar = {
  clientId: 'KEYSTATIC_GITHUB_CLIENT_ID',
  clientSecret: 'KEYSTATIC_GITHUB_CLIENT_SECRET',
  secret: 'KEYSTATIC_SECRET'
};
function tryOrUndefined(fn) {
  try {
    return fn();
  } catch {
    return undefined;
  }
}
function makeGenericAPIRouteHandler(_config, options) {
  var _config$clientId, _config$clientSecret, _config$secret;
  const _config2 = {
    clientId: (_config$clientId = _config.clientId) !== null && _config$clientId !== void 0 ? _config$clientId : tryOrUndefined(() => process.env.KEYSTATIC_GITHUB_CLIENT_ID),
    clientSecret: (_config$clientSecret = _config.clientSecret) !== null && _config$clientSecret !== void 0 ? _config$clientSecret : tryOrUndefined(() => process.env.KEYSTATIC_GITHUB_CLIENT_SECRET),
    secret: (_config$secret = _config.secret) !== null && _config$secret !== void 0 ? _config$secret : tryOrUndefined(() => process.env.KEYSTATIC_SECRET),
    config: _config.config
  };
  const getParams = req => {
    let url;
    try {
      url = new URL(req.url);
    } catch (err) {
      throw new Error(`Found incomplete URL in Keystatic API route URL handler${(options === null || options === void 0 ? void 0 : options.slugEnvName) === 'NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG' ? ". Make sure you're using the latest version of @keystatic/next" : ''}`);
    }
    return url.pathname.replace(/^\/api\/keystatic\/?/, '').split('/').map(x => decodeURIComponent(x)).filter(Boolean);
  };
  if (_config2.config.storage.kind === 'local') {
    const handler = localModeApiHandler(_config2.config, _config.localBaseDirectory);
    return req => {
      const params = getParams(req);
      return handler(req, params);
    };
  }
  if (_config2.config.storage.kind === 'cloud') {
    return async function keystaticAPIRoute() {
      return {
        status: 404,
        body: 'Not Found'
      };
    };
  }
  if (!_config2.clientId || !_config2.clientSecret || !_config2.secret) {
    if (process.env.NODE_ENV !== 'development') {
      const missingKeys = ['clientId', 'clientSecret', 'secret'].filter(x => !_config2[x]);
      throw new Error(`Missing required config in Keystatic API setup when using the 'github' storage mode:\n${missingKeys.map(key => `- ${key} (can be provided via ${keyToEnvVar[key]} env var)`).join('\n')}\n\nIf you've created your GitHub app locally, make sure to copy the environment variables from your local env file to your deployed environment`);
    }
    return async function keystaticAPIRoute(req) {
      const params = getParams(req);
      const joined = params.join('/');
      if (joined === 'github/created-app') {
        return createdGithubApp(req, options === null || options === void 0 ? void 0 : options.slugEnvName);
      }
      if (joined === 'github/login' || joined === 'github/repo-not-found' || joined === 'github/logout') {
        return redirect('/keystatic/setup');
      }
      return {
        status: 404,
        body: 'Not Found'
      };
    };
  }
  const config = {
    clientId: _config2.clientId,
    clientSecret: _config2.clientSecret,
    secret: _config2.secret,
    config: _config2.config
  };
  return async function keystaticAPIRoute(req) {
    const params = getParams(req);
    const joined = params.join('/');
    if (joined === 'github/oauth/callback') {
      return githubOauthCallback(req, config);
    }
    if (joined === 'github/login') {
      return githubLogin(req, config);
    }
    if (joined === 'github/refresh-token') {
      return githubRefreshToken(req, config);
    }
    if (joined === 'github/repo-not-found') {
      return githubRepoNotFound(req, config);
    }
    if (joined === 'github/logout') {
      return redirect('/keystatic', [['Set-Cookie', immediatelyExpiringCookie('keystatic-gh-access-token')], ['Set-Cookie', immediatelyExpiringCookie('keystatic-gh-refresh-token')]]);
    }
    return {
      status: 404,
      body: 'Not Found'
    };
  };
}
const tokenDataResultType = z__default["default"].object({
  access_token: z__default["default"].string(),
  expires_in: z__default["default"].number(),
  refresh_token: z__default["default"].string(),
  refresh_token_expires_in: z__default["default"].number(),
  scope: z__default["default"].string(),
  token_type: z__default["default"].literal('bearer')
});
async function githubOauthCallback(req, config) {
  var _req$headers$get;
  const searchParams = new URL(req.url, 'http://localhost').searchParams;
  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');
  if (typeof errorDescription === 'string') {
    return {
      status: 400,
      body: `An error occurred when trying to authenticate with GitHub:\n${errorDescription}${error === 'redirect_uri_mismatch' ? `\n\nIf you were trying to sign in locally and recently upgraded Keystatic from @keystatic/core@0.0.69 or below, you need to add \`http://127.0.0.1/api/keystatic/github/oauth/callback\` as a callback URL in your GitHub app.` : ''}`
    };
  }
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  if (typeof code !== 'string') {
    return {
      status: 400,
      body: 'Bad Request'
    };
  }
  const cookies = cookie__default["default"].parse((_req$headers$get = req.headers.get('cookie')) !== null && _req$headers$get !== void 0 ? _req$headers$get : '');
  const fromCookie = state ? cookies['ks-' + state] : undefined;
  const from = typeof fromCookie === 'string' && keystaticRouteRegex.test(fromCookie) ? fromCookie : undefined;
  const url = new URL('https://github.com/login/oauth/access_token');
  url.searchParams.set('client_id', config.clientId);
  url.searchParams.set('client_secret', config.clientSecret);
  url.searchParams.set('code', code);
  const tokenRes = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json'
    }
  });
  if (!tokenRes.ok) {
    return {
      status: 401,
      body: 'Authorization failed'
    };
  }
  const _tokenData = await tokenRes.json();
  const tokenDataParseResult = tokenDataResultType.safeParse(_tokenData);
  if (!tokenDataParseResult.success) {
    return {
      status: 401,
      body: 'Authorization failed'
    };
  }
  const headers = await getTokenCookies(tokenDataParseResult.data, config);
  if (state === 'close') {
    return {
      headers: [...headers, ['Content-Type', 'text/html']],
      body: "<script>localStorage.setItem('ks-refetch-installations', 'true');window.close();</script>",
      status: 200
    };
  }
  return redirect(`/keystatic${from ? `/${from}` : ''}`, headers);
}
async function getTokenCookies(tokenData, config) {
  const headers = [['Set-Cookie', cookie__default["default"].serialize('keystatic-gh-access-token', tokenData.access_token, {
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: tokenData.expires_in,
    expires: new Date(Date.now() + tokenData.expires_in * 1000),
    path: '/'
  })], ['Set-Cookie', cookie__default["default"].serialize('keystatic-gh-refresh-token', await Iron__namespace.seal(node_crypto.webcrypto, tokenData.refresh_token, config.secret, {
    ...Iron__namespace.defaults,
    ttl: tokenData.refresh_token_expires_in * 1000
  }), {
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: tokenData.refresh_token_expires_in,
    expires: new Date(Date.now() + tokenData.refresh_token_expires_in * 100),
    path: '/'
  })]];
  return headers;
}
async function getRefreshToken(req, config) {
  const cookies = cookie__default["default"].parse(req.headers.get('cookie') || '');
  const refreshTokenCookie = cookies['keystatic-gh-refresh-token'];
  if (!refreshTokenCookie) return;
  let refreshToken;
  try {
    refreshToken = await Iron__namespace.unseal(node_crypto.webcrypto, refreshTokenCookie, config.secret, Iron__namespace.defaults);
  } catch {
    return;
  }
  if (typeof refreshToken !== 'string') return;
  return refreshToken;
}
async function githubRefreshToken(req, config) {
  const headers = await refreshGitHubAuth(req, config);
  if (!headers) {
    return {
      status: 401,
      body: 'Authorization failed'
    };
  }
  return {
    status: 200,
    headers,
    body: ''
  };
}
async function refreshGitHubAuth(req, config) {
  const refreshToken = await getRefreshToken(req, config);
  if (!refreshToken) {
    return;
  }
  const url = new URL('https://github.com/login/oauth/access_token');
  url.searchParams.set('client_id', config.clientId);
  url.searchParams.set('client_secret', config.clientSecret);
  url.searchParams.set('grant_type', 'refresh_token');
  url.searchParams.set('refresh_token', refreshToken);
  const tokenRes = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json'
    }
  });
  if (!tokenRes.ok) {
    return;
  }
  const _tokenData = await tokenRes.json();
  const tokenDataParseResult = tokenDataResultType.safeParse(_tokenData);
  if (!tokenDataParseResult.success) {
    return;
  }
  return getTokenCookies(tokenDataParseResult.data, config);
}
async function githubRepoNotFound(req, config) {
  const headers = await refreshGitHubAuth(req, config);
  if (headers) {
    return redirect('/keystatic/repo-not-found', headers);
  }
  return githubLogin(req, config);
}
async function githubLogin(req, config) {
  const reqUrl = new URL(req.url);
  const rawFrom = reqUrl.searchParams.get('from');
  const from = typeof rawFrom === 'string' && keystaticRouteRegex.test(rawFrom) ? rawFrom : '/';
  const state = bytesToHex(node_crypto.webcrypto.getRandomValues(new Uint8Array(10)));
  const url = new URL('https://github.com/login/oauth/authorize');
  url.searchParams.set('client_id', config.clientId);
  url.searchParams.set('redirect_uri', `${reqUrl.origin}/api/keystatic/github/oauth/callback`);
  if (from === '/') {
    return redirect(url.toString());
  }
  url.searchParams.set('state', state);
  return redirect(url.toString(), [['Set-Cookie', cookie__default["default"].serialize('ks-' + state, from, {
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    // 1 day
    maxAge: 60 * 60 * 24,
    expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
    path: '/',
    httpOnly: true
  })]]);
}
async function createdGithubApp(req, slugEnvVarName) {
  if (process.env.NODE_ENV !== 'development') {
    return {
      status: 400,
      body: 'App setup only allowed in development'
    };
  }
  return handleGitHubAppCreation(req, slugEnvVarName);
}
function immediatelyExpiringCookie(name) {
  return cookie__default["default"].serialize(name, '', {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
    expires: new Date()
  });
}

exports.makeGenericAPIRouteHandler = makeGenericAPIRouteHandler;
