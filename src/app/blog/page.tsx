import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";
import { WordPressPosts } from "@/components/blog/WordPressPosts";
import { baseURL, blog, person } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: blog.title,
    description: blog.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(blog.title)}`,
    path: blog.path,
  });
}

export default function Blog() {
  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        title={blog.title}
        description={blog.description}
        path={blog.path}
        image={`/api/og/generate?title=${encodeURIComponent(blog.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}/blog`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column fillWidth gap="l" horizontal="center" marginBottom="xl">
        <Heading variant="heading-strong-xl" wrap="balance">
          {blog.title}
        </Heading>
        <Text variant="body-default-l" onBackground="neutral-weak" wrap="balance">
          {blog.description}
        </Text>
      </Column>
      <WordPressPosts columns="2" limit={6} />
    </Column>
  );
}
