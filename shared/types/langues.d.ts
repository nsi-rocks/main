export interface AtelierAvecNbChoix extends Atelier {
  nbChoix: [number, number, number, number, number] // [a2, jour1, jour2, jour3, jour4]
  assignedChoix: [number, number, number, number] // [jour1, jour2, jour3, jour4]
}

export type MergedRow = Langue & Partial<User>

export type LangueAvecAteliers = Langue & {
  atelier1: Atelier | null
  atelier2: Atelier | null
}

export type AffectationJ1 = {
  assignJ1atelier: number
  assignJ1jour: number
}

export type AffectationJ2 = {
  assignJ2atelier: number
  assignJ2jour: number
}

export type Affectation = AffectationJ1 & AffectationJ2
