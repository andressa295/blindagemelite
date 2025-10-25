// Tipos mínimos para o Vanta NET sem usar "any"
declare module "vanta/dist/vanta.net.min" {
  export interface VantaNetOptions {
    el: HTMLElement;
    THREE: typeof import("three");
    backgroundColor?: number;
    color?: number;
    points?: number;
    maxDistance?: number;
    spacing?: number;
    [key: string]: unknown;
  }

  export interface VantaEffect {
    destroy?: () => void;
  }

  const NET: (opts: VantaNetOptions) => VantaEffect;
  export default NET;
}
