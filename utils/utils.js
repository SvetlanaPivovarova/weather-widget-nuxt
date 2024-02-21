import { STORAGE_KEY } from "../utils/constants";

export const locationStorage = {
    fetch() {
        const locations = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        locations.forEach((location, index) => {
            location.id = index;
        });
        locationStorage.uid = locations.length;
        return locations;
    },
    save(locations) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(locations));
    }
};