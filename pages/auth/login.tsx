import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, ReactElement, useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isUserAuthenticated } from "../../store/auth";
import { Button } from "../../components/Common/Buttons";
import { TextField } from "../../components/Common/TextField";
import { Navbar } from "../../components/Navbar";
import { HomeLayout } from "../../layouts/home.layouts";
import { getErrorMessage } from "../../utilities/helper";
import { supabase } from "../../utilities/SupabaseClient";

const LoginContent: FC = (): ReactElement => {
  const router = useRouter();
  const [isBannerShow, setBanner] = useState(false);

  const [email, setEmail] = useState({
    email: "",
    status: "",
    errMsg: "",
  });

  setTimeout(() => {
    setBanner(false);
  }, 3000);

  const [password, setPassword] = useState({
    password: "",
    status: "",
    errMsg: "",
  });

  const [error, setError] = useState("");
  const isAuth = useRecoilValue(isUserAuthenticated);
  const setAuth = useSetRecoilState(isUserAuthenticated);

  const onSubmit = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signIn({
        email: email.email,
        password: password.password,
      });

      if (error) throw new Error(error.message);
      setAuth(true);
      router.push("/movie/dashboard");
    } catch (error) {
      setError(getErrorMessage(error));
      setBanner(true);
    }
  };

  const handleSignInWithGitHub = async () => {
    try {
      const { error } = await supabase.auth.signIn(
        {
          provider: "github",
        },
        {
          redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/callback/`,
        }
      );
      if (error) throw new Error(error.message);
    } catch (err) {
      setError(getErrorMessage(err));
      setBanner(true);
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signIn(
        {
          provider: "google",
        },
        {
          redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/callback/`,
        }
      );
      if (error) throw new Error(error.message);
    } catch (err) {
      setError(getErrorMessage(err));
      setBanner(true);
    }
  };

  useEffect(() => {
    if (isAuth) {
      router.push("/movie/dashboard");
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_, sessionState) => {
        if (sessionState?.user) {
          router.push("/movie/dashboard");
        }
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, [isAuth, router]);
  return (
    <section className="flex overflow-hidden flex-col gap-y-4 p-4 rounded-lg md:w-1/2 w-full bg-gray-700">
      <span className="text-2xl font-bold text-white text-center">
        Login to your account
      </span>
      {error.length !== 0 && isBannerShow && (
        <span className="border-2 rounded-lg text-red-600 text-1xl bg-gray-900 border-red-800 w-auto h-auto p-4 items-center justify-center flex">
          {error}
        </span>
      )}
      <TextField
        required
        type={"text"}
        placeholder={"input your Email"}
        value={email.email}
        label={"Email"}
        behaviour={email.status}
        error={email.errMsg}
        labelColor="text-white"
        name={"email"}
        onChange={(e) => {
          setEmail({
            email: e.target.value,
            status: "normal",
            errMsg: "",
          });
        }}
      />
      <TextField
        required
        type={"password"}
        placeholder={"Input your Password"}
        value={password.password}
        behaviour={password.status}
        error={password.errMsg}
        label={"Password"}
        labelColor="text-white"
        name={"password"}
        onChange={(e) => {
          setPassword({
            password: e.target.value,
            status: "normal",
            errMsg: "",
          });
        }}
      />
      <span className="text-white">
        Forgot your password?
        <Link className="text-blue-400 font-medium" href="/auth/forgot">
          <span className="text-blue-400"> Click Here</span>
        </Link>
      </span>
      <Button
        onClick={onSubmit}
        className="text-1xl mt-4 font-medium rounded-lg disabled::bg-blue-200 bg-blue-400 hover:bg-blue-600 text-white"
        type={"submit"}
      >
        Login
      </Button>
      <span className="text-white text-xl text-center">OR</span>
      <Button
        onClick={handleSignInWithGitHub}
        className="text-1xl mt-4 font-medium rounded-lg disabled::bg-blue-200 bg-blue-400 hover:bg-blue-600 text-white"
        type={"submit"}
      >
        Github
      </Button>
      <Button
        onClick={handleSignInWithGoogle}
        className="text-1xl mt-4 font-medium rounded-lg disabled::bg-blue-200 bg-blue-400 hover:bg-blue-600 text-white"
        type={"submit"}
      >
        Google
      </Button>
    </section>
  );
};

const Login: NextPage = (): ReactElement => {
  return (
    <>
      <Navbar />
      <HomeLayout className="bg-gray-800" center>
        <LoginContent />
      </HomeLayout>
    </>
  );
};

export default Login;
