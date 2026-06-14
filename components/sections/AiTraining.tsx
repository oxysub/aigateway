import { DetailCardGrid } from "@/components/ui/DetailCardGrid";
import { AI_TRAINING_TRACKS } from "@/lib/constants";

export function AiTraining() {
  return (
    <DetailCardGrid
      id="training"
      eyebrow="AI Training"
      title="Hands-On GenAI Training Programmes"
      description="Practical AI and GenAI training for teams, leaders, and technical practitioners. All programmes are HRD Corp claimable."
      items={AI_TRAINING_TRACKS}
      columns={3}
      className="bg-surface"
    />
  );
}
