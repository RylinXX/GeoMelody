const API_BASE_URL = String(import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

export class ApiError extends Error {
  constructor(message, { status = 0, code = 'API_ERROR', cause } = {}) {
    super(message, cause ? { cause } : undefined);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

export function getApiUrl(path) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
}

export async function requestJson(path, options = {}) {
  let response;
  try {
    response = await fetch(getApiUrl(path), options);
  } catch (cause) {
    throw new ApiError('无法连接社区服务器，请稍后重试。', {
      code: 'NETWORK_ERROR',
      cause
    });
  }

  const contentType = response.headers.get('content-type') || '';
  if (!contentType.toLowerCase().includes('application/json')) {
    throw new ApiError('社区服务器返回了无效响应，请稍后重试。', {
      status: response.status,
      code: 'INVALID_RESPONSE'
    });
  }

  let payload;
  try {
    payload = await response.json();
  } catch (cause) {
    throw new ApiError('社区服务器响应无法解析，请稍后重试。', {
      status: response.status,
      code: 'INVALID_JSON',
      cause
    });
  }

  if (!response.ok || payload?.success === false) {
    throw new ApiError(payload?.error || `请求失败（${response.status}）`, {
      status: response.status,
      code: payload?.code || 'REQUEST_FAILED'
    });
  }

  return payload;
}
