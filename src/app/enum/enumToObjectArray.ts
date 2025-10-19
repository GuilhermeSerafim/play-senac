// Em: src/app/core/helpers/enum.helpers.ts

/**
 * Converte um enum numérico do TypeScript em um array de objetos,
 * ideal para popular selects, checkboxes ou radio buttons no template do Angular.
 *
 * @remarks
 * Esta função é necessária porque os enums numéricos do TypeScript são compilados
 * para JavaScript com um mapeamento reverso (chave -> valor E valor -> chave).
 * Este helper filtra apenas as chaves numéricas e as transforma em um formato
 * amigável para o `*ngFor`.
 *
 * @param enumObject - O próprio enum que você deseja converter (ex: DiaDaSemana).
 * @returns Um array de objetos, onde cada objeto tem a forma `{ key: number; value: string }`.
 *
 * @example
 * // Dado o enum: enum Status { Ativo = 1, Inativo = 2 }
 * // O retorno será: [{ key: 1, value: 'Ativo' }, { key: 2, value: 'Inativo' }]
 */
export function enumToObjectArray(enumObject: any): { key: number; value: string }[] {
  return Object.keys(enumObject)
    .filter(key => !isNaN(Number(key))) // Filtra apenas as chaves que são números
    .map(key => ({
      key: Number(key),
      value: enumObject[Number(key)], // Pega o nome do enum usando a chave numérica
    }));
}