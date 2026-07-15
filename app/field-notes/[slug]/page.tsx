import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { articles } from "@/components/LandingPage/FieldNotes/articles";
import ArticleReader from "@/components/LandingPage/FieldNotes/ArticleReader";

type Params = Promise<{ slug: string }>;

const SITE_URL = "https://www.innovarehp.com";

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return { title: "Article Not Found" };
  }

  return {
    title: `${article.title} | Innovare HP Field Notes`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      url: `${SITE_URL}/field-notes/${article.slug}`,
      type: "article",
      ...(article.image && {
        images: [{ url: article.image, alt: article.title }],
      }),
    },
  };
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return <ArticleReader article={article} />;
}
