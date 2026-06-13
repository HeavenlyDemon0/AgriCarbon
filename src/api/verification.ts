import { supabase } from '../lib/supabase';
import { getFarmData } from './farms';

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

const CREDITS_BY_PRACTICE: Record<string, number> = {
  mulching: 3,
  drip: 5,
  compost: 4,
  'zero-till': 15,
  'tree-planting': 8,
  'crop-rotation': 12,
  'residue-mgmt': 6,
  other: 2,
};

export async function submitVerification(
  data: VerificationSubmission,
): Promise<VerificationResult> {
  if (!data.image) throw new Error('Image is required');
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const farm = await getFarmData();
  const credits = CREDITS_BY_PRACTICE[data.practiceType] || 0;

  // Upload image
  const fileExt = data.image.name.split('.').pop();
  const fileName = `${user.id}/${Math.random()}.${fileExt}`;
  const { error: uploadError } = await supabase.storage
    .from('verification-images')
    .upload(fileName, data.image);
    
  if (uploadError) throw uploadError;

  // Insert submission
  const { error: insertError } = await supabase
    .from('verification_submissions')
    .insert({
      user_id: user.id,
      farm_id: farm.id,
      practice_type: data.practiceType,
      voice_confirmed: data.voiceConfirmed,
      image_path: fileName,
      status: 'pending',
      credits_awarded: credits,
    });
  if (insertError) throw insertError;

  // Insert transaction
  const practiceLabel = practiceTypes.find(p => p.value === data.practiceType)?.label || data.practiceType;
  const icon = practiceTypes.find(p => p.value === data.practiceType)?.icon || '📋';
  
  await supabase.from('credit_transactions').insert({
    user_id: user.id,
    farm_id: farm.id,
    type: 'pending',
    description: `${practiceLabel} — Under Review`,
    credits: credits,
    icon: icon,
  });

  return {
    success: true,
    message: 'Practice verified successfully!',
    creditsAwarded: credits,
  };
}
