import { SKaupatProduct } from "./../types/s-kaupat.d";
import { KRuokaProduct } from "./../types/k-ruoka.d";
import { Product } from "./../types/general.d";

export function convertProduct(
  tuoteJokaKaannetaan: SKaupatProduct | KRuokaProduct | undefined,
  tuoteFrom: "skaupat" | "kruoka"
) {
  if (!tuoteJokaKaannetaan || tuoteJokaKaannetaan === undefined)
    return undefined;
  if (tuoteFrom === "skaupat") {
    const tuote = tuoteJokaKaannetaan as SKaupatProduct;

    // s-mafian tuote
    const energyKcal = tuote.nutrients.find((n) => {
      if (n.name === "Energiaa") return n;
    });

    if (!energyKcal) throw new Error("No energyKcal found");

    const kcals = parseFloat(energyKcal.value.split(" ")[3].replace(",", "."));

    const fat = parseFloat(
      tuote.nutrients.find((n) => n.name === "Rasvaa")!.value.replace(",", ".")
    );
    const saturatedFats = parseFloat(
      tuote.nutrients
        .find((n) => n.name === "Rasvaa, josta tyydyttyneitä rasvoja")!
        .value.replace(",", ".")
    );
    const carbohydrates = parseFloat(
      tuote.nutrients
        .find((n) => n.name === "Hiilihydraattia")!
        .value.replace(",", ".")
    );
    const protein = parseFloat(
      tuote.nutrients
        .find((n) => n.name === "Proteiinia")!
        .value.replace(",", ".")
    );
    const salt = parseFloat(
      tuote.nutrients.find((n) => n.name === "Suolaa")!.value.replace(",", ".")
    );

    let fiber = 0;
    const kuitu = tuote.nutrients.find((n) => n.name === "Ravintokuitua");
    if (kuitu) {
      fiber = parseFloat(kuitu.value.replace(",", "."));
    }

    const returnVal: Product = {
      nutrition: {
        energyKcal: kcals,
        fat,
        saturatedFats,
        carbohydrates,
        protein,
        salt,
        fiber,
      },
      ean: tuote.ean,
      name: tuote.name,
      imageUrl: `https://cdn.s-cloud.fi/v1/w256_q75/product/ean/${tuote.ean}_kuva1.jpg`,
      id: tuote.id,
      from: "s",
    };

    return returnVal;
  }

  if (tuoteFrom === "kruoka") {
    const tuote = tuoteJokaKaannetaan as KRuokaProduct;

    // kartellin tuote

    if (!tuote.nutritionalContent) throw new Error("eipä ollut ??????");
    if (tuote.nutritionalContent.energyKcal === null)
      throw new Error("No energyKcal found");

    const returnVal: Product = {
      nutrition: {
        energyKcal: tuote.nutritionalContent.energyKcal!,
        fat: tuote.nutritionalContent.fat?.amount!,
        saturatedFats: tuote.nutritionalContent.fatSaturated?.amount!,
        carbohydrates: tuote.nutritionalContent.carbohydrates?.amount!,
        protein: tuote.nutritionalContent.protein?.amount!,
        salt: tuote.nutritionalContent.salt?.amount!,
        fiber: tuote.nutritionalContent.nutritionalFiber?.amount!,
      },
      ean: tuote.ean,
      name: tuote.localizedName.finnish,
      imageUrl: tuote.imageUrl,
      id: tuote.id,
      from: "k",
    };

    return returnVal;
  }
}
