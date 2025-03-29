export default defineEventHandler(async (event) => {

  interface AtelierAvecNbChoix extends Atelier {
    nbChoix: number;
  }

  const res = await useDrizzle()
    .select()
    .from(tables.ateliers)
    .leftJoin(tables.langues, or(
      eq(tables.langues.a1choix, tables.ateliers.id),
      eq(tables.langues.a2choix, tables.ateliers.id)
    ));

  const result = res.reduce<AtelierAvecNbChoix[]>(
    (acc, row) => {
      const { ateliers: atelier, langues: langue } = row;
      const existingAtelier = acc.find(item => item.id === atelier.id);

      if (!existingAtelier) {
        acc.push({ ...atelier, nbChoix: langue ? 1 : 0 });
      } else if (langue) {
        existingAtelier.nbChoix++;
      }

      return acc;
    },
    []
  );
  return result
})
