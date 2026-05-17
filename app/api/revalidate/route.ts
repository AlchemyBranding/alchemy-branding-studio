import { revalidatePath } from "next/cache";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

/**
 * Sanity Studio publish webhook → Next.js cache revalidation.
 *
 * Setup lives in [docs/sanity-webhook.md](../../../docs/sanity-webhook.md) —
 * the GROQ filter and projection there must stay in sync with the
 * WebhookPayload shape and the route map below.
 */
type WebhookPayload = {
  _type?: string;
  _id?: string;
  slug?: string | null;
  pageKey?: string | null;
};

const pageKeyToPath: Record<string, string> = {
  home: "/",
  about: "/about",
  services: "/services",
  packages: "/services",
  news: "/news",
  contact: "/contact",
  "free-brand-audit": "/free-brand-audit-for-smes",
  "custom-proposal-design": "/custom-proposal-design",
};

function pathsForPayload(p: WebhookPayload): string[] {
  switch (p._type) {
    case "blogPost":
      return ["/", "/news", p.slug ? `/${p.slug}` : null].filter(
        (x): x is string => Boolean(x),
      );
    case "caseStudy":
      return ["/", "/portfolio", p.slug ? `/project/${p.slug}` : null].filter(
        (x): x is string => Boolean(x),
      );
    case "testimonial":
      return ["/"];
    case "teamMember":
      return ["/about"];
    case "author":
      // Authors are dereferenced from blogPost. The post pages re-fetch on
      // their own ISR window — we just need /news so the byline updates show.
      return ["/news"];
    case "pageSeo": {
      const target = p.pageKey ? pageKeyToPath[p.pageKey] : null;
      return target ? [target] : [];
    }
    default:
      return [];
  }
}

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "SANITY_REVALIDATE_SECRET not configured" },
      { status: 500 },
    );
  }

  const { isValidSignature, body } = await parseBody<WebhookPayload>(
    req,
    secret,
  );

  if (isValidSignature === false) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }
  if (!body?._type) {
    return NextResponse.json({ error: "Missing _type" }, { status: 400 });
  }

  const paths = pathsForPayload(body);
  for (const path of paths) revalidatePath(path);

  return NextResponse.json({
    revalidated: paths,
    _type: body._type,
    slug: body.slug ?? null,
  });
}
