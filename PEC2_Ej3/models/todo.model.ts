
export interface ITodo {
  id: string;
  text: string;
  complete: boolean;
}

export class Todo implements ITodo {
  id: string;
  text: string;
  complete: boolean;

  constructor({ text, complete = false }: { text: string; complete?: boolean }) {
    this.id = this.uuidv4();
    this.text = text;
    this.complete = complete;
  }

  //Aplicat amb string ja que crec que no es pot aplicar el [1e7] + numero.
  private uuidv4(): string {
    return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c: string) => {
      const random = crypto.getRandomValues(new Uint8Array(1))[0]!;
      return (parseInt(c) ^ (random & (15 >> (parseInt(c) / 4)))).toString(16);
    });
  }
}
