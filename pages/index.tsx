import type { NextPage } from "next";
import { ReactElement } from "react";
import { HomeLayout } from "../layouts/home.layouts";
import styles from "../styles/home.module.css";
import { Button } from "../components/Common/Buttons";

const HeadContent: React.FC = (): ReactElement => {
  return (
    <section className="flex flex-col items-center text-center md:text-left">
      <h1 className="text-gray-100 lg:text-6xl text-3xl md:text-5xl font-bold">
        Welcome To Netflox
      </h1>
      <h1 className="text-gray-100 text-sm lg:text-3xl md:text-2xl font-medium">
        Here you will find movie that not exist in other universe
      </h1>
      <section className="flex gap-x-4 mt-4">
        <Button to="/auth/login" type={"button"}>
          Login
        </Button>
        <Button to="/auth/register" behaviour="secondary" type={"button"}>
          Register
        </Button>
      </section>
    </section>
  );
};

const Home: NextPage = () => {
  return (
    <>
      <HomeLayout
        center
        className={
          styles.bb +
          " " +
          `bg-gradient-to-r from-indigo-800 via-purple-700 to-pink-600 `
        }
      >
        <HeadContent />
      </HomeLayout>
    </>
  );
};

export default Home;
