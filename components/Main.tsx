import React, { useEffect, useState } from "react";
import Feeds from "./Feeds";
import Link from "next/link";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase";

const Main = () => {
  const [isUserOn, setIsUserOn] = useState<null | any>(null);
  const [userName, setUserName] = useState<null | string>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user On");
        setIsUserOn(user);
        setUserName(user.displayName);
      } else {
        console.log("no user");
      }
    });
  }, []);

  const logOut = () => {
    signOut(auth).then((result) => {
      console.log(result, "log out");
      setIsUserOn(null);
    });
  };
  return (
    <section className="flex flex-col items-center justify-center">
      <h2>My Blog</h2>
      <div className="flex space-x-[300px] mt-10">
        <div>
          <Feeds />
        </div>
        {!isUserOn ? (
          <Link href={"/login"}>
            <button>로그인</button>
          </Link>
        ) : (
          <div className="border w-[300px] h-[200px] flex flex-col items-center justify-center">
            <p>이름:{userName}</p>
            <button
              className="border bg-black text-white hover:bg-slate-500"
              onClick={logOut}
            >
              로그아웃
            </button>
            {isUserOn.email === "admin@naver.com" && (
              <Link href={"/upload"}>
                <button>업로드</button>
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Main;
