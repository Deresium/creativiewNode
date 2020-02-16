export default class Gallery{
    private readonly id: number;
    private readonly name: string;
    private readonly description: string;

    constructor(id: number, name: string, description: string) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}