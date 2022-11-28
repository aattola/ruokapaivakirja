import { SRuokaItem } from "./../types/s-kaupat.d";
import { KRuokaProduct } from "./../types/k-ruoka.d";
import { Product } from "./../types/general.d";

export function convertProduct(kProduct: KRuokaProduct, sProduct: SRuokaItem) {
  // s-mafian tuote
  const energyKcal = sProduct.nutrients.find((n) => {
    if (n.name === "Energiaa") return n;
  });

  if (!energyKcal) throw new Error("No energyKcal found");

  const kcals = parseFloat(energyKcal.value.split(" ")[3].replace(",", "."));

  const fat = parseFloat(
    sProduct.nutrients.find((n) => n.name === "Rasvaa")!.value.replace(",", ".")
  );
  const saturatedFats = parseFloat(
    sProduct.nutrients
      .find((n) => n.name === "Rasvaa, josta tyydyttyneitä rasvoja")!
      .value.replace(",", ".")
  );
  const carbohydrates = parseFloat(
    sProduct.nutrients
      .find((n) => n.name === "Hiilihydraattia")!
      .value.replace(",", ".")
  );
  const protein = parseFloat(
    sProduct.nutrients
      .find((n) => n.name === "Proteiinia")!
      .value.replace(",", ".")
  );
  const salt = parseFloat(
    sProduct.nutrients.find((n) => n.name === "Suolaa")!.value.replace(",", ".")
  );
  const fiber = parseFloat(
    sProduct.nutrients
      .find((n) => n.name === "Ravintokuitua")!
      .value.replace(",", ".")
  );

  const sReturn: Product = {
    nutrition: {
      energyKcal: kcals,
      fat,
      saturatedFats,
      carbohydrates,
      protein,
      salt,
      fiber,
    },
    ean: sProduct.ean,
    name: sProduct.name,
    imageUrl: `https://cdn.s-cloud.fi/v1/w256_q75/product/ean/${sProduct.ean}_kuva1.jpg`,
    id: sProduct.id,
    from: "s",
  };

  // kartellin tuote

  if (!kProduct.nutritionalContent) return console.log("eipä ollut?");
  if (kProduct.nutritionalContent.energyKcal === null)
    throw new Error("No energyKcal found");

  const returnVal: Product = {
    nutrition: {
      energyKcal: kProduct.nutritionalContent.energyKcal!,
      fat: kProduct.nutritionalContent.fat?.amount!,
      saturatedFats: kProduct.nutritionalContent.fatSaturated?.amount!,
      carbohydrates: kProduct.nutritionalContent.carbohydrates?.amount!,
      protein: kProduct.nutritionalContent.protein?.amount!,
      salt: kProduct.nutritionalContent.salt?.amount!,
      fiber: kProduct.nutritionalContent.nutritionalFiber?.amount!,
    },
    ean: kProduct.ean,
    name: kProduct.localizedName.finnish,
    imageUrl: kProduct.imageUrl,
    id: kProduct.id,
    from: "k",
  };

  return { sRes: sReturn, kRes: returnVal };
}
