import { LandingCta } from "./landing-cta";
import { LandingFeatures } from "./landing-features";
import { LandingFooter } from "./landing-footer";
import { LandingHeader } from "./landing-header";
import { LandingHero } from "./landing-hero";
import { LandingHowItWorks } from "./landing-how-it-works";

const pageClasses = "min-h-full bg-neutral-50 dark:bg-neutral-950";

export const LandingPage = () => {
  return (
    <div className={pageClasses}>
      <LandingHeader />
      <main>
        <LandingHero />
        <LandingHowItWorks />
        <LandingFeatures />
        <LandingCta />
      </main>
      <LandingFooter />
    </div>
  );
};
