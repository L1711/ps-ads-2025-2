
import { z } from "zod";

const colors = [
  "AMARELO", "AZUL", "BRANCO", "CINZA", "DOURADO",
  "LARANJA", "MARROM", "PRATA", "PRETO",
  "ROSA", "ROXO", "VERDE", "VERMELHO"
];


const storeOpeningDate = new Date(2020, 2, 20); // 20/03/2020
const today = new Date();

const currentYear = new Date().getFullYear(); // Ano atual

const Car = z.object({
  
  brand: z.string()
    .trim()
    .min(1, { message: "A marca deve ter pelo menos 1 caractere." })
    .max(25, { message: "A marca pode ter no máximo 25 caracteres." }),

  
  model: z.string()
    .trim()
    .min(1, { message: "O modelo deve ter pelo menos 1 caractere." })
    .max(25, { message: "O modelo pode ter no máximo 25 caracteres." }),

  
  color: z.enum(colors, {
    message: "Cor inválida. Escolha uma das cores permitidas."
  }),

  
  year_manufacture: z.coerce.number({
      required_error: "O ano de fabricação é obrigatório.",
      invalid_type_error: "O ano deve ser um número."
    })
    .int("O ano deve ser inteiro.")
    .min(1960, "O ano mínimo é 1960.")
    .max(currentYear, `O ano não pode ser maior que ${currentYear}.`),

  
  imported: z.boolean({
    required_error: "O campo 'importado' é obrigatório.",
    invalid_type_error: "O valor deve ser verdadeiro ou falso."
  }),

  
  plates: z.string()
    .trim()
    .length(8, { message: "A placa deve ter exatamente 8 caracteres." }),

  
  selling_date: z.coerce.date()
    .min(storeOpeningDate, {
      message: "A data não pode ser anterior à abertura da loja (20/03/2020)."
    })
    .max(today, {
      message: "A data não pode ser posterior a de hoje."
    })
    .nullish(),

  
  selling_price: z.coerce.number()
    .min(5000, { message: "O valor mínimo é R$ 5.000,00." })
    .max(5000000, { message: "O valor máximo é R$ 5.000.000,00." })
    .nullish()
});

export default Car