import { supabase } from "./supabase";

export async function getComments(blog_id) {
  const { data, error, status } = supabase
    .from("comment_tbl")
    .select()
    .eq("blog_id", blog_id);

  if (error && status !== 406) {
    throw error;
  }

  return data;
}

export async function addComments(user_name, body, blog_id) {
  const { data, error, status } = await supabase
    .from("comment_tbl")
    .insert([{ user_name: user_name, body: body, blog_id: blog_id }]);

  if (error && status !== 406) {
    throw error;
  }
  
  return data;
}
