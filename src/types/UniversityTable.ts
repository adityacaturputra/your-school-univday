export interface Image {
    _id: string,
    imageUrl: string
}

export interface Content {
    _id: string,
    name: string,
    jeroanKonten: string,
}

export interface University {
    _id: string,
    name: string,
    imageId: Image,
    contentId: Content[]
}