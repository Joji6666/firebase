import { auth, db } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Detail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [content, setContent] = useState<any>({});
  const [user, setUser] = useState<null | any>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user On");
        setUser(user);
        console.log(user.email);
      } else {
        console.log("no user");
      }
    });
  }, []);

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
      router.push("/");
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
      {user && (
        <>
          {user.email === "admin@naver.com" && (
            <>
              <Link href={`/upload/${id}`}>
                <button>수정</button>
              </Link>
              <button onClick={handleDeleteClick}>삭제</button>
            </>
          )}
        </>
      )}
    </section>
  );
};

export default Detail;
