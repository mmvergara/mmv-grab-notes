import { createMiddlewareSupabaseClient, SupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { SBTypes } from "./supabase/database-types";

const getSession = async (supabase: SupabaseClient<SBTypes>) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
};

const redirectTo = (req: NextRequest, redirect: string) => {
  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = redirect;
  redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname);
  return NextResponse.redirect(redirectUrl);
};

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareSupabaseClient<SBTypes>({ req, res });
  const pathName = req.nextUrl.pathname;

  const redirectToHomeIfNotAuth = ["/notes"];
  if (redirectToHomeIfNotAuth.some((x) => pathName.startsWith(x))) {
    const session = await getSession(supabase);

    // Redirect to home if there is no session/auth
    if (!session?.user) return redirectTo(req, "/");
    return res;
  }

  const redirectToHomeIfAuth = ["/auth"];
  if (redirectToHomeIfAuth.some((x) => pathName.startsWith(x))) {
    const session = await getSession(supabase);

    // Redirect to home if there is no session/auth
    if (session?.user) return redirectTo(req, "/");
    return res;
  }
  return res;
}

export const config = {
  matcher: "/:pages*",
};
