import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { CalendarDays, User, ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { pageGraph, SITE } from "@/lib/schema";

// Function to get contextual card image based on blog content
const getCardImageUrl = (title: string, content: string): string => {
  const lowerTitle = title.toLowerCase();
  const lowerContent = content.toLowerCase();
  
  if (lowerTitle.includes('time is money') || lowerTitle.includes('ai buys you both')) {
    return 'https://images.unsplash.com/photo-1692286608119-29c8dee47e12?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  }
  if (lowerTitle.includes('emotional intelligence') || lowerContent.includes('emotional intelligence')) {
    return 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop&auto=format';
  }
  if (lowerTitle.includes('meta') && lowerTitle.includes('advertising')) {
    return 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=200&fit=crop&auto=format';
  }
  if (lowerTitle.includes('perplexity') || lowerTitle.includes('query') || lowerTitle.includes('search')) {
    return 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=200&fit=crop&auto=format';
  }
  if (lowerTitle.includes('seo') || lowerTitle.includes('schema markup') || lowerTitle.includes('website')) {
    return 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop&auto=format';
  }
  if (lowerTitle.includes('business') && lowerTitle.includes('ai')) {
    return 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop&auto=format';
  }
  
  // Default AI/technology image for cards
  return 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop&auto=format';
};

const Blog: React.FC = () => {
  const [activeSection] = useState("");
  const posts = blogPosts;

  const description =
    "Insights, trends, and practical advice on AI transformation, GEO, and small-business AI strategy from Fripse AI.";

  return (
    <div className="min-h-screen bg-gray-50">
      <Seo
        title="Fripse AI Blog — AI strategy for small business"
        description={description}
        path="/blog"
        jsonLd={pageGraph({
          url: `${SITE}/blog`,
          name: "Fripse AI Blog",
          description,
          breadcrumbs: [
            { name: "Home", url: `${SITE}/` },
            { name: "Blog", url: `${SITE}/blog` },
          ],
          extras: [
            {
              "@type": "Blog",
              "@id": `${SITE}/blog#blog`,
              url: `${SITE}/blog`,
              name: "Fripse AI Blog",
              description,
              publisher: { "@id": `${SITE}/#org` },
              blogPost: posts.map((p) => ({
                "@type": "BlogPosting",
                "@id": `${SITE}/blog/${p.slug}#article`,
                headline: p.title,
                url: `${SITE}/blog/${p.slug}`,
                datePublished: p.publishedAt,
              })),
            },
          ],
        })}
      />
      <Navbar activeSection={activeSection} />
      {/* Full-width AI banner image */}
      <div className="w-full h-64 md:h-80 lg:h-96 overflow-hidden relative mt-28">
        <img 
          src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=400&fit=crop&auto=format"
          alt="AI Technology and Innovation"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4">
              Fripse AI Blog
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl leading-relaxed">
              Insights, trends, and practical advice on AI transformation for modern businesses
            </p>
          </div>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="container-custom py-16">
        {posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                {/* Card image */}
                <div className="w-full h-48 overflow-hidden">
                  <img 
                    src={getCardImageUrl(post.title, post.content)}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                    <CalendarDays className="h-4 w-4 ml-2" />
                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                  </div>
                  <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={`/blog/${post.slug}`}>
                    <div className="flex items-center text-primary hover:text-primary/80 transition-colors">
                      <span className="font-medium">Read more</span>
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No blog posts yet</h3>
            <p className="text-gray-600">Check back soon for insights on AI transformation!</p>
          </div>
        )}
      </div>

      {/* Back to Home */}
      <div className="bg-white border-t">
        <div className="container-custom py-8 text-center">
          <Link href="/">
            <div className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
              <ArrowRight className="h-4 w-4 mr-1 rotate-180" />
              <span className="font-medium">Back to Home</span>
            </div>
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Blog;