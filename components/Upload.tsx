import { db, storage } from "@/firebase";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Upload = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<null | any>(null);
  const [prevContent, setPrevContent] = useState<any>({});
  const router = useRouter();
  const { id } = router.query;

  const getContent = async () => {
    if (id) {
      const docRef = doc(db, "contents", id.toString());
      getDoc(docRef).then((data) => {
        setPrevContent(data.data());
      });
    }
  };

  useEffect(() => {
    getContent();
  }, [id]);

  const handleOnChange = (e: any) => {
    if (e.target.id === "title") {
      setTitle(e.target.value);
    } else if (e.target.id === "content") {
      setContent(e.target.value);
    } else {
      setImage(e.target.files[0]);
    }
  };

  const uploadContent = async () => {
    const imageStorageRef = ref(storage, `images/${image.name}`);

    await uploadBytes(imageStorageRef, image);

    await getDownloadURL(ref(storage, `images/${image.name}`)).then(
      (result) => {
        addDoc(collection(db, "contents"), {
          title,
          content,
          imageUrl: result,
          date: new Date(),
        }).then((result) => {
          console.log(result, "upload!");
          router.push("/");
        });
      }
    );
  };

  const editContent = async () => {
    if (id) {
      const imageStorageRef = ref(storage, `images/${image.name}`);

      await uploadBytes(imageStorageRef, image);

      await getDownloadURL(ref(storage, `images/${image.name}`)).then(
        (result) => {
          updateDoc(doc(db, "contents", id.toString()), {
            title,
            content,
            imageUrl: result,
            date: new Date(),
          }).then((result) => {
            console.log(result, "upload!");
          });
        }
      );
    }
  };

  return (
    <section className="flex justify-center">
      <div className="flex flex-col w-[600px] h-[600px] items-center justify-center border">
        <h2 className="text-3xl">글 쓰기</h2>
        <input
          defaultValue={id ? prevContent.title : ""}
          id="title"
          className="border w-[400px] h-[40px]"
          type="text"
          placeholder="제목을 입력해주세요."
          onChange={handleOnChange}
        />
        <textarea
          defaultValue={id ? prevContent.content : ""}
          id="content"
          className="border w-[400px] h-[200px]"
          placeholder="내용을 입력해주세요."
          onChange={handleOnChange}
        />
        <input id="image" type="file" onChange={handleOnChange} />
        <button
          className="bg-black text-white mt-16"
          onClick={id ? editContent : uploadContent}
        >
          {id ? "수정" : "업로드"}
        </button>
      </div>
    </section>
  );
};

export default Upload;
