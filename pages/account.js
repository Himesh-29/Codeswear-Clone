import React, { useEffect } from "react";
import { useRouter } from "next/router";

const account = () => {
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      router.push("/");
    }
  }, [router.query]);
  return <div>account</div>;
};

export default account;
