import { db } from "@/firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Detail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [content, setContent] = useState<any>({});

  const getContent = async () => {
    if (id) {
      const docRef = doc(db, "contents", id.toString());
      getDoc(docRef).then((data) => {
        setContent(data.data());
      });
    }
  };

  const handleDeleteClick = async () => {
    await deleteDoc(doc(db, "contents", id!.toString())).then(() => {
      alert("삭제되었습니다.");
    });
  };

  useEffect(() => {
    getContent();
  }, [id]);

  return (
    <section>
      <h2>제목:{content.title}</h2>
      <div>내용:{content.content}</div>
      <Image
        src={content.imageUrl}
        alt="contentImage"
        width={1000}
        height={1000}
      />
      <Link href={`/upload/${id}`}>
        <button>수정</button>
      </Link>
      <button onClick={handleDeleteClick}>삭제</button>
    </section>
  );
};

export default Detail;
