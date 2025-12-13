export default class Lib {
  static greaterThan(value: number, compare: string | number | object, replaced: string) {
    // Se o segundo argumento for uma função, ela será usada como condição
    if (typeof compare === 'function') {
      return compare(value) ? value : replaced;
    }
    
    // Se o segundo argumento for um número, compara se é maior
    if (typeof compare === 'number') {
      return value > compare ? value : replaced;
    }
    
    // Se o segundo argumento for uma string com operador
    if (typeof compare === 'string') {
      try {
        // Exemplo: ">= 10" ou "< 5"
        const condition = new Function('value', `return value ${compare}`);
        return condition(value) ? value : replaced;
      } catch {
        console.warn('Invalid comparison string.');
        return replaced;
      }
    }
    
    // Fallback: se for booleano, comportamento igual ao ternário
    return compare ? value : replaced;
  }
}