import { useQuery } from '@tanstack/react-query';
import { EvidenceBundle } from '../lib/evidence-types';

export function useEvidence() {
  return useQuery<EvidenceBundle, Error>({
    queryKey: ['evidence'],
    queryFn: async () => {
      const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '');
      const response = await fetch(`${baseUrl}/evidence.json`);
      if (!response.ok) {
        throw new Error(`Failed to load evidence bundle: ${response.statusText}`);
      }
      return response.json();
    },
    staleTime: Infinity, // Static read-only evidence
  });
}
