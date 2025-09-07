import { mockSceneListResponse, mockSceneDetailResponse, mockUserInfo, mockTagList } from "../data/mockData";

// 是否使用 mock 数据，建议在 .env 文件中配置 VITE_USE_MOCK=true/false
const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

// 场景 Summary Search API
export async function getSceneList(params) {
  if (USE_MOCK) {
    // 可根据 params 做简单过滤
    return Promise.resolve(mockSceneListResponse);
  }
  // 真实接口
  const res = await fetch("/api/scene/list", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params)
  });
  if (!res.ok) throw new Error("API error: " + res.status);
  return res.json();
}

// 场景详情 API
export async function getSceneDetail(sceneId, userEmail) {
  if (USE_MOCK) {
    return Promise.resolve(mockSceneDetailResponse);
  }
  const url = `/api/scene/detail?sceneId=${encodeURIComponent(sceneId)}&userEmail=${encodeURIComponent(userEmail)}`;
  const res = await fetch(url, { method: "GET" });
  if (!res.ok) throw new Error("API error: " + res.status);
  return res.json();
}

// 用户信息展示 API
export async function getUserInfo(token) {
  if (USE_MOCK) {
    return Promise.resolve(mockUserInfo);
  }
  const res = await fetch("/api/user/info", {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("API error: " + res.status);
  return res.json();
}

// 用户信息编辑 API
export async function editUserInfo(data, token) {
  if (USE_MOCK) {
    // 直接返回 mockUserInfo，实际可合并 data
    return Promise.resolve({ ...mockUserInfo, ...data });
  }
  const res = await fetch("/api/user/edit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("API error: " + res.status);
  return res.json();
}

// 标签表 API
export async function getTagList() {
  if (USE_MOCK) {
    return Promise.resolve(mockTagList);
  }
  const res = await fetch("/api/tag/list");
  if (!res.ok) throw new Error("API error: " + res.status);
  return res.json();
}

// 保留原有 Auth0 认证 API
import { useAuth0 } from "@auth0/auth0-react";
export function useProtectedApi() {
  const { getAccessTokenSilently } = useAuth0();

  // 调用受保护 API
  const fetchProtected = async () => {
    const token = await getAccessTokenSilently({
      audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    });
    const res = await fetch(`${import.meta.env.VITE_API_URL}/protected`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error("API error: " + res.status);
    }
    return res.json();
  };

  return { fetchProtected };
}
