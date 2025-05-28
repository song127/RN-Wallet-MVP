// TokenTransferredEvent: 도메인 이벤트 예시
import { Token } from "@/domain/models/token";

export interface TokenTransferredEvent {
  type: "TokenTransferred";
  from: string;
  to: string;
  token: Token;
  amount: string;
  timestamp: number;
}
