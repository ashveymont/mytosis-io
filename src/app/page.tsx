import { SplineSceneBasic } from "@/components/ui/spline-demo";
import { ProblemSection } from "@/components/ui/problem-section";
import { RevenueLeaksSection } from "@/components/ui/revenue-leaks-section";
import { WhySection } from "@/components/ui/why-section";
import { AgentsSection } from "@/components/ui/agents-section";
import { RoiSection } from "@/components/ui/roi-section";
import { IntegrationsSection } from "@/components/ui/integrations-section";
import { AboutSection } from "@/components/ui/about-section";
import { LeadCaptureSection } from "@/components/ui/lead-capture-section";
import { SiteFooter } from "@/components/ui/site-footer";

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section - First Page */}
      <div id="hero" className="w-full">
        <SplineSceneBasic />
      </div>

      {/* Problem Section - Strip */}
      <div id="problem" className="w-full">
        <ProblemSection />
      </div>

      {/* Revenue Leaks Section */}
      <div id="revenue-leaks" className="w-full">
        <RevenueLeaksSection />
      </div>

      {/* Why This Keeps Happening */}
      <div id="insight" className="w-full">
        <WhySection />
      </div>

      {/* The Agents */}
      <div id="agents" className="w-full">
        <AgentsSection />
      </div>

      {/* The ROI Case */}
      <div id="roi" className="w-full">
        <RoiSection />
      </div>

      {/* Integrations */}
      <div id="integrations" className="w-full">
        <IntegrationsSection />
      </div>

      {/* About / Built By */}
      <div id="about" className="w-full">
        <AboutSection />
      </div>

      {/* Lead Capture */}
      <div id="contact" className="w-full">
        <LeadCaptureSection />
      </div>

      <SiteFooter />
    </div>
  );
}
