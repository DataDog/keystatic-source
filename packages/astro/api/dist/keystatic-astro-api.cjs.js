'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var generic = require('@keystatic/core/api/generic');
var setCookieParser = require('set-cookie-parser');

function makeHandler(_config) {
  var _config$clientId, _config$clientSecret, _config$secret;
  const handler = generic.makeGenericAPIRouteHandler({
    ..._config,
    clientId: (_config$clientId = _config.clientId) !== null && _config$clientId !== void 0 ? _config$clientId : tryOrUndefined(() => undefined.KEYSTATIC_GITHUB_CLIENT_ID),
    clientSecret: (_config$clientSecret = _config.clientSecret) !== null && _config$clientSecret !== void 0 ? _config$clientSecret : tryOrUndefined(() => undefined.KEYSTATIC_GITHUB_CLIENT_SECRET),
    secret: (_config$secret = _config.secret) !== null && _config$secret !== void 0 ? _config$secret : tryOrUndefined(() => undefined.KEYSTATIC_SECRET)
  }, {
    slugEnvName: 'PUBLIC_KEYSTATIC_GITHUB_APP_SLUG'
  });
  return async function keystaticAPIRoute(context) {
    const {
      body,
      headers,
      status
    } = await handler(context.request);
    // all this stuff should be able to go away when astro is using a version of undici with getSetCookie
    let headersInADifferentStructure = new Map();
    if (headers) {
      if (Array.isArray(headers)) {
        for (const [key, value] of headers) {
          if (!headersInADifferentStructure.has(key.toLowerCase())) {
            headersInADifferentStructure.set(key.toLowerCase(), []);
          }
          headersInADifferentStructure.get(key.toLowerCase()).push(value);
        }
      } else if (typeof headers.entries === 'function') {
        for (const [key, value] of headers.entries()) {
          headersInADifferentStructure.set(key.toLowerCase(), [value]);
        }
        if ('getSetCookie' in headers && typeof headers.getSetCookie === 'function') {
          const setCookieHeaders = headers.getSetCookie();
          if (setCookieHeaders !== null && setCookieHeaders !== void 0 && setCookieHeaders.length) {
            headersInADifferentStructure.set('set-cookie', setCookieHeaders);
          }
        }
      } else {
        for (const [key, value] of Object.entries(headers)) {
          headersInADifferentStructure.set(key.toLowerCase(), [value]);
        }
      }
    }
    const setCookieHeaders = headersInADifferentStructure.get('set-cookie');
    headersInADifferentStructure.delete('set-cookie');
    if (setCookieHeaders) {
      for (const setCookieValue of setCookieHeaders) {
        var _options$sameSite;
        const {
          name,
          value,
          ...options
        } = setCookieParser.parseString(setCookieValue);
        const sameSite = (_options$sameSite = options.sameSite) === null || _options$sameSite === void 0 ? void 0 : _options$sameSite.toLowerCase();
        context.cookies.set(name, value, {
          domain: options.domain,
          expires: options.expires,
          httpOnly: options.httpOnly,
          maxAge: options.maxAge,
          path: options.path,
          sameSite: sameSite === 'lax' || sameSite === 'strict' || sameSite === 'none' ? sameSite : undefined
        });
      }
    }
    return new Response(body, {
      status,
      headers: [...headersInADifferentStructure.entries()].flatMap(([key, val]) => val.map(x => [key, x]))
    });
  };
}
function tryOrUndefined(fn) {
  try {
    return fn();
  } catch {
    return undefined;
  }
}

exports.makeHandler = makeHandler;
