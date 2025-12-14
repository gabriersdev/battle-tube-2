class Util {
  static arraysEqual<T>(arr1: T[], arr2: T[]): boolean {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }

  static objectsEqual(obj1: Record<string, any>, obj2: Record<string, any>): boolean {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
      if (obj1[key] !== obj2[key]) return false;
    }
    return true;
  }

  static includesObjectInArray<T extends Record<string, any>>(mainArray: T[], objToFind: T): boolean {
    return mainArray.some(element => Util.areObjectsEqual(element, objToFind));
  }

  static includesObjects<T extends Record<string, any>>(objectsToFind: T | T[], mainArray: T[]): boolean {
    if (Array.isArray(objectsToFind)) {
      return objectsToFind.every(obj => mainArray.some(mainObj => Util.areObjectsEqual(obj, mainObj)));
    } else {
      return mainArray.some(mainObj => Util.areObjectsEqual(objectsToFind, mainObj));
    }
  }

  static areObjectsEqual(obj1: any, obj2: any): boolean {
    if (obj1 === obj2) return true;

    if (obj1 == null || obj2 == null) return obj1 === obj2;

    if (typeof obj1 !== typeof obj2) return false;

    if (typeof obj1 !== 'object') return obj1 === obj2;

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
      if (!keys2.includes(key)) return false;

      if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
        if (!Util.areObjectsEqual(obj1[key], obj2[key])) return false;
      } else if (obj1[key] !== obj2[key]) {
        return false;
      }
    }

    return true;
  }

  static shuffle<T>(array: T[]): T[] {
    const shuffled = [...array];
    let currentIndex = shuffled.length;

    while (currentIndex > 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [shuffled[currentIndex], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[currentIndex]];
    }

    return shuffled;
  }

  static capitalizeText(text: string): string {
    const minorWords = new Set([
      "de", "do", "da", "dos", "das", "e", "em", "com", "por", "a", "o", "as", "os",
      "um", "uma", "uns", "umas", "para", "no", "na", "nos", "nas"
    ]);

    return text.toLowerCase().split(" ").map((word, index) => {
      if (word.includes("kk")) {
        return "KKKKKKKKK";
      } else if (index === 0 || !minorWords.has(word)) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      return word;
    }).join(" ");
  }

  // Método adicional para comparar arrays de objetos
  static arraysOfObjectsEqual<T extends Record<string, any>>(arr1: T[], arr2: T[]): boolean {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((obj, index) => Util.areObjectsEqual(obj, arr2[index]));
  }

  // Método para deep clone de objetos
  static deepClone<T>(obj: T): T {
    if (obj === null || typeof obj !== 'object') return obj;

    if (obj instanceof Date) return new Date(obj.getTime()) as T;

    if (Array.isArray(obj)) {
      return obj.map(item => Util.deepClone(item)) as T;
    }

    const clonedObj = {} as T;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        (clonedObj as any)[key] = Util.deepClone((obj as any)[key]);
      }
    }
    return clonedObj;
  }
}

export default Util;
