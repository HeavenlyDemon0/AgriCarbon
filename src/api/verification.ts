import { apiFetch } from './client';

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

export async function submitVerification(
  data: VerificationSubmission,
): Promise<VerificationResult> {
  if (!data.image) {
    throw new Error('Image is required');
  }

  const form = new FormData();
  form.append('image', data.image);
  form.append('practice_type', data.practiceType);
  form.append('voice_confirmed', String(data.voiceConfirmed));

  return apiFetch<VerificationResult>('/verification', {
    method: 'POST',
    body: form,
  });
}
