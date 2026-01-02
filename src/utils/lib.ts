import {ClipData, TierItem} from "@/components/use-tier-list";

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
  
  static getClipPlatform(url: string) {
    if (url.includes("twitch.tv")) return "twitch"
    else if (url.includes("kick.com")) return "kick"
  }
  
  static fsCapitalize(str: string) {
    return str?.at(0)?.toUpperCase() + str?.substring(1)?.toLowerCase();
  }
  
  static getClipOrigin(data: ClipData | TierItem) {
    if (data.url.includes("twitch.tv")) return "twitch"
    else if (data.url.includes("kick.com")) return "kick"
    return ""
  }
  
  static getClipID(data: ClipData | TierItem) {
    // https://www.twitch.tv/eskimozin/clip/PrettiestLazyPeanutPoooound-PenLtEv4ihW7dnAD
    const id = data.url.match(/https:\/\/www.twitch.tv\/\w*\/clip\/([\w-]*)/);
    if (id?.[1]) return id?.[1];
    return null;
  }
}