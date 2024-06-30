import axios from 'axios';
const API_URL = 'http://172.31.3.60:4000/guestbook';

// 게시글 조회
export const fetchGuestbook = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

// 게시글 추가
export const addGuestbookEntry = async (entry: { userid: string; subject: string; content: string }) => {
  const { data } = await axios.post(API_URL, entry);
  return data;
};

// 게시글 수정
export const updateGuestbookEntry = async (articleno: number, entry: { subject: string; content: string }) => {
  const { data } = await axios.put(`${API_URL}/${articleno}`, entry);
  return data;
};

// 게시글 삭제
export const deleteGuestbookEntry = async (articleno: number) => {
  await axios.delete(`${API_URL}/${articleno}`);
};
