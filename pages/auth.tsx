import { authValidationSchema } from "@/schema/form-schema";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { SBTypes } from "@/supabase/database-types";
import { AuthError } from "@supabase/supabase-js";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import Head from "next/head";

const AuthPage: React.FC = () => {
  const router = useRouter();
  const supabase = useSupabaseClient<SBTypes>();
  const [authState, setAuthState] = useState<"Login" | "Sign Up">("Login");
  
  const toggleAuthState = () => setAuthState((s) => (s === "Login" ? "Sign Up" : "Login"));
  const handleDummyAccLogin = async () => onSubmit({ email: "salt22@gmail.com", password: "salt1234" });

  const onSubmit = async (dummyAccData: { email: string; password: string } | null) => {
    let error: null | AuthError = null;
    const authData = dummyAccData || { email: formik.values.email, password: formik.values.password };
    console.log(authData);
    if (authState === "Login") {
      const { error: err } = await supabase.auth.signInWithPassword(authData);
      if (err) error = err;
    }

    if (authState === "Sign Up") {
      const { error: err } = await supabase.auth.signUp(authData);
      if (err) error = err;
    }
    console.log(error);
    if (error) {
      toast.error("Something went wrong! Please try again later.");
      console.log(error);
    } else {
      toast.success("Logged in successfully!");
      router.push("/");
    }
  };

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: authValidationSchema,
    onSubmit,
  });

  const emailError = formik.touched.email && formik.errors.email;
  const passwordError = formik.touched.password && formik.errors.password;
  return (
    <>
      <Head>
        <title>Grab Quotes | Login</title>
      </Head>
      <form className='form-control mt-8 w-full max-w-xs mx-auto' onSubmit={formik.handleSubmit}>
        <h1 className='w-full text-center text-3xl sm:text-4xl'>{authState}</h1>
        <label className='label'>
          <span className='label-text'>Email</span>
        </label>
        <input
          value={formik.values.email}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          name='email'
          type='email'
          className='input input-bordered w-full max-w-xs'
        />
        <label className='label text-red-500'>{emailError || ""}</label>
        <label className='label'>
          <span className='label-text'>Password</span>
        </label>
        <input
          value={formik.values.password}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          name='password'
          type='text'
          className='input input-bordered w-full max-w-xs'
        />
        <label className='label text-red-500'>{passwordError || ""}</label>
        <button type='submit' className='btn btn-active btn-accent mt-4' data-cy='auth-submit-btn'>
          {authState}
        </button>
        <button
          type='button'
          onClick={toggleAuthState}
          className='btn btn-outline btn-accent mt-4'
          data-cy='auth-state-change-btn'
        >
          {authState === "Login" ? "Create Account" : "I already have an account"}
        </button>
        <button onClick={() => handleDummyAccLogin()} type='button' className='btn  mt-4' data-cy='auth-submit-btn'>
          Login with Dummy Account
        </button>
      </form>
    </>
  );
};

export default AuthPage;
