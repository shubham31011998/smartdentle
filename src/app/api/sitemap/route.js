async function getAllBlogPosts() {
  const url = process.env.NEXT_PUBLIC_SERVER_URL; // Ensure this is set correctly
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    },
  };
  try {
    const response = await fetch(`${url}/smile-dental/blogs`, options); // Adjust the endpoint as necessary
    if (!response.ok) {
      throw new Error("Failed to fetch blog posts");
    }
    const blogs = await response.json();
    return blogs; // Return the fetched blog data
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return []; // Return an empty array on error
  }
}

const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-")
    .trim();
};
export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
  const blogs = await getAllBlogPosts();

  const staticPages = [
    { loc: `${baseUrl}/`, lastmod: '2024-07-15T16:11:02+00:00', priority: '1.0' },
    { loc: `${baseUrl}/aboutus`, lastmod: '2024-07-15T16:11:02+00:00', priority: '0.80' },
    { loc: `${baseUrl}/blogs`, lastmod: '2024-07-15T16:11:02+00:00', priority: '0.80' },
    { loc: `${baseUrl}/contactus`, lastmod: '2024-07-15T16:11:02+00:00', priority: '0.80' },
    { loc: `${baseUrl}/new-patients`, lastmod: '2024-07-15T16:11:02+00:00', priority: '0.80' },
    { loc: `${baseUrl}/insurance`, lastmod: '2024-07-15T16:11:02+00:00', priority: '0.80' },
    { loc: `${baseUrl}/implants`, lastmod: '2024-07-15T16:11:02+00:00', priority: '0.80' },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
        .map(
          (page) => `
        <url>
          <loc>${page.loc}</loc>
          <lastmod>${page.lastmod}</lastmod>
          <priority>${page.priority}</priority>
        </url>
      `
        )
        .join('')}
      ${blogs
        .map(
          (blog) => `
        <url>
          <loc>${baseUrl}/blog/${createSlug(blog?.blog_title)}</loc>
          <lastmod>${new Date(blog.updated_at).toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `
        )
        .join('')}
    </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}