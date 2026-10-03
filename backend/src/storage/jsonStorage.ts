import fs from "fs";
import path from "path";

class JsonStorage {
  private dataFolder = path.resolve(__dirname, "../../data");

  private getFilePath(fileName: string): string {
    return path.join(this.dataFolder, fileName);
  }

  read<T>(fileName: string): T[] {
    const filePath = this.getFilePath(fileName);
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const content = fs.readFileSync(filePath, "utf-8");
    if (content.trim() === "") {
      return [];
    }
    return JSON.parse(content) as T[];
  }

  write<T>(fileName: string, data: T[]): void {
    if (!fs.existsSync(this.dataFolder)) {
      fs.mkdirSync(this.dataFolder, { recursive: true });
    }
    fs.writeFileSync(this.getFilePath(fileName), JSON.stringify(data, null, 2), "utf-8");
  }
}

export default new JsonStorage();
