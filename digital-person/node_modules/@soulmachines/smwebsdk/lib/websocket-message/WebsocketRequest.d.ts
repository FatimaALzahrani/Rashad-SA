import { WebsocketKind } from './enums/WebsocketKind';
import { WebsocketCategory } from './enums/WebsocketCategory';
export interface WebsocketRequest {
    name: string;
    body: any;
    category: WebsocketCategory;
    kind: WebsocketKind.Request;
}
//# sourceMappingURL=WebsocketRequest.d.ts.map