/**
 * Cria um objeto Date com a data de hoje, mas com a hora e minuto especificados.
 * Ideal para representar horários sem se preocupar com uma data específica.
 * @param hour A hora (0-23)
 * @param minute O minuto (0-59)
 * @returns Um objeto Date.
 */
export const createTime = (hour: number, minute: number = 0): Date => {
  const date = new Date();
  date.setHours(hour, minute, 0, 0);
  return date;
};