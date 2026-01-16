import LandingPage from "../components/LandingPage/LandingPage";
import { LinkInPost } from "./action/landing-page";

export default async function Home() {
  const postsWithRelativeTime = LinkInPost();

  return <LandingPage posts={postsWithRelativeTime} />;
}
