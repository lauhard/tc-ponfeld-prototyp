import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import { renderHtml } from "$lib";
import { create } from "domain";
import type { BlogPost } from "../../../app";

export const load: PageServerLoad = async ({ params, url }) => {
  let { slug } = params as { slug: string };
  let response = await fetch(`${url.origin}/api/post/${slug}`);
  if (response.status === 404) {
    throw error(404, 'Nicht gefunden');
  }
  let responseData = await response.json() as BlogPost;
  console.log('Loaded Post:', responseData.post.html);

  //if (!responseData.post) throw error(404, 'Nicht gefunden');
  //convert date to valid html date

  return {
    post: responseData.post.html,
    metadata: {
      title: responseData.post.title,
      createdAt: new Date(responseData.post.createdAt).toISOString(),
      updatedAt: new Date(responseData.post.updatedAt).toISOString()
    }
  };
};