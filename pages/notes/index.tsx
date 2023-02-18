import Note from "@/components/note";
import { Notes, SBTypes } from "@/supabase/database-types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

const Notes: React.FC = () => {
  const supabase = useSupabaseClient<SBTypes>();
  const [notes, setNotes] = useState<Notes[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchNotes = async () => {
    console.log("feching notes");
    const { data, error } = await supabase.from("notes").select("*").order("created_at", { ascending: false });
    if (error) return console.log(error);

    setNotes(data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
      <Head>
        <title>Grab Quotes | Notes</title>
      </Head>
      <Link
        href={"/notes/create"}
        className='flex btn btn-success w-[400px] mx-auto mt-4'
        data-cy='create-note-page-btn'
      >
        Create Note
      </Link>
      <section className='flex gap-2 flex-wrap justify-center mx-auto w-screen max-w-[1600px] mt-4 '>
        {isLoading && <h2>Loading</h2>}
        {!isLoading &&
          notes.map((note) => {
            return <Note key={note.id} id={note.id} title={note.title} content={note.content} date={note.created_at} />;
          })}
      </section>
    </>
  );
};

export default Notes;
