import HomePageFooter from "@/components/organisms/home-page/landing/footer";
import HomePageNavbar from "@/components/organisms/home-page/landing/navbar";
import HomePageComparisonSection from "@/components/organisms/home-page/landing/sections/comparison-section";
import HomePageCtaSection from "@/components/organisms/home-page/landing/sections/cta-section";
import HomePageDevelopersSection from "@/components/organisms/home-page/landing/sections/developers-section";
import HomePageFaqSection from "@/components/organisms/home-page/landing/sections/faq-section";
import HomePageHeroSection from "@/components/organisms/home-page/landing/sections/hero-section";
import HomePageSocialProofSection from "@/components/organisms/home-page/landing/sections/social-proof";
import HomePageTrustSection from "@/components/organisms/home-page/landing/sections/trust-section";
import HomePageWorkingSection from "@/components/organisms/home-page/landing/sections/working-section";

export default function Home() {
	return (
		<main className="font-sans">
			<HomePageNavbar />
			<HomePageHeroSection />
			<HomePageTrustSection />
			<HomePageSocialProofSection />
			<HomePageWorkingSection />
			<HomePageComparisonSection />
			<HomePageDevelopersSection />
			<HomePageFaqSection />
			<HomePageCtaSection />
			<HomePageFooter />
		</main>
	);
}
