import React, { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBlogPostBySlug } from "@/data/blogPosts";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Function to get contextual Unsplash image based on blog content
const getBannerImageUrl = (title: string, content: string): string => {
  const lowerTitle = title.toLowerCase();
  const lowerContent = content.toLowerCase();
  
  // Define keywords and their corresponding Unsplash image queries
  if (lowerTitle.includes('emotional intelligence') || lowerContent.includes('emotional intelligence')) {
    return 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=400&fit=crop&auto=format';
  }
  if (lowerTitle.includes('meta') && lowerTitle.includes('advertising')) {
    return 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=400&fit=crop&auto=format';
  }
  if (lowerTitle.includes('perplexity') || lowerTitle.includes('query') || lowerTitle.includes('search')) {
    return 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=400&fit=crop&auto=format';
  }
  if (lowerTitle.includes('seo') || lowerTitle.includes('schema markup') || lowerTitle.includes('website')) {
    return 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=400&fit=crop&auto=format';
  }
  if (lowerTitle.includes('business') && lowerTitle.includes('ai')) {
    return 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=400&fit=crop&auto=format';
  }
  
  // Default AI/technology image
  return 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=400&fit=crop&auto=format';
};

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [activeSection] = useState("");
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  useEffect(() => {
    if (!post) return;

    document.title = `${post.title} | Fripse AI - Utah AI Consulting`;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', post.excerpt);
    }

    const existingSchema = document.querySelector('#blog-post-schema');
    if (existingSchema) {
      existingSchema.remove();
    }

    const schemaScript = document.createElement('script');
    schemaScript.id = 'blog-post-schema';
    schemaScript.type = 'application/ld+json';

    let keywords = "AI consulting, business automation, artificial intelligence";
    const t = post.title.toLowerCase();
    if (t.includes("emotional intelligence")) {
      keywords = "AI emotional intelligence, GPT-4 EQ, emotionally aware AI, business AI adoption, Fripse AI";
    } else if (t.includes("meta") && t.includes("advertising")) {
      keywords = "Meta AI advertising, automated ad campaigns, AI marketing, Facebook ads automation, digital advertising AI";
    } else if (t.includes("perplexity")) {
      keywords = "Perplexity AI, small business AI strategy, custom AI tools, business automation, AI adoption, internal AI systems";
    } else if (t.includes("seo") && t.includes("ai")) {
      keywords = "AI SEO optimization, schema markup, structured data, AI-first search, Google AI overviews, search engine optimization";
    } else if (t.includes("prepare your website") && t.includes("ai search")) {
      keywords = "AI search optimization, website AI readiness, ChatGPT search, Perplexity discovery, AI visibility, machine readability";
    }

    const schemaData: any = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "alternativeHeadline": post.excerpt,
      "description": post.excerpt,
      "author": {
        "@type": "Organization",
        "name": "Fripse AI",
        "url": "https://fripse.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Fripse AI",
        "logo": {
          "@type": "ImageObject",
          "url": "https://fripse.com/logo.png"
        }
      },
      "datePublished": post.publishedAt,
      "dateModified": post.updatedAt,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://fripse.com/blog/${post.slug}`
      },
      "articleSection": "AI Consulting",
      "keywords": keywords
    };

    if (post.slug === "how-to-prepare-website-age-ai-search") {
      schemaData.mentions = {
        "@type": "Organization",
        "name": "Found For AI",
        "url": "https://foundforai.com"
      };
    }

    schemaScript.textContent = JSON.stringify(schemaData);
    document.head.appendChild(schemaScript);

    return () => {
      document.title = "Fripse AI - Utah AI Consulting for Professional & Service Businesses";
      const md = document.querySelector('meta[name="description"]');
      if (md) {
        md.setAttribute('content', "Utah's premier AI consulting for professional services, home service companies & small businesses. Transform operations with AI automation in Salt Lake City area.");
      }
      const s = document.querySelector('#blog-post-schema');
      if (s) s.remove();
    };
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar activeSection={activeSection} />
        <div className="py-20">
          <div className="container-custom">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog post not found</h1>
              <Link href="/blog">
                <Button variant="outline">Back to Blog</Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activeSection={activeSection} />
      {/* Full-width banner image */}
      <div className="w-full h-64 md:h-80 lg:h-96 overflow-hidden relative mt-28">
        <img 
          src={getBannerImageUrl(post.title, post.content)}
          alt="Fripse AI Blog Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>

      {/* Header */}
      <div className="bg-white border-b">
        <div className="container-custom py-8">
          <Link href="/blog">
            <div className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-6">
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span className="font-medium">Back to Blog</span>
            </div>
          </Link>
          
          {/* Centered title section */}
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            
            <p className="text-sm md:text-base text-gray-500 mb-6">
              {post.author} | {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long', 
                day: 'numeric'
              })}
            </p>
            
            {post.excerpt && (
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                {post.excerpt}
              </p>
            )}
          </div>
          
          {/* Horizontal divider */}
          <hr className="mt-8 mb-0 border-gray-300 max-w-4xl mx-auto" />
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:mb-4 prose-strong:text-gray-900 prose-strong:font-semibold prose-ul:my-4 prose-li:text-gray-700 prose-li:mb-2 prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-6 prose-h1:mt-8 prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-primary prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3 prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ node, ...props }) => {
                  // Handle internal booking link
                  if (props.href === '/booking') {
                    return (
                      <a 
                        {...props} 
                        href="/booking"
                        className="inline-block bg-[#007CFF] text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors no-underline"
                      />
                    );
                  }
                  return (
                    <a 
                      {...props} 
                      className="text-[#007CFF] hover:text-blue-700 underline"
                      target={props.href?.startsWith('http') ? '_blank' : undefined}
                      rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    />
                  );
                },
                h1: ({children}) => <h1 className="text-3xl font-bold mb-6 mt-8 text-gray-900">{children}</h1>,
                h2: ({children}) => <h2 className="text-2xl font-bold mt-8 mb-4 text-primary">{children}</h2>,
                h3: ({children}) => <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900">{children}</h3>,
                p: ({children}) => <p className="mb-4 text-gray-700">{children}</p>,
                strong: ({children}) => <strong className="font-semibold text-gray-900">{children}</strong>,
                ul: ({children}) => <ul className="my-4 list-disc list-inside">{children}</ul>,
                li: ({children}) => <li className="mb-2 text-gray-700">{children}</li>
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BlogPostPage;