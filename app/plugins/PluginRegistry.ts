// 플러그인 레지스트리 스켈레톤

export interface Plugin {
  id: string;
  register(reg: PluginRegistry): void;
}

export class PluginRegistry {
  private ports = new Map<string, unknown>();
  use<T>(port: string): T {
    return this.ports.get(port) as T;
  }
  provide<T>(port: string, impl: T) {
    if (this.ports.has(port)) throw new Error(`Port ${port} already bound`);
    this.ports.set(port, impl);
  }
}
