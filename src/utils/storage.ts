export class Storage {
  namespace = 'kanban_';
  storage = localStorage ? localStorage : sessionStorage;

  // localStorage wrapper
  set(key: string, value: any) {
    this.storage.setItem(`${this.namespace}${key}`, JSON.stringify(value));
  }

  put(key: string, value: any) {
    if (!this.get(key)) {
      this.storage.setItem(`${this.namespace}${key}`, JSON.stringify(value));
    } else {
      return false;
    }
  }

  get(key: string) {
    try {
      return JSON.parse(this.storage.getItem(`${this.namespace}${key}`) || '');
    } catch (err) {
      return this.storage.getItem(`${this.namespace}${key}`);
    }
  }

  delete(key: string) {
    this.storage.removeItem(`${this.namespace}${key}`);
  }

  clear() {
    this.storage.clear();
  }
}

// Singleton instance
export default new Storage();
