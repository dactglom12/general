const setupDb = (url: string) => {
  return {
    baseUrl: url,
    get: () => null,
    post: (entity: any) => null,
  };
};

class Database {
  // SOME HIGH-LOAD INSTANCE

  private static db: Database;

  private constructor(url: string) {
    const instance = setupDb(url);

    return instance;
  }

  public static init(url?: string) {
    if (!Database.db) {
      if (url) {
        Database.db = new Database(url);
      } else {
        throw new Error(
          "You have no initialized instances and you have not provided any url"
        );
      }
    }

    return Database.db;
  }
}

const db1 = Database.init("https://my-url.com");
const db2 = Database.init();
const db3 = Database.init();
