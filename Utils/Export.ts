import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import { IProduct } from '../Models/Product';

export const saveFile = async (values: IProduct[]) => {
    
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
        const headerString = 'Id;Nombre;Stock;Stock Minimo\n';
        const rowString = values.map(d => `${d.id};${d.name};${d.stock};${d.stockMin}\n`).join('');
        const csvString = `${headerString}${rowString}`;

        // write the current list of answers to a local csv file
        const pathToWrite = FileSystem.documentDirectory + 'productos.csv';
        await FileSystem.writeAsStringAsync(pathToWrite, csvString, {encoding: FileSystem.EncodingType.UTF8})
        const asset = await MediaLibrary.createAssetAsync(pathToWrite)
        await MediaLibrary.createAlbumAsync("Download", asset, false)
    }
    
}