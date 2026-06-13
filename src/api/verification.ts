// ── Mock Verification API ──
export interface VerificationSubmission {
  image: File | null;
  voiceConfirmed: boolean;
  practiceType: string;
}

export interface VerificationResult {
  success: boolean;
  message: string;
  creditsAwarded: number;
}

export const practiceTypes = [
  { value: 'mulching', label: 'Organic Mulching', icon: '🌿' },
  { value: 'drip', label: 'Drip Irrigation', icon: '💧' },
  { value: 'compost', label: 'Composting', icon: '♻️' },
  { value: 'zero-till', label: 'Zero-Till Farming', icon: '🌾' },
  { value: 'tree-planting', label: 'Tree Planting', icon: '🌳' },
  { value: 'crop-rotation', label: 'Crop Rotation', icon: '🫘' },
  { value: 'residue-mgmt', label: 'Residue Management', icon: '🔥' },
  { value: 'other', label: 'Other', icon: '📋' },
];

export async function submitVerification(_data: VerificationSubmission): Promise<VerificationResult> {
  // Simulate network delay
  await new Promise(r => setTimeout(r, 1500));
  return { success: true, message: 'Practice verified successfully!', creditsAwarded: 3 };
}
