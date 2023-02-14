export default interface Tweet {
    _id: number,
    user: string,
    text: string,
    hashtags: [string],
    likes: number
}
