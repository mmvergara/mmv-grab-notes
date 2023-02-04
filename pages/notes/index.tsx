import Note from "@/components/note";
import { Notes, SBTypes } from "@/supabase/database-types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

const Notes: React.FC = () => {
  const supabase = useSupabaseClient<SBTypes>();
  const [notes, setNotes] = useState<Notes[]>([]);

  const fetchNotes = async () => {
    const { data, error } = await supabase.from("notes").select("*");
    if (error) {
      console.log(error);
      return;
    }
    setNotes(data);
  };
  useEffect(() => {
    fetchNotes();
  }, []);
  return (
    <section className='flex gap-2 flex-wrap justify-center mx-auto w-screen max-w-[1600px] mt-8 '>
      {notes.map((note) => {
        return <Note key={note.id} id={note.id} title={note.title} content={note.content} date={note.created_at} />;
      })}
    </section>
  );
};

export default Notes;
