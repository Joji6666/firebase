import { db } from "@/firebase";
import {
  DocumentData,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Feeds = () => {
  const [contents, setContents] = useState<DocumentData[]>([]);

  const getContents = async () => {
    const productRef = collection(db, "contents");
    const q = query(productRef, orderBy("date", "asc"));

    await getDocs(q).then((result) => {
      setContents(result.docs);
    });
  };

  useEffect(() => {
    getContents();
  }, []);

  return (
    <section>
      <h2 className="text-2xl">글 목록</h2>
      <ul>
        {contents.map((content, index) => {
          return (
            <li key={index}>
              <Link href={`/detail/${content.id}`}>
                <p>No.:{index + 1}</p>
                <h2>제목: {content.data().title}</h2>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Feeds;
