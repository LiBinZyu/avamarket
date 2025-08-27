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
