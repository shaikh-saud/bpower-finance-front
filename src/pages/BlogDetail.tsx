
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
    ChevronLeft,
    Calendar,
    Clock,
    User,
    Share,
    Heart,
    MessageSquare,
    BookOpen
} from "lucide-react";

// Import the mock blog data
import { blogPosts } from "./Blog";

const BlogDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<typeof blogPosts[0] | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [liked, setLiked] = useState(false);

    // Simulate loading the post data
    useEffect(() => {
        // In a real application, this would be an API call
        const timer = setTimeout(() => {
            const foundPost = blogPosts.find(p => p.id === id);
            setPost(foundPost);
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [id]);

    // Share article functionality (simplified example)
    const shareArticle = () => {
        if (navigator.share) {
            navigator.share({
                title: post?.title || "B-Power Blog Article",
                text: post?.excerpt || "Check out this article on B-Power Blog",
                url: window.location.href,
            });
        } else {
            // Fallback if Web Share API not available
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
        }
    };

    if (loading) {
        return <BlogDetailSkeleton />;
    }

    if (!post) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <div className="max-w-md mx-auto bg-muted/30 rounded-lg p-10">
                    <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
                    <p className="mb-6 text-muted-foreground">The article you are looking for doesn't exist or has been moved.</p>
                    <Button asChild>
                        <Link to="/blog">Back to Blog</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>{post.title} | B-Power Blog</title>
                <meta name="description" content={post.excerpt} />
                <meta property="og:title" content={`${post.title} | B-Power Blog`} />
                <meta property="og:description" content={post.excerpt} />
                <meta property="og:image" content={post.image} />
            </Helmet>

            {/* Hero Banner */}
            <div className="relative h-[50vh] min-h-[350px] bg-gradient-to-r from-primary to-primary/80 overflow-hidden">
                <img
                    src={post.image}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/90"></div>

                <div className="absolute inset-0 flex items-end">
                    <div className="container mx-auto px-4 pb-16">
                        <Button variant="outline" asChild className="bg-white/10 backdrop-blur-sm mb-6 hover:bg-white/20 border-white/20 text-white">
                            <Link to="/blog" className="flex items-center">
                                <ChevronLeft className="mr-1 h-4 w-4" />
                                Back to Blog
                            </Link>
                        </Button>

                        <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white mb-4">
                            {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                        </span>

                        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white max-w-3xl">
                            {post.title}
                        </h1>

                        <div className="flex items-center text-sm text-white/80 space-x-4">
                            <div className="flex items-center">
                                <User className="h-4 w-4 mr-2" />
                                <span>{post.author}</span>
                            </div>
                            <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2" />
                                <span>{post.date}</span>
                            </div>
                            <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-2" />
                                <span>{post.readTime} read</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Main Content */}
                    <div className="w-full lg:w-2/3">
                        <div className="bg-white rounded-xl shadow-sm p-6 md:p-10">
                            {/* Article Excerpt */}
                            <div className="mb-8 border-l-4 border-primary pl-6 py-2">
                                <p className="text-xl text-muted-foreground font-serif italic">
                                    {post.excerpt}
                                </p>
                            </div>

                            {/* Article Content */}
                            <article className="prose prose-slate max-w-none lg:prose-lg">
                                <p>
                                    Supply chain finance has emerged as a transformative solution for MSMEs facing cash flow challenges. By leveraging the credit worthiness of their larger customers, small businesses can access working capital at more favorable rates than they might secure independently.
                                </p>

                                <h2 className="text-2xl font-bold mt-8 mb-4 text-primary">Key Benefits for MSMEs</h2>

                                <p>
                                    The advantages of supply chain finance extend beyond immediate cash flow improvements. When implemented effectively, these programs can:
                                </p>

                                <ul className="my-6 space-y-2">
                                    <li className="flex items-start">
                                        <span className="inline-flex items-center justify-center rounded-full bg-primary/10 p-1 mr-3 mt-1">
                                            <span className="h-2 w-2 rounded-full bg-primary"></span>
                                        </span>
                                        Reduce financing costs by 30-50% compared to traditional lending options
                                    </li>
                                    <li className="flex items-start">
                                        <span className="inline-flex items-center justify-center rounded-full bg-primary/10 p-1 mr-3 mt-1">
                                            <span className="h-2 w-2 rounded-full bg-primary"></span>
                                        </span>
                                        Eliminate payment delays that often stretch beyond 90 days
                                    </li>
                                    <li className="flex items-start">
                                        <span className="inline-flex items-center justify-center rounded-full bg-primary/10 p-1 mr-3 mt-1">
                                            <span className="h-2 w-2 rounded-full bg-primary"></span>
                                        </span>
                                        Strengthen relationships with key customers and suppliers
                                    </li>
                                    <li className="flex items-start">
                                        <span className="inline-flex items-center justify-center rounded-full bg-primary/10 p-1 mr-3 mt-1">
                                            <span className="h-2 w-2 rounded-full bg-primary"></span>
                                        </span>
                                        Provide predictable cash flow for better business planning
                                    </li>
                                    <li className="flex items-start">
                                        <span className="inline-flex items-center justify-center rounded-full bg-primary/10 p-1 mr-3 mt-1">
                                            <span className="h-2 w-2 rounded-full bg-primary"></span>
                                        </span>
                                        Support business growth without taking on additional debt
                                    </li>
                                </ul>

                                <h2 className="text-2xl font-bold mt-8 mb-4 text-primary">Implementation Strategies</h2>

                                <p>
                                    For MSMEs looking to participate in supply chain finance programs, preparation is key. Businesses should:
                                </p>

                                <ol className="my-6 space-y-4 counter-reset">
                                    <li className="flex items-start">
                                        <span className="inline-flex items-center justify-center rounded-full bg-primary/10 h-6 w-6 mr-3 mt-1 text-xs font-bold text-primary">1</span>
                                        <div>
                                            <strong className="text-gray-900">Digitize invoicing and payment processes</strong>
                                            <p className="mt-1 text-gray-600">Modern SCF platforms require digital documentation for efficient processing. Ensure your business has digital invoicing capabilities.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="inline-flex items-center justify-center rounded-full bg-primary/10 h-6 w-6 mr-3 mt-1 text-xs font-bold text-primary">2</span>
                                        <div>
                                            <strong className="text-gray-900">Maintain accurate financial records</strong>
                                            <p className="mt-1 text-gray-600">Clean books and transparent reporting build trust with financiers and platforms.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="inline-flex items-center justify-center rounded-full bg-primary/10 h-6 w-6 mr-3 mt-1 text-xs font-bold text-primary">3</span>
                                        <div>
                                            <strong className="text-gray-900">Cultivate relationships with larger clients</strong>
                                            <p className="mt-1 text-gray-600">Your eligibility for SCF often depends on your buyers' participation in such programs.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="inline-flex items-center justify-center rounded-full bg-primary/10 h-6 w-6 mr-3 mt-1 text-xs font-bold text-primary">4</span>
                                        <div>
                                            <strong className="text-gray-900">Research platform options</strong>
                                            <p className="mt-1 text-gray-600">Different SCF platforms specialize in different industries and transaction sizes.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="inline-flex items-center justify-center rounded-full bg-primary/10 h-6 w-6 mr-3 mt-1 text-xs font-bold text-primary">5</span>
                                        <div>
                                            <strong className="text-gray-900">Start with pilot programs</strong>
                                            <p className="mt-1 text-gray-600">Test the waters with a few transactions before full implementation.</p>
                                        </div>
                                    </li>
                                </ol>

                                <blockquote className="bg-primary/5 border-l-4 border-primary p-6 my-8 rounded-r">
                                    <p className="text-lg font-serif italic mb-4">
                                        "Supply chain finance creates a win-win situation where buyers can extend their payment terms while suppliers receive payment sooner, optimizing working capital for both parties."
                                    </p>
                                    <cite className="text-sm text-muted-foreground">— Indian Institute of Banking & Finance</cite>
                                </blockquote>

                                <p>
                                    As digital platforms make these programs increasingly accessible to businesses of all sizes, supply chain finance is positioned to become a cornerstone of MSME financial strategy in the coming years.
                                </p>

                                <div className="bg-muted/30 rounded-lg p-6 mt-8">
                                    <h3 className="text-xl font-bold mb-4 flex items-center">
                                        <BookOpen className="h-5 w-5 mr-2 text-primary" />
                                        Key Takeaways
                                    </h3>
                                    <ul className="space-y-2">
                                        <li className="flex items-start">
                                            <span className="text-primary mr-2">•</span>
                                            Supply chain finance can significantly improve cash flow for MSMEs
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-primary mr-2">•</span>
                                            Digital transformation is a prerequisite for effective SCF implementation
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-primary mr-2">•</span>
                                            Both buyers and suppliers benefit from well-structured SCF programs
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-primary mr-2">•</span>
                                            Start with pilot programs before scaling across your operation
                                        </li>
                                    </ul>
                                </div>
                            </article>

                            {/* Social engagement */}
                            <div className="flex items-center justify-between border-t border-muted mt-8 pt-6">
                                <div className="flex items-center gap-4">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className={`flex items-center gap-1 ${liked ? 'text-red-500' : ''}`}
                                        onClick={() => setLiked(!liked)}
                                    >
                                        <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
                                        <span>{liked ? 'Liked' : 'Like'}</span>
                                    </Button>
                                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                                        <MessageSquare className="h-5 w-5" />
                                        <span>Comment</span>
                                    </Button>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center gap-1"
                                    onClick={shareArticle}
                                >
                                    <Share className="h-5 w-5" />
                                    <span>Share</span>
                                </Button>
                            </div>
                        </div>

                        {/* Author bio */}
                        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mt-8 flex flex-col md:flex-row items-center gap-6">
                            <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
                                {post.author.split(' ').map(part => part[0]).join('')}
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-lg font-bold mb-2">About {post.author}</h3>
                                <p className="text-muted-foreground">
                                    Financial analyst and consultant with over 10 years of experience in the MSME sector.
                                    Specializes in supply chain optimization and working capital management for small businesses.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="w-full lg:w-1/3 space-y-8">
                        {/* Related Articles */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-xl font-bold mb-6 flex items-center">
                                <BookOpen className="h-5 w-5 mr-2 text-primary" />
                                Related Articles
                            </h2>

                            <div className="space-y-6">
                                {blogPosts
                                    .filter(relatedPost => relatedPost.id !== post.id && relatedPost.category === post.category)
                                    .slice(0, 3)
                                    .map(relatedPost => (
                                        <Link
                                            key={relatedPost.id}
                                            to={`/blog/${relatedPost.id}`}
                                            className="flex gap-4 group"
                                        >
                                            <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                                                <img
                                                    src={relatedPost.image}
                                                    alt={relatedPost.title}
                                                    className="h-full w-full object-cover transition-transform group-hover:scale-105 duration-300"
                                                />
                                            </div>
                                            <div>
                                                <h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                                                    {relatedPost.title}
                                                </h3>
                                                <div className="flex items-center mt-1 text-xs text-muted-foreground">
                                                    <Calendar className="h-3 w-3 mr-1" />
                                                    <span>{relatedPost.date}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                            </div>

                            <div className="mt-6 pt-6 border-t border-muted text-center">
                                <Button variant="outline" asChild className="w-full">
                                    <Link to="/blog">View All Articles</Link>
                                </Button>
                            </div>
                        </div>

                        {/* Popular Categories */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-xl font-bold mb-6">Popular Categories</h2>

                            <div className="flex flex-wrap gap-2">
                                {Array.from(new Set(blogPosts.map(post => post.category)))
                                    .map(category => (
                                        <Link
                                            key={category}
                                            to={`/blog?category=${category}`}
                                            className="px-4 py-2 bg-muted rounded-full text-sm font-medium hover:bg-primary/10 transition-colors"
                                        >
                                            {category.charAt(0).toUpperCase() + category.slice(1)}
                                        </Link>
                                    ))}
                            </div>
                        </div>

                        {/* Newsletter signup */}
                        <div className="bg-gradient-to-br from-primary to-primary/80 rounded-xl shadow-sm p-6 text-white">
                            <h2 className="text-xl font-bold mb-3">Subscribe to Our Newsletter</h2>
                            <p className="text-white/80 mb-4">Get the latest MSME finance insights delivered to your inbox</p>

                            <div className="space-y-3">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="w-full px-4 py-2 rounded-md bg-white/10 border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                                />
                                <Button className="w-full bg-white text-primary hover:bg-white/90">
                                    Subscribe
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* More Articles Section */}
                <div className="mt-16">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl md:text-3xl font-bold">Explore More Articles</h2>
                        <div className="mt-2 h-1 w-16 bg-primary mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts
                            .filter(morePosts => morePosts.id !== post.id)
                            .sort(() => 0.5 - Math.random()) // Shuffle array
                            .slice(0, 3)
                            .map(relatedPost => (
                                <Link
                                    key={relatedPost.id}
                                    to={`/blog/${relatedPost.id}`}
                                    className="group"
                                >
                                    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
                                        <div className="aspect-[16/9] overflow-hidden">
                                            <img
                                                src={relatedPost.image}
                                                alt={relatedPost.title}
                                                className="h-full w-full object-cover transition-transform group-hover:scale-105 duration-500"
                                            />
                                        </div>
                                        <div className="p-6 flex-grow">
                                            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-3">
                                                {relatedPost.category.charAt(0).toUpperCase() + relatedPost.category.slice(1)}
                                            </span>
                                            <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">
                                                {relatedPost.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground line-clamp-2">{relatedPost.excerpt}</p>
                                        </div>
                                        <div className="px-6 pb-6 mt-auto flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">{relatedPost.date}</span>
                                            <span className="font-medium">Read article →</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
};

const BlogDetailSkeleton = () => {
    return (
        <>
            {/* Hero Skeleton */}
            <div className="relative h-[50vh] min-h-[350px] bg-muted">
                <div className="absolute inset-0 flex items-end">
                    <div className="container mx-auto px-4 pb-16">
                        <Skeleton className="h-10 w-32 mb-6" />
                        <Skeleton className="h-6 w-24 mb-4" />
                        <Skeleton className="h-12 w-full max-w-3xl mb-4" />
                        <Skeleton className="h-8 w-2/3 max-w-xl mb-4" />
                        <div className="flex gap-4">
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-6 w-32" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Main Content Skeleton */}
                    <div className="w-full lg:w-2/3">
                        <div className="bg-white rounded-xl p-6 md:p-10">
                            <Skeleton className="h-20 w-full mb-8" />

                            <Skeleton className="h-6 w-full mb-4" />
                            <Skeleton className="h-6 w-11/12 mb-4" />
                            <Skeleton className="h-6 w-10/12 mb-8" />

                            <Skeleton className="h-8 w-1/3 mb-4" />
                            <Skeleton className="h-6 w-full mb-2" />
                            <Skeleton className="h-6 w-full mb-6" />

                            <div className="space-y-2 mb-8">
                                <Skeleton className="h-6 w-full" />
                                <Skeleton className="h-6 w-full" />
                                <Skeleton className="h-6 w-full" />
                                <Skeleton className="h-6 w-3/4" />
                            </div>

                            <Skeleton className="h-8 w-1/3 mb-4" />
                            <Skeleton className="h-6 w-full mb-2" />
                            <Skeleton className="h-6 w-full mb-6" />

                            <div className="space-y-4 mb-8">
                                <div className="flex gap-2">
                                    <Skeleton className="h-6 w-6 rounded-full" />
                                    <Skeleton className="h-6 w-full" />
                                </div>
                                <div className="flex gap-2">
                                    <Skeleton className="h-6 w-6 rounded-full" />
                                    <Skeleton className="h-6 w-full" />
                                </div>
                                <div className="flex gap-2">
                                    <Skeleton className="h-6 w-6 rounded-full" />
                                    <Skeleton className="h-6 w-full" />
                                </div>
                            </div>

                            <Skeleton className="h-32 w-full mb-8" />

                            <div className="flex justify-between border-t border-muted mt-8 pt-6">
                                <div className="flex gap-2">
                                    <Skeleton className="h-8 w-20" />
                                    <Skeleton className="h-8 w-24" />
                                </div>
                                <Skeleton className="h-8 w-24" />
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 md:p-8 mt-8 flex flex-col md:flex-row items-center gap-6">
                            <Skeleton className="h-24 w-24 rounded-full" />
                            <div className="flex-1 w-full">
                                <Skeleton className="h-6 w-40 mb-2" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full mt-1" />
                                <Skeleton className="h-4 w-2/3 mt-1" />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Skeleton */}
                    <div className="w-full lg:w-1/3 space-y-8">
                        <div className="bg-white rounded-xl p-6">
                            <Skeleton className="h-8 w-40 mb-6" />

                            <div className="space-y-6">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="flex gap-4">
                                        <Skeleton className="h-16 w-16 rounded-md flex-shrink-0" />
                                        <div className="flex-1">
                                            <Skeleton className="h-5 w-full mb-1" />
                                            <Skeleton className="h-5 w-5/6 mb-2" />
                                            <Skeleton className="h-3 w-20" />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 pt-6 border-t border-muted">
                                <Skeleton className="h-10 w-full" />
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6">
                            <Skeleton className="h-8 w-48 mb-6" />
                            <div className="flex flex-wrap gap-2">
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <Skeleton key={i} className="h-8 w-24 rounded-full" />
                                ))}
                            </div>
                        </div>

                        <div className="bg-muted rounded-xl p-6">
                            <Skeleton className="h-8 w-56 mb-3" />
                            <Skeleton className="h-4 w-full mb-4" />
                            <Skeleton className="h-10 w-full mb-2" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </div>
                </div>

                <div className="mt-16">
                    <div className="text-center mb-10">
                        <Skeleton className="h-10 w-60 mx-auto mb-2" />
                        <div className="h-1 w-16 bg-muted mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm h-full flex flex-col">
                                <Skeleton className="aspect-[16/9] w-full" />
                                <div className="p-6 flex-grow">
                                    <Skeleton className="h-5 w-24 rounded-full mb-3" />
                                    <Skeleton className="h-6 w-full mb-2" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-11/12 mt-1" />
                                </div>
                                <div className="px-6 pb-6 flex justify-between">
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-4 w-24" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogDetail;