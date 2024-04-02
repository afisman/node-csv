import fs from 'fs';
import { Room } from './room';

const jsonData = (): string => {
    return fs.readFileSync('./rooms.json').toString();
}
const orderRooms = (): Room[] => {
    const rooms: Room[] = JSON.parse(jsonData());
    const orderedRooms = rooms.sort((a, b) => {
        if (a.rate > b.rate) {
            return 1;
        } else if (a.rate < b.rate) {
            return -1;
        }
        return 0;
    })
    return orderedRooms;
}

const csvData = (): void => {
    const roomData: Room[] = orderRooms();
    const csvText = roomData.map(room => {
        return `${room.id}, ${room.photos}, ${room.room_type}, ${room.room_number},${room.description}, ${room.offer},${room.room_floor}, ${room.rate},${room.amenities},${room.status},${room.discount}`
    }).join('\n');

    fs.writeFileSync('./rooms.csv', `id, photos, room_type, room_number, description, offer, room_floor, rate, amenities, status, discount\n${csvText}`, 'utf-8');
}

csvData();


