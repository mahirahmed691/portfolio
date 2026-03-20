export type BlogPost = {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string; // plain text with \n\n for paragraphs
  coverGradient: string; // tailwind gradient classes
};

export const blogPosts: BlogPost[] = [
  {
    slug: "why-most-small-business-websites-fail",
    title: "Why Most Small Business Websites Fail (And How to Fix Yours)",
    subtitle:
      "The gap between a website that looks fine and one that actually converts visitors into clients.",
    date: "2026-02-10",
    readTime: "4 min read",
    tags: ["Design", "Conversion", "Strategy"],
    coverGradient: "from-rose-500/20 via-fuchsia-500/20 to-violet-500/20",
    content: `Most small business websites share the same quiet problem: they exist, but they don't work. They look reasonable enough on the surface — a logo, some copy, a contact form — but they fail to convert the people who actually land on them. Visitors arrive, scan the page for a few seconds, and leave without making contact. The owner never knows why.

The core issue is almost never the colour scheme or the font choice. Those things matter at the margins. The real problem is a fundamental mismatch between what the visitor needs to feel confident reaching out and what the website is actually communicating.

Most small business sites lead with the business, not the client. They open with "We are X Company, established in Y, offering Z services." That framing makes the business feel like it's talking at the visitor rather than with them. The person who landed on your site has a problem they want solved. They're not there to read your origin story. They want to know, within five seconds, whether you can help them and whether they can trust you.

The fix starts with leading with empathy. What does your ideal client type into Google before they find you? What are they worried about? What would make them feel like they've landed in the right place? Your hero section — the very first thing someone sees — should speak directly to that emotional reality, not to your list of services.

Clarity matters more than cleverness. A lot of small business websites try too hard to be interesting and end up being confusing instead. "We deliver transformative solutions for modern challenges" tells a visitor absolutely nothing. "I build websites that get tradespeople more local enquiries" is clear, direct, and immediately valuable. When someone understands exactly what you do and who you do it for, their next step becomes obvious.

The second biggest failure is a weak or absent call to action. If your contact page is buried three clicks deep, or your "Get in touch" button is a low-contrast grey whisper at the bottom of the page, you're creating friction at the exact moment someone is ready to act. Every page of your site should have an obvious, frictionless way to reach you. Not aggressive. Not desperate. Just clearly there.

Social proof is the most underused asset a small business has. Real testimonials — not polished marketing copy, but genuine words from actual clients — build trust faster than almost anything else. A short quote with a name attached is worth ten paragraphs of self-promotional copy. If you have clients who love your work, ask them for a sentence or two. Then put it front and centre, not hidden in a sidebar.

Finally, most small business websites are slow, and slow websites lose business. A site that takes more than three seconds to load will be abandoned by a significant portion of visitors before they see a single word. This is a technical problem, but it has direct commercial consequences. Compress your images, use a proper hosting platform, and test your page speed regularly.

The good news: none of this requires a complete redesign. Often, a few targeted changes — sharper copy in the hero, a more visible contact button, one or two testimonials above the fold — can meaningfully improve how many visitors turn into enquiries. Start with the basics. Speak to your client's problem first. Make it easy to reach you. Show that others trust you. The website you already have might just need a better focus.`,
  },
  {
    slug: "building-brand-identity-on-a-budget",
    title: "Building a Strong Brand Identity Without a Big Budget",
    subtitle:
      "How founders and small teams can punch above their weight visually.",
    date: "2026-03-05",
    readTime: "5 min read",
    tags: ["Branding", "Design", "Startups"],
    coverGradient: "from-cyan-500/20 via-blue-500/20 to-violet-500/20",
    content: `Brand identity isn't just a logo. That's the most common misconception small business owners carry into the process of building their visual presence, and it's the misconception that leads them to spend £50 on a Fiverr logo, call it done, and then wonder why their brand still doesn't feel like anything.

A brand identity is the full system of how your business presents itself visually and tonally: your logo, yes, but also your colour palette, your typography, the way you write your copy, the kinds of images you use, and the feeling those things create together when someone encounters your work. When all of those elements are consistent and intentional, something surprising happens — the business starts to feel bigger, more established, and more trustworthy than it might otherwise seem.

The good news is that a tight, coherent visual identity doesn't require a big agency budget. It requires decisions. Most small businesses don't have a weak brand because they can't afford better — they have a weak brand because they've never made deliberate choices about what they want their brand to communicate.

Start with what you want people to feel. Before you pick colours or fonts, ask yourself: when a potential client lands on your website or sees your social media for the first time, what do you want them to feel? Reliable and professional? Creative and experimental? Warm and approachable? That emotional target shapes every visual decision that follows. It's not a vague exercise — it's the foundation.

Constraint is your friend. One of the most reliable ways to look polished on a limited budget is to limit your palette. Pick two or three colours and use only those. Choose one or two fonts — ideally a strong display face for headings and a simple, readable one for body text — and stick to them across everything. Consistency at a small scale reads as intentionality. The brands that look amateurish almost always use too many colours, too many fonts, and too many visual styles all at once.

Typography does more heavy lifting than most people realise. A well-chosen typeface can make a simple logo or a plain website feel genuinely premium. Google Fonts and free font services like Fontsource have dramatically improved in recent years. You don't need to pay for a custom typeface. You do need to spend time choosing one that fits your brand's character and then use it consistently and well.

Photography and imagery is where budget constraints hurt the most, but there are smart workarounds. Unsplash and similar platforms have improved significantly and can provide decent photography for free. Better yet, if your business has a physical product or a workspace, invest a small amount of time in taking real photographs with good light and a clean background. Authentic imagery — even if it's imperfect — beats stock photography almost every time, because it communicates something no stock image can: that the person behind the brand is real.

Your tone of voice is part of your brand identity too, and it costs nothing to develop. How you write on your website, in your emails, on social media — formal or casual, warm or precise, direct or expansive — all of it contributes to how people experience your brand. Spend time defining your tone, write it down, and apply it consistently.

The final piece is application. Even the best-designed brand system falls apart if it's applied inconsistently. Your logo should look the same on your website, your invoices, your email signature, and your social profiles. Your colours should be used in the same proportions. Your fonts should be the same size and weight across contexts. Consistency is what makes the pieces add up to something greater than the sum of their parts.

You don't need a big budget to build a brand that punches above its weight. You need clarity about what you want to communicate, the discipline to make deliberate choices, and the consistency to apply those choices everywhere. Start there, and the visual quality will follow.`,
  },
];
