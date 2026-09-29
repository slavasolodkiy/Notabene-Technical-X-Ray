export type EvidenceStatus = "VERIFIED" | "INFERRED" | "UNKNOWN" | string;
export interface Source {
  id: string;
  title: string;
  url: string;
  localPath?: string;
  publishedDate: string | null;
  evidencePath: string;
  tier: number;
  notes?: string;
}
export interface ResearchSection {
  id: string;
  title: string;
  summary: string;
  status: EvidenceStatus;
  markdown: string;
  sourceIds: string[];
  sourceUrls: string[];
}
export interface EvidenceBundle {
  researchDate: string;
  sources: Source[];
  sections: ResearchSection[];
  datasets: {
    endpoints: Record<string, unknown>[];
    webhooks: Record<string, unknown>[];
    fields: Record<string, unknown>[];
    entities: Record<string, unknown>[];
    jurisdictions: Record<string, unknown>[];
    sdks: Record<string, unknown>[];
  };
  documents: { title: string; path: string }[];
  questions: { id: number; question: string; sourceUrls: string[] }[];
  stats: { archivedPages: number; sources: number; endpoints: number; fields: number; repositories: number };
}