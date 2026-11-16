// 역할: 위키 관리 화면에 필요한 서버 데이터(카테고리·항목 목록)를 불러오고,
//       카테고리·항목 등록/수정/삭제와 이미지 업로드 뒤에는 목록을 다시 불러온다.
// 사용처: AdminWikiManagement.jsx
// 담당자: 김재웅

import { useCallback, useEffect, useState } from "react";
import {
  createWikiCategory,
  createWikiItem,
  deleteWikiCategory,
  deleteWikiItem,
  updateWikiItem,
  uploadMedia,
} from "../../../../../api/adminApi";
import { fetchWikiItem, fetchWikiList } from "../../../../../api/wikiApi";
import { API_BASE_URL } from "../../../../../config/apiConfig";
import { parseApiError } from "../../../../../utils/apiErrorUtils";

// 서버 응답(categoryId, categoryName ...)을 화면에서 쓰는 이름(id, name ...)으로 바꾼다.
const toCategory = (category) => ({
  id: category.categoryId,
  icon: category.icon,
  name: category.categoryName,
  items: category.items.map((item) => ({ id: item.itemId, icon: item.icon, title: item.title })),
});

// 업로드 이미지는 "/media/..." 상대 주소로 내려오므로 서버 주소를 붙여 화면에 보여준다.
const toMediaSrc = (url) => (/^https?:\/\//.test(url) ? url : `${API_BASE_URL}${url}`);

export default function useWikiManagement() {
  const [categories, setCategories] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const reload = useCallback(async () => {
    const data = await fetchWikiList();
    setCategories(data.map(toCategory));
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetchWikiList()
      .then((data) => {
        if (!cancelled) setCategories(data.map(toCategory));
      })
      .catch((err) => {
        if (!cancelled) setErrorMessage(parseApiError(err).message);
      })
      .finally(() => {
        if (!cancelled) setIsLoaded(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // 폼 안에서 쓰는 동작은 성공하면 undefined, 실패하면 폼에 보여줄 오류 문구를 돌려준다.
  const createCategory = async ({ icon, name }) => {
    try {
      await createWikiCategory({ categoryName: name, icon });
      await reload();
      return undefined;
    } catch (err) {
      return parseApiError(err).message;
    }
  };

  // 새로 고른 이미지만 업로드하고, 기존 이미지는 그대로 ID를 써서 화면에 보이는 순서의 ID 배열을 만든다.
  const resolveMediaIds = (images) => Promise.all(images.map(async (image) => {
    if (image.mediaId) return image.mediaId;
    const uploaded = await uploadMedia(image.file);
    return uploaded.mediaId;
  }));

  const createItem = async (categoryId, { icon, title, content, images }) => {
    try {
      const mediaId = await resolveMediaIds(images);
      await createWikiItem({ categoryId, icon, title, content, mediaId });
      await reload();
      return undefined;
    } catch (err) {
      return parseApiError(err).message;
    }
  };

  // 이미지를 건드리지 않았으면 mediaId를 보내지 않아 서버가 기존 이미지를 그대로 둔다.
  const updateItem = async (itemId, { icon, title, content, images, imagesChanged }) => {
    try {
      const body = { itemId, icon, title, content };
      if (imagesChanged) body.mediaId = await resolveMediaIds(images);
      await updateWikiItem(body);
      await reload();
      return undefined;
    } catch (err) {
      return parseApiError(err).message;
    }
  };

  // 목록에는 본문이 없어서, 수정 폼을 열 때 상세를 불러와 현재 값(본문·이미지)을 채운다.
  const loadItemForEdit = async (item) => {
    const detail = await fetchWikiItem(item.id);
    const mediaIds = detail.mediaId ?? [];

    return {
      icon: item.icon,
      title: detail.title,
      content: detail.content,
      images: detail.mediaUrl.map((url, index) => ({
        id: `saved-${mediaIds[index] ?? index}`,
        mediaId: mediaIds[index],
        url: toMediaSrc(url),
      })),
    };
  };

  const removeCategory = async (categoryId) => {
    setErrorMessage("");
    try {
      await deleteWikiCategory(categoryId);
      await reload();
    } catch (err) {
      setErrorMessage(parseApiError(err).message);
    }
  };

  const removeItem = async (itemId) => {
    setErrorMessage("");
    try {
      await deleteWikiItem(itemId);
      await reload();
    } catch (err) {
      setErrorMessage(parseApiError(err).message);
    }
  };

  return {
    categories,
    isLoaded,
    errorMessage,
    setErrorMessage,
    createCategory,
    createItem,
    updateItem,
    loadItemForEdit,
    removeCategory,
    removeItem,
  };
}
