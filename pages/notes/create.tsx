import { noteValidationSchema } from "@/schema/form-schema";
import { SBTypes } from "@/supabase/database-types";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useFormik } from "formik";

const CreateNote: React.FC = () => {
  const supabase = useSupabaseClient<SBTypes>();
  const user = useUser();
  const onSubmit = async () => {
    const { title, content } = formik.values;
    const { data, error } = await supabase.from("notes").insert({ title, content, notes_owner_id: user?.id || "" });
    if (error) {
      console.log(error);
      return;
    }
    console.log(data);
  };

  const formik = useFormik({
    initialValues: { title: "", content: "" },
    validationSchema: noteValidationSchema,
    onSubmit,
  });

  const titleError = formik.touched.title && formik.errors.title;
  const contentError = formik.touched.content && formik.errors.content;
  return (
    <>
      <form className='form-control mt-8 w-full max-w-xs mx-auto' onSubmit={formik.handleSubmit}>
        <h1 className='w-full text-center text-3xl sm:text-4xl mb-8'>Create New Note</h1>
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
        ></textarea>
        <label className='label text-red-500'>{contentError || ""}</label>
        <button type='submit' className='btn btn-active btn-accent mt-4'>
          Create Note
        </button>
      </form>
    </>
  );
};

export default CreateNote;
