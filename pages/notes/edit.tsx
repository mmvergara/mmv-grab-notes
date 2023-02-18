import { noteValidationSchema } from "@/schema/form-schema";
import { SBTypes } from "@/supabase/database-types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useFormik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";

const EditNotePage: React.FC = () => {
  const supabase = useSupabaseClient<SBTypes>();
  const router = useRouter();
  const noteid = router.query.noteid as string;

  const handleEdit = async () => {
    const { title, content } = formik.values;
    const { data, error } = await supabase.from("notes").update({ title, content }).match({ id: noteid });
    if (error) {
      toast.error("Something went wrong! Please try again later.");
      console.error(error);
      return;
    }
    console.log(data);
    toast.success("Note updated successfully!");
    router.push("/notes");
  };

  const formik = useFormik({
    initialValues: { title: "", content: "" },
    validationSchema: noteValidationSchema,
    onSubmit: handleEdit,
  });
  const fetchNote = async () => {
    const { data, error } = await supabase.from("notes").select("*").match({ id: noteid });
    if (error) {
      console.error(error);
      return;
    }
    await formik.setValues({ title: data[0].title, content: data[0].content });
  };

  useEffect(() => {
    fetchNote();
  }, []);

  const titleError = formik.touched.title && formik.errors.title;
  const contentError = formik.touched.content && formik.errors.content;
  return (
    <>
      <Head>
        <title>Grab Quotes | Edit</title>
      </Head>
      <form className='form-control mt-8 w-full max-w-xs mx-auto' onSubmit={formik.handleSubmit}>
        <h1 className='w-full text-center text-3xl sm:text-4xl mb-8'>Edit Note id:{noteid}</h1>
        <label className='label'>
          <span className='label-text'>Note Title</span>
        </label>
        <input
          value={formik.values.title}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          name='title'
          type='text'
          className='input input-bordered w-full max-w-xs'
          data-cy='note-title-input-edit'
        />
        <label className='label text-red-500'>{titleError || ""}</label>
        <label className='label'>
          <span className='label-text'>Content</span>
        </label>
        <textarea
          value={formik.values.content}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          name='content'
          className='textarea textarea-bordered'
          data-cy='note-content-input-edit'
        ></textarea>
        <label className='label text-red-500'>{contentError || ""}</label>
        <button type='submit' className='btn btn-active btn-accent mt-4' data-cy='note-submit-btn-edit'>
          Edit Note
        </button>
      </form>
    </>
  );
};

export default EditNotePage;
