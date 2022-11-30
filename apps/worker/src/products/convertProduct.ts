import { SKaupatProduct } from "./../types/s-kaupat.d";
import { KRuokaProduct } from "./../types/k-ruoka.d";
import { Product, Weight } from "./../types/general.d";

function parseWeight(text: string): Weight {
  const match = text
    .replaceAll(",", ".")
    .match(/([0-9]*[.|,]+)?(\d+)( |)(g|kg|l)/);

  const xMatch = text.match(/(\d+)(X|x)/);

  let times = 1;
  if (xMatch && xMatch.length > 0) {
    times = parseFloat(xMatch[0]);
  }

  if (match === null) return { error: true, weight: 0, unit: "" };

  if (match[0].toLowerCase().includes("kg")) {
    return {
      error: false,
      weight: parseFloat(match[2]) * 1000 * times,
      unit: "g",
    };
  }

  if (match[0].toLowerCase().includes("l")) {
    return {
      error: false,
      weight: parseFloat(match[0]) * 1000 * times,
      unit: "ml",
    };
  }

  if (match?.length > 1) {
    // grammat
    return { error: false, weight: parseFloat(match[2]) * times, unit: "g" };
  }

  return { error: true, weight: 0, unit: "" };

  // const [, amount, unit] = match;
  // return unit === "g" ? parseInt(amount) : parseInt(amount) * 1000;
}

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
    if (tuote.nutrients.length === 0) throw new Error("No nutrients found");

    const weightTitle = parseWeight(tuote.name || "");
    const weightDesc = parseWeight(tuote.description || "");

    const weight = weightTitle !== undefined ? weightTitle : weightDesc;

    const kcals = parseFloat(energyKcal.value.split(" ")[3].replace(",", "."));

    if (tuote.nutrients.length === 1) {
      // vain energia listattu (yleensä)

      const returnVal: Product = {
        nutrition: {
          energyKcal: kcals,
        },
        weight,
        ean: tuote.ean,
        name: tuote.name,
        imageUrl: `https://cdn.s-cloud.fi/v1/w256_q75/product/ean/${tuote.ean}_kuva1.jpg`,
        id: tuote.id,
        from: "s",
      };

      return returnVal;
    }

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
      weight,
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
    if (tuote.nutritionalContent.energyKcal === null) {
      if (tuote.nutritionalContent.energyKj === null) {
        console.log("kruoka ei kcal tai kj löytynyt");
        throw new Error("No energyKcal tai kj found");
      }

      tuote.nutritionalContent.energyKcal =
        tuote.nutritionalContent.energyKj * 0.239;
    }

    const weightTitle = parseWeight(tuote.localizedName.finnish || "");
    const weightDesc = parseWeight(tuote.description?.fi || "");

    const weight = weightTitle !== undefined ? weightTitle : weightDesc;

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
      weight,
      ean: tuote.ean,
      name: tuote.localizedName.finnish,
      imageUrl: tuote.imageUrl,
      id: tuote.id,
      from: "k",
    };

    return returnVal;
  }
}
