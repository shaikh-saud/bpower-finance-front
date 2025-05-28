import React, { useState, useEffect } from "react";
// import { Helmet } from "react-helmet";
// import { Search } from "lucide-react";
import { Search, Calendar, Clock, User } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";

// Mock blog data - would be replaced with API call in production
export const blogPosts = [
    {
        id: "1",
        title: "How MSMEs Can Leverage Supply Chain Finance",
        excerpt: "Discover how supply chain finance solutions can help your business maintain cash flow and grow sustainably.",
        category: "financing",
        author: "Rajesh Kumar",
        date: "2024-04-15",
        readTime: "5 min",
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        featured: true
    },
    {
        id: "2",
        title: "Digital Transformation for Small Businesses",
        excerpt: "Learn how embracing digital tools can revolutionize operations for MSMEs in today's competitive market.",
        category: "technology",
        author: "Priya Singh",
        date: "2024-04-10",
        readTime: "8 min",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "3",
        title: "Government Schemes Supporting MSME Growth",
        excerpt: "A comprehensive guide to government initiatives designed to boost the MSME sector in India.",
        category: "policy",
        author: "Amit Sharma",
        date: "2024-04-05",
        readTime: "6 min",
        image: "https://images.unsplash.com/photo-1444653389962-8149286c578a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "4",
        title: "Navigating Credit Access: A Guide for Small Businesses",
        excerpt: "Understanding the various credit options available to MSMEs and how to qualify for them.",
        category: "financing",
        author: "Neha Gupta",
        date: "2024-03-28",
        readTime: "7 min",
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "5",
        title: "Building Resilient Supply Chains for MSMEs",
        excerpt: "Strategies for creating robust supply chain networks that can withstand market disruptions.",
        category: "operations",
        author: "Sunil Patel",
        date: "2024-03-20",
        readTime: "5 min",
        image: "https://images.unsplash.com/photo-1533073526757-2c8ca1df9f1c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "6",
        title: "Fintech Solutions Transforming MSME Banking",
        excerpt: "Explore how financial technology is making banking more accessible and efficient for small businesses.",
        category: "technology",
        author: "Ananya Desai",
        date: "2024-03-15",
        readTime: "6 min",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "7",
        title: "Sustainable Practices for Forward-Thinking MSMEs",
        excerpt: "How adopting eco-friendly business models can drive growth and customer loyalty.",
        category: "sustainability",
        author: "Vikram Mehta",
        date: "2024-03-08",
        readTime: "8 min",
        image: "https://images.unsplash.com/photo-1535551951406-a19828b0a76b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "8",
        title: "Export Opportunities for Indian MSMEs",
        excerpt: "A step-by-step guide to entering international markets and expanding your business globally.",
        category: "growth",
        author: "Kiran Reddy",
        date: "2024-03-01",
        readTime: "7 min",
        image: "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "9",
        title: "Tax Benefits Every MSME Owner Should Know",
        excerpt: "Essential tax deductions and incentives that can significantly reduce your business tax liability.",
        category: "finance",
        author: "Deepak Verma",
        date: "2024-02-22",
        readTime: "6 min",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "11",
        title: "Inventory Management Best Practices for Small Retailers",
        excerpt: "Optimize your stock levels and reduce costs with these proven inventory control techniques.",
        category: "operations",
        author: "Rahul Joshi",
        date: "2024-02-08",
        readTime: "7 min",
        image: "https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "12",
        title: "Cybersecurity Essentials for MSMEs",
        excerpt: "Protect your business from digital threats with these cost-effective security measures.",
        category: "technology",
        author: "Arjun Shah",
        date: "2024-02-01",
        readTime: "8 min",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "14",
        title: "Green Manufacturing: Sustainable Practices for MSMEs",
        excerpt: "Environmentally friendly production methods that can reduce costs and appeal to eco-conscious consumers.",
        category: "sustainability",
        author: "Sanjay Mehta",
        date: "2024-01-18",
        readTime: "7 min",
        image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },

];

// Extract unique categories
const categories = ["all", ...Array.from(new Set(blogPosts.map(post => post.category)))];

