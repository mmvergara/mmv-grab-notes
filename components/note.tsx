import { SBTypes } from "@/supabase/database-types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

interface NoteProps {
  id: number;
  title: string;
  content: string;
  date: string;
}

const Note: React.FC<NoteProps> = ({ id, title, content, date }) => {
  const supabase = useSupabaseClient<SBTypes>();
  const [isDeleted, setIsDeleted] = useState(false);
  const handleDelete = async () => {
    const { data, error } = await supabase.from("notes").delete().match({ id });
    if (error) return console.error(error);
    console.log(data);
    setIsDeleted(true);
    toast.success("Note deleted successfully!");
  };

  return (
    <article
      className={`flex flex-col w-max h-max min-w-[300px] max-w-[300px] bg-slate-700 rounded-md p-2 ${isDeleted ? "hidden" : ""}`}
    >
      <h5 className='text-xl font-bold '>{title}</h5>
      <p className='mb-4'>{new Date(date).toLocaleDateString()}</p>
      <p>{content} lorem</p>
      <div className='flex gap-2'>
        <Link href={`/notes/edit?noteid=${id}`} type='button' className='btn btn-outline btn-accent mt-4'>
          Edit
        </Link>
        <button onClick={handleDelete} type='button' className='btn btn-outline btn-error mt-4'>
          Delete
        </button>
      </div>
    </article>
  );
};

export default Note;
