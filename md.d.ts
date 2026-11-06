// content/*.md arrive as strings through the raw-loader rule in next.config.ts.
declare module "*.md" {
  const markdown: string;
  export default markdown;
}
