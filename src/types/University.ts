export type Image = {
    _id: string,
    imageUrl: string
}

export type Content = {
    _id: string,
    name: string,
    jeroanKonten: string,
    createdAt: string,
    updatedAt: string
}

export type University = {
    _id: string,
    name: string,
    imageId: Image,
    contentId: Content[],
    priorityLevel: number,
    lastFetched: null | string
}
export type UniversityWithoutContent = {
    _id: string,
    name: string,
    imageId: Image,
}


export type Schedule = {
    _id: string,
    name: string,
    universityId: UniversityWithoutContent | null,
    timeStartDate: string,
    timeEndDate: string,
    place: string,
    isLive: boolean
}

export type Contact = {
    _id: string,
    name: string,
    contact: string,
    position: string,
    universityId: UniversityWithoutContent | null,
    userId: string | null
}