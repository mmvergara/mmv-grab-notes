import { authValidationSchema } from "@/schema/form-schema";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";

const AuthPage: React.FC = () => {
  const [authState, setAuthState] = useState<"Login" | "Sign Up">("Login");
  const toggleAuthState = () => setAuthState((s) => (s === "Login" ? "Sign Up" : "Login"));

  const onSubmit = () => {
    const authData = { email: formik.values.email, password: formik.values.password };
  };

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: authValidationSchema,
    onSubmit,
  });
  console.log(formik.values);
  const emailError = formik.touched.email && formik.errors.email;
  const passwordError = formik.touched.password && formik.errors.password;
  console.log(emailError);
  return (
    <>
      <form className='form-control mt-8 w-full max-w-xs mx-auto'>
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
        <button type='submit' className='btn btn-active btn-accent mt-4'>
          {authState}
        </button>
        <button type='button' onClick={toggleAuthState} className='btn btn-outline btn-accent mt-4'>
          {authState === "Login" ? "Create Account" : "I already have an account"}
        </button>
      </form>
    </>
  );
};

export default AuthPage;
