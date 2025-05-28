// Feature flag registry (스켈레톤)
// 각 플래그는 owner, expiryDate, fallback 값을 반드시 포함해야 함

export interface FeatureFlag {
  key: string;
  owner: string;
  expiryDate: string; // YYYY-MM-DD
  fallback: boolean;
  description?: string;
}

export const featureFlags: FeatureFlag[] = [
  // 예시
  // {
  //   key: 'enableUniswap',
  //   owner: 'dev-team',
  //   expiryDate: '2024-08-01',
  //   fallback: false,
  //   description: 'Uniswap 연동 기능 활성화'
  // }
];

export function isFeatureEnabled(key: string): boolean {
  const flag = featureFlags.find(f => f.key === key);
  return flag ? flag.fallback : false;
}
