import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Article } from "../dummy";

export const ArticlePage = () => {
  const { goBack } = useHistory();
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article>();
  useEffect(() => {
    axios
      .get(`http://localhost:8000/articles/${id}`)
      .then(({ data }) => setArticle(data));
  }, [id]);

  if (!article) return <>404 NOT FOUND</>;

  return (
    <>
      <div className="flex p-2 space-x-2">
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-md"
          onClick={goBack}
        >
          뒤로가기
        </button>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-md"
          onClick={async () => {
            await axios.delete(`http://localhost:8000/articles/${id}`);
            goBack();
          }}
        >
          삭제
        </button>
      </div>
      <p>{article.title}</p>
      <img src={article.thumbnail} alt="thumb" />
      <p>{article.contents}</p>
    </>
  );
};
