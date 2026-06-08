import { NextResponse } from "next/server";

const WORDPRESS_URL = process.env.WORDPRESS_URL || "https://www.vidorra.life";
const POSTS_PER_PAGE = parseInt(process.env.WORDPRESS_POSTS_PER_PAGE || "6");

type WordPressPost = {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  link: string;
  date: string;
  featured_media: number;
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
    }>;
  };
};

type FormattedPost = {
  id: number;
  title: string;
  excerpt: string;
  link: string;
  date: string;
  image: string | null;
};

async function fetchWordPressPosts(): Promise<FormattedPost[]> {
  try {
    const response = await fetch(
      `${WORDPRESS_URL}/wp-json/wp/v2/posts?per_page=${POSTS_PER_PAGE}&_embed`,
      {
        next: { revalidate: 3600 }, // 缓存 1 小时
      }
    );

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`);
    }

    const posts: WordPressPost[] = await response.json();

    return posts.map((post) => ({
      id: post.id,
      title: post.title.rendered,
      excerpt: post.excerpt.rendered.replace(/<[^>]*>/g, "").substring(0, 150) + "...",
      link: post.link,
      date: post.date,
      image: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
    }));
  } catch (error) {
    console.error("Failed to fetch WordPress posts:", error);
    return [];
  }
}

export async function GET() {
  try {
    const posts = await fetchWordPressPosts();

    return NextResponse.json({
      success: true,
      posts,
      source: WORDPRESS_URL,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch posts",
        posts: [],
      },
      { status: 500 }
    );
  }
}
