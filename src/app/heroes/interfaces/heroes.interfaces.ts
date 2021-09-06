export interface Heroe {
  id: String;  //opcional ?
  superhero: String;
  publisher: Publisher;
   alter_ego: String;
   first_appearance: String;
   characters: String;
   alt_img?: string;  //opcional?
}

export enum Publisher{
   out = "out",
   realBetis = "Real Betis"
}
