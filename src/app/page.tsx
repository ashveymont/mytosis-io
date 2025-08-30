import { SplineSceneBasic } from "@/components/ui/spline-demo";
import { AnimatedAIChat } from "@/components/ui/animated-ai-chat";

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section - First Page */}
      <div className="h-screen w-full">
        <SplineSceneBasic />
      </div>
      
      {/* AI Chat Section - Second Page */}
      <div className="h-screen w-full">
        <AnimatedAIChat />
      </div>
    </div>
  );
}
