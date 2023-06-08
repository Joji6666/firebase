import React, { useState } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  const singUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        updateProfile(result.user, { displayName: displayName });
        console.log(result, "Sign Up!!!");
        router.push("/");
      })
      .catch((err) => console.log(err));
  };

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result, " login!!!!");
        router.push("/");
      })
      .catch((err) => console.log(err));
  };

  const handleOnChange = (e: any) => {
    if (e.target.type === "email") {
      setEmail(e.target.value);
    } else if (e.target.type === "password") {
      setPassword(e.target.value);
    } else {
      setDisplayName(e.target.value);
    }
  };

  const handleOnClick = () => {
    setIsLogin(!isLogin);
  };

  return (
    <section>
      <input
        className="border"
        type="email"
        placeholder="이메일을 입력해주세요."
        onChange={handleOnChange}
      />
      <input
        className="border"
        type="password"
        placeholder="비밀번호를 입력해주세요."
        onChange={handleOnChange}
      />
      {!isLogin ? (
        <>
          <input
            className="border"
            type="text"
            placeholder="닉네임을 입력해주세요."
            onChange={handleOnChange}
          />
          <button className="border" type="button" onClick={singUp}>
            가입하기
          </button>
        </>
      ) : (
        <button className="border" type="button" onClick={login}>
          로그인
        </button>
      )}

      <p onClick={handleOnClick}>
        {!isLogin ? "이미 계정이 있다면??" : "계정이 없다면??"}
      </p>
    </section>
  );
};

export default Login;
