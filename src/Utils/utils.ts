import * as fs from 'fs';
import path from 'path';

export function readJson(file: string): any[] {
    try {
        const filePath = path.resolve(__dirname, `../Data/${file}`);
        const rawData = fs.readFileSync(filePath, 'utf-8');
        const parsedData: any[] = JSON.parse(rawData);
        //
        return parsedData;
    } catch (error) {
        return [];
    }
}

export function writeJson(data: any[], file: string): Boolean {
    try {
        const jsonData = JSON.stringify(data, null, 2);
        const filePath = path.resolve(__dirname, `../Data/${file}`);
        fs.writeFileSync(filePath, jsonData, 'utf8');
        //
        return true;
    } catch (error) {
        return false;
    }
}
