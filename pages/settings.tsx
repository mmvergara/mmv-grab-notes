import { SBTypes } from "@/supabase/database-types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const SettingsPage: React.FC = () => {
  const supabase = useSupabaseClient<SBTypes>();
  const router = useRouter();
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) return toast.error(error.message);
    toast.success("Logged out successfully");
    router.push("/");
  };

  return (
    <section className='mt-8 flex flex-col justify-center items-center gap-2'>
      <button className='btn btn-error' onClick={handleLogout}>Logout</button>
      <button className='btn btn-accent'>Logout</button>
    </section>
  );
};

export default SettingsPage;
