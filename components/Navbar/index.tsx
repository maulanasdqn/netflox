import Link from "next/link";
import { FC, ReactElement, useState } from "react";
import { useRecoilState } from "recoil";
import { isUserAuthenticated } from "../../store/auth";
import { supabase } from "../../utilities/SupabaseClient";
import { Button } from "../Common/Buttons";

export const Navbar: FC = (): ReactElement => {
  const [isAuth, setAuth] = useRecoilState(isUserAuthenticated);
  const [isOpen, setOpen] = useState(false);
  const userEmail = supabase.auth.user();

  return (
    <header className="bg-gray-700 sticky top-0 z-20 backdrop-filter backdrop-blur-sm justify-between bg-opacity-80 items-center flex w-full p-4">
      <figure className="flex items-center">
        <figcaption className="text-white font-bold">
          <Link href="/movie/dashboard">Netflox</Link>
        </figcaption>
      </figure>
      <nav className="flex gap-x-4 items-center">
        {!isAuth ? (
          <>
            <Button to="/auth/login" size="sm" type={"button"}>
              Login
            </Button>
            <Button
              to="/auth/register"
              behaviour="secondary"
              size="sm"
              type={"button"}
            >
              Register
            </Button>
          </>
        ) : (
          <>
            <span className="text-white text-md font-medium">
              {userEmail?.email}
            </span>
            <div
              onClick={() => setOpen(!isOpen)}
              className="rounded-full bg-white h-[10px] w-[10px] p-4 items-center flex justify-center font-bold text-xs cursor-pointer"
            >
              MS
            </div>
            {isOpen && (
              <section className=" cursor-pointer bg-white border-gray-500 border-2 w-auto p-2 rounded-lg absolute right-4 top-12">
                <span
                  onClick={() => {
                    setAuth(false);
                    supabase.auth.signOut();
                  }}
                  className="text-gray-700 font-medium text-md backdrop-filter bg-opacity-70"
                >
                  Logout
                </span>
              </section>
            )}
          </>
        )}
      </nav>
    </header>
  );
};
