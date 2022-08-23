import type { NextPage } from "next";
import { ReactElement } from "react";
import { HomeLayout } from "../layouts/home.layouts";
import styles from "../styles/home.module.css";
import { Button } from "../components/Common/Buttons";

const HeadContent: React.FC = (): ReactElement => {
  return (
    <section className="flex flex-col items-center">
      <h1 className="text-gray-100 text-6xl font-bold">Welcome To Netflox</h1>
      <h1 className="text-gray-100 text-3xl font-medium">
        Here you will find movie that not exist in other place
      </h1>
      <Button type={"button"}>Test Drive</Button>
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
