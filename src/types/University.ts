export type Image = {
    _id: string,
    imageUrl: string
}

export type Content = {
    _id: string,
    name: string,
    jeroanKonten: string,
}

export type University = {
    _id: string,
    name: string,
    imageId: Image,
    contentId: Content[]
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
}

export type Contact = {
    _id: string,
    name: string,
    contact: string,
    universityId: UniversityWithoutContent | null,
    userId: string | null
}