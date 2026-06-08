"use client";

import { useEffect, useState } from "react";
import { Grid, Card, Text, Heading, SmartLink, Flex, Badge } from "@once-ui-system/core";
import { formatDate } from "@/utils/formatDate";

type WordPressPost = {
  id: number;
  title: string;
  excerpt: string;
  link: string;
  date: string;
  image: string | null;
};

type WordPressPostsProps = {
  columns?: "1" | "2" | "3";
  limit?: number;
};

// 生成 Unsplash 随机图片 URL
const getUnsplashUrl = (seed: number) => {
  const topics = ["technology", "code", "programming", "computer", "digital"];
  const topic = topics[seed % topics.length];
  return `https://source.unsplash.com/random/1200x630/?${topic}&sig=${seed}`;
};

export const WordPressPosts: React.FC<WordPressPostsProps> = ({
  columns = "2",
  limit = 6,
}) => {
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/wordpress");
        const data = await response.json();

        if (data.success) {
          setPosts(data.posts.slice(0, limit));
        } else {
          setError("Failed to load posts");
        }
      } catch (err) {
        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [limit]);

  if (loading) {
    return (
      <Grid columns={columns} s={{ columns: "1" }} fillWidth gap="16">
        {Array.from({ length: limit }).map((_, i) => (
          <Card
            key={i}
            background="surface"
            border="neutral-alpha-weak"
            padding="m"
            radius="l"
          >
            <Flex direction="column" gap="s">
              <div
                style={{
                  height: "200px",
                  background: "var(--neutral-alpha-weak)",
                  borderRadius: "8px",
                }}
              />
              <div
                style={{
                  height: "24px",
                  width: "80%",
                  background: "var(--neutral-alpha-weak)",
                  borderRadius: "4px",
                }}
              />
              <div
                style={{
                  height: "16px",
                  width: "60%",
                  background: "var(--neutral-alpha-weak)",
                  borderRadius: "4px",
                }}
              />
            </Flex>
          </Card>
        ))}
      </Grid>
    );
  }

  if (error) {
    return (
      <Flex fillWidth horizontal="center" padding="xl">
        <Text onBackground="neutral-weak">{error}</Text>
      </Flex>
    );
  }

  if (posts.length === 0) {
    return (
      <Flex fillWidth horizontal="center" padding="xl">
        <Text onBackground="neutral-weak">No posts available</Text>
      </Flex>
    );
  }

  return (
    <Grid columns={columns} s={{ columns: "1" }} fillWidth gap="16">
      {posts.map((post, index) => (
        <SmartLink
          key={post.id}
          href={post.link}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Card
            background="surface"
            border="neutral-alpha-weak"
            padding="m"
            radius="l"
          >
            <Flex direction="column" gap="s">
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  overflow: "hidden",
                  background: "var(--neutral-alpha-weak)",
                }}
              >
                <img
                  src={post.image || getUnsplashUrl(post.id)}
                  alt={post.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    // 如果 Unsplash 图片加载失败，使用备用图片
                    const target = e.target as HTMLImageElement;
                    target.src = `https://picsum.photos/1200/630?random=${post.id}`;
                  }}
                />
              </div>
              <Heading variant="heading-strong-s" wrap="balance">
                {post.title}
              </Heading>
              <Text variant="body-default-s" onBackground="neutral-weak">
                {formatDate(post.date, true)}
              </Text>
              <Text variant="body-default-s" onBackground="neutral-weak" wrap="balance">
                {post.excerpt}
              </Text>
              <Badge
                background="brand-alpha-weak"
                paddingX="8"
                paddingY="4"
                textVariant="label-default-s"
              >
                Read on WordPress
              </Badge>
            </Flex>
          </Card>
        </SmartLink>
      ))}
    </Grid>
  );
};
