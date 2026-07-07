import {
  CLINICAS_AD_COPY,
  CLINICAS_AD_GROUPS,
  CLINICAS_CAMPAIGN_NAME,
  CLINICAS_NEGATIVE_KEYWORDS,
  buildClinicasLandingUrl,
} from "../src/lib/google-ads-clinicas";

console.log("=== Campanha Google Ads — Clínicas Braxen ===\n");
console.log(`Nome: ${CLINICAS_CAMPAIGN_NAME}`);
console.log(`Tipo: Search`);
console.log(`URL final: ${buildClinicasLandingUrl()}\n`);

console.log("--- Negativas (campanha) ---");
for (const keyword of CLINICAS_NEGATIVE_KEYWORDS) {
  console.log(keyword);
}

console.log("\n--- Copy padrão ---");
for (const headline of CLINICAS_AD_COPY.headlines) {
  console.log(`Headline: ${headline}`);
}
console.log(`Descrição: ${CLINICAS_AD_COPY.description}\n`);

for (const group of CLINICAS_AD_GROUPS) {
  console.log(`--- Ad group: ${group.name} (${group.intent}) ---`);
  console.log("Keywords:");
  for (const keyword of group.keywords) {
    console.log(`  ${keyword}`);
  }
  console.log("Headlines sugeridas:");
  for (const headline of group.headlineHints) {
    console.log(`  ${headline}`);
  }
  console.log("");
}

console.log("Próximo passo: configurar conversão primária no Google Ads");
console.log("apontando para o evento generate_lead (GA4) ou");
console.log("NEXT_PUBLIC_GADS_CONVERSION_ID no site.");
