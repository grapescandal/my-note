import { Note } from "../types";

const BASE_URL =
  process.env.REACT_APP_API_URL ??
  (process.env.NODE_ENV === "development" ? "http://localhost:8080" : "");

console.log("API BASE_URL", BASE_URL);

function url(path: string) {
  return BASE_URL ? `${BASE_URL.replace(/\/$/, "")}${path}` : path;
}

async function handleResponse<T>(res: Response, method?: string): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText} ${text}`);
  }

  let data: any = undefined;
  try {
    data = await res.json();
  } catch (e) {
    // no JSON body (e.g., 204 No Content)
  }
  console.log("API response", {
    method: method ?? "GET",
    url: res.url,
    status: res.status,
    data,
  });
  return data as T;
}

export async function fetchNotes(): Promise<Note[]> {
  const res = await fetch(url("/api/notes"));
  return handleResponse<Note[]>(res, "GET");
}

export async function fetchNoteById(id: string): Promise<Note> {
  const res = await fetch(url(`/api/notes/${encodeURIComponent(id)}`));
  return handleResponse<Note>(res, "GET");
}

export async function saveNote(payload: {
  id?: string;
  title: string;
  content?: string;
}): Promise<Note> {
  const res = await fetch(url("/api/notes"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse<Note>(res, "POST");
}

export async function deleteNote(id: string): Promise<void> {
  const res = await fetch(url(`/api/notes/${encodeURIComponent(id)}`), {
    method: "DELETE",
  });
  await handleResponse<void>(res, "DELETE");
}

const api = { fetchNotes, fetchNoteById, saveNote, deleteNote };
export default api;
