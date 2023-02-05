import { noteValidationSchema } from "@/schema/form-schema";
import { SBTypes } from "@/supabase/database-types";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const CreateNote: React.FC = () => {
  const supabase = useSupabaseClient<SBTypes>();
  const router = useRouter();
  const user = useUser();
  const onSubmit = async () => {
    const { title, content } = formik.values;
    const { error } = await supabase.from("notes").insert({ title, content, notes_owner_id: user?.id || "" });
    if (error) {
      toast.error("Something went wrong! Please try again later.");
      console.log(error);
      return;
    }
    formik.resetForm();
    toast.success("Note created successfully!");
    router.push("/notes");
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
          data-cy='note-title-input'
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
          data-cy='note-content-input'
          className='textarea textarea-bordered'
        ></textarea>
        <label className='label text-red-500'>{contentError || ""}</label>
        <button type='submit' className='btn btn-active btn-accent mt-4' data-cy='note-submit-btn'>
          Create Note
        </button>
      </form>
    </>
  );
};

export default CreateNote;
