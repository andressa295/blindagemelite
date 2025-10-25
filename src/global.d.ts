// Tipos mínimos pro Vanta (resolve o TS7016)
declare module "vanta/dist/vanta.net.min" {
  const NET: (opts: any) => { destroy?: () => void };
  export default NET;
}