const BlogCard = ({ post }: { post: typeof blogPosts[0] }) => {
    const navigate = useNavigate();

    const viewArticle = () => {
        // Navigate to individual blog post
        navigate(`/blog/${post.id}`);
    };

    return (
        <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-200">
            <div className="relative aspect-[16/9] overflow-hidden">
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
                <div className="absolute top-2 right-2">
                    <span className="inline-flex items-center rounded-full bg-white/80 backdrop-blur-sm px-2.5 py-0.5 text-xs font-medium text-gray-800">
                        {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                    </span>
                </div>
            </div>
            <CardContent className="flex-grow pt-6">
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <span className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        {post.date}
                    </span>
                    <span className="mx-2">•</span>
                    <span className="flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        {post.readTime}
                    </span>
                </div>
                <h3 className="text-xl font-semibold mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
            </CardContent>
            <CardFooter className="pt-0 pb-4">
                <div className="flex justify-between items-center w-full">
                    <span className="flex items-center text-sm font-medium">
                        <User className="mr-1 h-3 w-3" />
                        {post.author}
                    </span>
                    <Button onClick={viewArticle} variant="ghost" size="sm">
                        Read More
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};

const BlogSkeleton = () => {
    return (
        <div className="space-y-3 h-full">
            <Skeleton className="h-[200px] w-full rounded-md" />
            <Skeleton className="h-4 w-1/4 rounded-md" />
            <Skeleton className="h-6 w-3/4 rounded-md" />
            <Skeleton className="h-20 w-full rounded-md" />
            <div className="flex justify-between">
                <Skeleton className="h-4 w-1/4 rounded-md" />
                <Skeleton className="h-8 w-1/4 rounded-md" />
            </div>
        </div>
    );
};

const Blog = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");
    const [filteredPosts, setFilteredPosts] = useState(blogPosts);
    const [loading, setLoading] = useState(true);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    // Calculate pagination values
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    // Simulate loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    // Filter posts based on search term and category
    useEffect(() => {
        const results = blogPosts.filter(post => {
            const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCategory = activeCategory === "all" || post.category === activeCategory;

            return matchesSearch && matchesCategory;
        });

        setFilteredPosts(results);
        setCurrentPage(1); // Reset to first page when filters change
    }, [searchTerm, activeCategory]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Search is already handled by the useEffect
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Scroll to top when changing pages
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <Helmet>
                <title>B-Power Blog | MSME Finance Insights & Resources</title>
                <meta name="description" content="Discover the latest insights on MSME financing, supply chain solutions, and financial technology for small businesses in India." />
                <meta name="keywords" content="MSME financing, supply chain finance, small business loans, business credit, fintech, India MSMEs" />
                <meta property="og:title" content="B-Power Blog | MSME Finance Insights & Resources" />
                <meta property="og:description" content="Expert articles on MSME financing, supply chain solutions, and business growth strategies for Indian entrepreneurs." />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="B-Power Blog | MSME Finance Resources" />
                <meta name="twitter:description" content="Expert articles on MSME financing and business growth." />
                <link rel="canonical" href="https://b-power.com/blog" />
            </Helmet>

            <div className="container mx-auto px-4 py-12 mt-[100px]">
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">B-Power Blog</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Insights, strategies, and resources to help MSMEs thrive in today's business landscape
                    </p>
                </div>

                {/* Search and filters */}
                <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-8">
                    <form onSubmit={handleSearch} className="relative w-full md:w-96">
                        <Input
                            type="text"
                            placeholder="Search articles..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2"
                        />
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    </form>

                    <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full md:w-auto">
                        <TabsList className="h-auto flex flex-wrap gap-1 bg-transparent">
                            {categories.map((category) => (
                                <TabsTrigger
                                    key={category}
                                    value={category}
                                    className="capitalize data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                                >
                                    {category}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                </div>

                {/* Featured article - displayed only when not searching/filtering */}
                {searchTerm === "" && activeCategory === "all" && currentPage === 1 && (
                    <div className="mb-12">
                        {loading ? (
                            <div className="aspect-[21/9] w-full rounded-lg overflow-hidden">
                                <Skeleton className="h-full w-full" />
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted rounded-lg overflow-hidden">
                                {blogPosts.filter(post => post.featured).map(featuredPost => (
                                    <div key={featuredPost.id} className="h-full">
                                        <div className="h-full md:h-80 overflow-hidden">
                                            <img
                                                src={featuredPost.image}
                                                alt={featuredPost.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                ))}
                                <div className="p-6 flex flex-col justify-center">
                                    <span className="text-sm text-primary font-medium mb-2">Featured</span>
                                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                                        {blogPosts.find(post => post.featured)?.title}
                                    </h2>
                                    <p className="mb-6 text-muted-foreground">
                                        {blogPosts.find(post => post.featured)?.excerpt}
                                    </p>
                                    <Button className="self-start">Read Article</Button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Blog post grid - now using currentPosts instead of filteredPosts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        Array(6).fill(0).map((_, i) => (
                            <BlogSkeleton key={i} />
                        ))
                    ) : currentPosts.length > 0 ? (
                        currentPosts.map(post => (
                            <BlogCard key={post.id} post={post} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-24">
                            <h3 className="text-2xl font-medium mb-4">No articles found</h3>
                            <p className="text-muted-foreground mb-8">Try adjusting your search or filter criteria</p>
                            <Button onClick={() => { setSearchTerm(""); setActiveCategory("all"); }}>
                                Reset Filters
                            </Button>
                        </div>
                    )}
                </div>

                {/* Pagination - updated to be functional */}
                {!loading && filteredPosts.length > 0 && (
                    <Pagination className="mt-12">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                />
                            </PaginationItem>

                            {/* Display page numbers */}
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <PaginationItem key={page}>
                                    <PaginationLink
                                        isActive={currentPage === page}
                                        onClick={() => handlePageChange(page)}
                                        className="cursor-pointer"
                                    >
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                )}
            </div>
        </>
    );
};

export default Blog;