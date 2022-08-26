import { useEffect } from "react";

import { useRouter } from "next/router";
import { supabase } from "../utilities/SupabaseClient";
import { useSetRecoilState } from "recoil";
import { isUserAuthenticated } from "../store/auth";

const Callback = () => {
  const router = useRouter();
  const setAuth = useSetRecoilState(isUserAuthenticated);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, sessionState) => {
        if (sessionState?.user) {
          setAuth(true);
          router.push("/movie/dashboard");
        }
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, [router, setAuth]);

  return null;
};

export default Callback;
