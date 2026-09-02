// Placeholder data for the admin blog list, shaped exactly like the future
// `blogs` database table (title, image, content). Swap this out for a real
// fetch once the database is connected — nothing else on these pages should
// need to change.

export type AdminBlogPost = {
  id: string;
  title: string;
  imageUrl: string;
  content: string;
  createdAt: string;
};

export const dummyBlogs: AdminBlogPost[] = [
  {
    id: "1",
    title: "Getting Started With Our Blog",
    imageUrl: "/images/demo/image1.jpeg",
    content:
      "Welcome to the Blogs section. This is a placeholder post — replace this content with your own once you're ready to publish.\n\nUnlike the Insights above, which focus on longer-form perspective pieces, this space is meant for shorter updates: announcements, quick tips, and things happening around the team.",
    createdAt: "2026-08-12",
  },
  {
    id: "2",
    title: "Why We Chose a Cloud-Agnostic Approach",
    imageUrl: "/images/grow/sap.jpg",
    content:
      "Locking into a single cloud provider can feel efficient at first, but it quietly narrows your options later.\n\nWe've built our delivery model so clients can move between AWS, Azure, and Google Cloud without re-architecting their systems from scratch.",
    createdAt: "2026-08-05",
  },
  {
    id: "3",
    title: "A Second Example Post",
    imageUrl: "/images/demo/image2.jpeg",
    content:
      "This is a second placeholder post, mainly here so you can see how the admin list looks with more than one row.\n\nFeel free to delete both of these dummy posts once you have real content ready.",
    createdAt: "2026-07-28",
  },
  {
    id: "4",
    title: "Salesforce Automations Worth Revisiting",
    imageUrl: "/images/grow/salesforce.jpg",
    content:
      "A lot of Salesforce orgs accumulate automations over the years that nobody fully remembers building.\n\nA regular audit — even once a year — usually turns up a handful of workflows quietly doing nothing useful anymore.",
    createdAt: "2026-07-19",
  },
];
