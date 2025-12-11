import HomePageFooter from "@/components/organisms/home-page/landing/footer";
import HomePageNavbar from "@/components/organisms/home-page/landing/navbar";
import HomePageCtaSection from "@/components/organisms/home-page/landing/sections/cta-section";
import HomePageDevelopersSection from "@/components/organisms/home-page/landing/sections/developers-section";
import HomePageHeroSection from "@/components/organisms/home-page/landing/sections/hero-section";
import HomePageSocialProofSection from "@/components/organisms/home-page/landing/sections/social-proof";
import HomePageWorkingSection from "@/components/organisms/home-page/landing/sections/working-section";

export default function Home() {
	return (
		<main className="font-sans">
			<HomePageNavbar />
			<HomePageHeroSection />
			<HomePageSocialProofSection />
			<HomePageWorkingSection />
			<HomePageDevelopersSection />
			<HomePageCtaSection />
			<HomePageFooter />
		</main>
	);
}
