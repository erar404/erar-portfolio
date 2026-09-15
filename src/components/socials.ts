import { profile } from "@/data/profile";
import { GitHubIcon, GoogleDevIcon, LinkedInIcon, MailIcon } from "./Icons";

/** Single source for the profile links shown in the hero, contact list and footer. */
export const socials = [
  { label: "GitHub", href: profile.links.github, handle: "erar404", display: "github.com/erar404", Icon: GitHubIcon },
  { label: "LinkedIn", href: profile.links.linkedin, handle: "erwinarellano", display: "linkedin.com/in/erwinarellano", Icon: LinkedInIcon },
  { label: "Google Developers", href: profile.links.googleDev, handle: "g.dev/erar404", display: "g.dev/erar404", Icon: GoogleDevIcon },
] as const;

export const emailLink = { label: "Email", href: `mailto:${profile.email}`, display: profile.email, Icon: MailIcon } as const;
